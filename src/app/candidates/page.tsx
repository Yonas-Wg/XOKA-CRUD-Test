'use client';

import { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel, Divider, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  companyId: string;
  appliedAt: string;
}

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [companies, setCompanies] = useState<{ [key: string]: string }>({});
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [candidateToDelete, setCandidateToDelete] = useState<string | null>(null); // State to store the candidate id to delete

  useEffect(() => {
    // Fetch candidates and companies on initial load
    const fetchCandidatesData = async () => {
      try {
        const candidatesResponse = await axios.get<Candidate[]>('http://localhost:3000/candidates');
        setCandidates(candidatesResponse.data);

        // Fetch companies list from the /companies endpoint
        const companiesResponse = await axios.get<{ id: string; name: string }[]>('http://localhost:3000/companies');
        const companiesData: { [key: string]: string } = {};
        companiesResponse.data.forEach(company => {
          companiesData[company.id] = company.name;
        });
        setCompanies(companiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCandidatesData();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      companyId: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      position: Yup.string().required('Position is required'),
      companyId: Yup.string().required('Company is required'),
    }),
    onSubmit: async (values) => {
      try {
        if (editingCandidate) {
          await axios.put(`http://localhost:3000/candidates/${editingCandidate.id}`, values);
          toast.success('Updated Successfully!');
        } else {
          await axios.post('http://localhost:3000/candidates', values);
          toast.success('Added Successfully!');
        }
        formik.resetForm();
        setEditingCandidate(null);

        // Fetch candidates again after update
        const response = await axios.get<Candidate[]>('http://localhost:3000/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error saving candidate:', error);
      }
    },
  });

  const handleEdit = (candidate: Candidate) => {
    formik.setValues({
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position,
      companyId: candidate.companyId,
    });
    setEditingCandidate(candidate);
  };

  const handleDeleteConfirmation = (id: string) => {
    setCandidateToDelete(id);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (candidateToDelete) {
      try {
        await axios.delete(`http://localhost:3000/candidates/${candidateToDelete}`);
        toast.success('Deleted Successfully!');
        setCandidates((prev) => prev.filter((candidate) => candidate.id !== candidateToDelete));
        setOpenDialog(false); // Close dialog after successful deletion
      } catch (error) {
        console.error('Error deleting candidate:', error);
        toast.error('Failed to delete candidate');
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close dialog without deletion
    setCandidateToDelete(null);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom color="primary">
        Manage Candidates
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Position"
              fullWidth
              value={formik.values.position}
              onChange={formik.handleChange('position')}
              onBlur={formik.handleBlur('position')}
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Company</InputLabel>
              <Select
                label="Company"
                value={formik.values.companyId}
                onChange={(e) => formik.setFieldValue('companyId', e.target.value)}
                onBlur={formik.handleBlur('companyId')}
                error={formik.touched.companyId && Boolean(formik.errors.companyId)}
              >
                {Object.keys(companies).map((companyId) => (
                  <MenuItem key={companyId} value={companyId}>
                    {companies[companyId]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" type="submit">
                {editingCandidate ? 'Update Candidate' : 'Add Candidate'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
        Candidates List :
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 10 }}>
        {candidates.map((candidate) => (
          <Paper key={candidate.id} sx={{ padding: 3, mb: 3, display: 'flex', justifyContent: 'space-between', boxShadow: 3 }}>
            <Avatar sx={{ width: 66, height: 66, mr: 2 }} alt={`${candidate.firstName} ${candidate.lastName}`}>
              {candidate.firstName[0]}{candidate.lastName[0]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {candidate.firstName} {candidate.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary">Email: {candidate.email}</Typography>
              <Typography variant="body1" color="textSecondary">Phone: {candidate.phone}</Typography>
              <Typography variant="body1" color="textSecondary">Position: {candidate.position}</Typography>
              <Typography variant="body2" color="textSecondary">Applied At: {new Date(candidate.appliedAt).toLocaleString()}</Typography>
              <Typography variant="body2" color="textSecondary">Company: {companies[candidate.companyId]}</Typography>
            </Box>
            <Box>
              <Button color="primary" onClick={() => handleEdit(candidate)}>
                Edit
              </Button>
              <Button color="error" onClick={() => handleDeleteConfirmation(candidate.id)}>
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this candidate? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CandidatesPage;
