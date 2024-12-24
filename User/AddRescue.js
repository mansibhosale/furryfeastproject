import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Alert,
} from '@mui/material';

const AddRescue = () => {
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    age: '',
    rescueDate: '',
    location: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Replace with your backend API endpoint
      const response = await fetch('http://localhost:5000/api/rescues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Rescue pet information added successfully!');
        setFormData({
          petName: '',
          petType: '',
          age: '',
          rescueDate: '',
          location: '',
        });
      } else {
        setErrorMessage('Failed to add rescue pet. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Rescue Pet
          </Typography>
        </Grid>

        {successMessage && (
          <Grid item xs={12}>
            <Alert severity="success">{successMessage}</Alert>
          </Grid>
        )}

        {errorMessage && (
          <Grid item xs={12}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
        )}

        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Pet Name"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Pet Type"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                placeholder="e.g., Dog, Cat"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Rescue Date"
                name="rescueDate"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.rescueDate}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddRescue;
