'use client';
// src/components/AddCompany.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';  // Import uuid to generate unique id
import { TextField, Button, Typography, Box, Alert, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AddCompany = () => {
  const [companyName, setCompanyName] = useState<string>('');  
  const [companies, setCompanies] = useState<any[]>([]); // List of companies
  const [errorMessage, setErrorMessage] = useState<string>('');  
  const [successMessage, setSuccessMessage] = useState<string>('');  
  const [editingCompany, setEditingCompany] = useState<string | null>(null);  // Track the company being edited

  // Fetch companies from the backend when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/companies');
        setCompanies(response.data);
      } catch (error) {
        setErrorMessage('Failed to fetch companies');
      }
    };

    fetchCompanies();
  }, []);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  };

  // Handle form submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset messages before making the request
    setErrorMessage('');
    setSuccessMessage('');

    if (editingCompany) {
      // Update the company
      try {
        const response = await axios.put(`http://localhost:3000/companies/${editingCompany}`, {
          name: companyName,
        });

        // Update the list with the edited company
        setCompanies((prev) =>
          prev.map((company) =>
            company.id === editingCompany ? { ...company, name: response.data.name } : company
          )
        );

        setSuccessMessage(`Company "${response.data.name}" updated successfully!`);
        setCompanyName('');
        setEditingCompany(null);
      } catch (error) {
        setErrorMessage('Error updating the company');
      }
    } else {
      // Create new company
      const companyId = uuidv4(); // Generate UUID for the new company

      try {
        const response = await axios.post('http://localhost:3000/companies', {
          id: companyId,
          name: companyName,
        });

        setCompanies((prev) => [...prev, response.data]);
        setSuccessMessage(`Company "${response.data.name}" created successfully!`);
        setCompanyName('');
      } catch (error) {
        setErrorMessage('An error occurred');
      }
    }
  };

  // Handle delete company
  const handleDelete = async (companyId: string) => {
    try {
      await axios.delete(`http://localhost:3000/companies/${companyId}`);
      setCompanies((prev) => prev.filter((company) => company.id !== companyId));
      setSuccessMessage('Company deleted successfully!');
    } catch (error) {
      setErrorMessage('Failed to delete company');
    }
  };

  // Handle edit company
  const handleEdit = (company: any) => {
    setCompanyName(company.name);
    setEditingCompany(company.id);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Companies
      </Typography>
      <Typography variant="h6" gutterBottom color="grey">
        {editingCompany ? 'Edit Company' : 'Create a New Company'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          value={companyName}
          onChange={handleInputChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{display:'flex', justifyContent:'flex-end'}}>
          {editingCompany ? 'Update Company' : 'Create Company'}
        </Button>
      </form>

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

      <Typography variant="h6" sx={{ marginTop: 3 , color: 'primary.main'}}>
        Existing Companies :
      </Typography>
      <List>
        {companies.map((company) => (
          <ListItem key={company.id} sx={{ display: 'flex', justifyContent: 'space-between' , color: 'grey'}}>
            <ListItemText primary={company.name} />
            <Box>
              <IconButton onClick={() => handleEdit(company)} color="primary" sx={{ marginRight: 1 }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(company.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AddCompany;
