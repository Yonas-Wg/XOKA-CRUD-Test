'use client';

import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button, Box, FormControl, InputLabel, Select, Typography, CircularProgress, List, ListItem, ListItemText, IconButton, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Company {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
  companyId: string;
}

const DepartmentForm: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]); 
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null); 

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
    fetchDepartments();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      companyId: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Department name is required'),
      companyId: Yup.string().required('Company is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (editingDepartment) {
          // Update department
          await axios.put(`http://localhost:3000/departments/${editingDepartment.id}`, values);
          setSuccessMessage('Department updated successfully!');
        } else {
          // Add new department
          await axios.post('http://localhost:3000/departments', values);
          setSuccessMessage('Department added successfully!');
        }

        // Refresh department list
        const response = await axios.get('http://localhost:3000/departments');
        setDepartments(response.data);
        formik.resetForm(); // Reset form after submission
      } catch (error) {
        setErrorMessage('Error processing the department.');
      } finally {
        setIsSubmitting(false);
        setEditingDepartment(null); // Reset the editing state
      }
    },
  });

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    formik.setValues({ name: department.name, companyId: department.companyId });
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/departments/${id}`);
      setSuccessMessage('Department deleted successfully!');
      const response = await axios.get('http://localhost:3000/departments');
      setDepartments(response.data);
    } catch (error) {
      setErrorMessage('Error deleting department');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Departments
      </Typography>
      <Typography variant="h6" gutterBottom color="grey">
        {editingDepartment ? 'Edit Department' : 'Create a New Department'}
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          label="Department Name"
          fullWidth
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ marginBottom: 2 }}
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Company</InputLabel>
          <Select
            label="Company"
            name="companyId"
            value={formik.values.companyId}
            onChange={formik.handleChange}
            error={formik.touched.companyId && Boolean(formik.errors.companyId)}
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : editingDepartment ? 'Update Department' : 'Add Department'}
        </Button>

        {/* Show success/error messages */}
        {successMessage && (
          <Alert sx={{ marginTop: 2 }} severity="success">
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            {errorMessage}
          </Alert>
        )}

        <Typography variant="h6" sx={{ marginTop: 3, color: 'primary.main' }}>
          Existing departments :
        </Typography>
        <List>
          {departments.map((department) => (
            <ListItem key={department.id} sx={{ display: 'flex', justifyContent: 'space-between', color: 'grey' }}>
              <ListItemText primary={department.name} />
              <Box>
                <IconButton onClick={() => handleEdit(department)} color="primary" sx={{ marginRight: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(department.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DepartmentForm;
