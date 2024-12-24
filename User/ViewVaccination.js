import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Grid,
} from '@mui/material';
import axios from 'axios';

const ViewVaccination = () => {
  const [vaccinationData, setVaccinationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vaccination data from the backend
  useEffect(() => {
    const fetchVaccinationData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vaccinations'); // Replace with your API endpoint
        setVaccinationData(response.data);
      } catch (err) {
        setError('Failed to fetch vaccination data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccinationData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            View Vaccinations
          </Typography>
        </Grid>

        {loading && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Grid>
        )}

        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {!loading && !error && vaccinationData.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No vaccination records found.
            </Typography>
          </Grid>
        )}

        {!loading && !error && vaccinationData.length > 0 && (
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Pet ID</strong></TableCell>
                    <TableCell><strong>Pet Name</strong></TableCell>
                    <TableCell><strong>Vaccine</strong></TableCell>
                    <TableCell><strong>Date Administered</strong></TableCell>
                    <TableCell><strong>Next Due Date</strong></TableCell>
                    <TableCell><strong>Veterinarian</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vaccinationData.map((vaccination) => (
                    <TableRow key={vaccination.id}>
                      <TableCell>{vaccination.petId}</TableCell>
                      <TableCell>{vaccination.petName}</TableCell>
                      <TableCell>{vaccination.vaccine}</TableCell>
                      <TableCell>{new Date(vaccination.dateAdministered).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(vaccination.nextDueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{vaccination.veterinarian}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ViewVaccination;
