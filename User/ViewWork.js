import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const ViewWork = () => {
  const [workItems, setWorkItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchWorkData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/work'); // Replace with your API URL
        setWorkItems(response.data);
      } catch (err) {
        setError('Failed to fetch work data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="center">
            View Work
          </Typography>
        </Grid>

        {loading && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <CircularProgress />
          </Grid>
        )}

        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {!loading && !error && workItems.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No work items found.
            </Typography>
          </Grid>
        )}

        {!loading && !error && workItems.length > 0 && (
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Created At</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workItems.map((work) => (
                    <TableRow key={work.id}>
                      <TableCell>{work.id}</TableCell>
                      <TableCell>{work.title}</TableCell>
                      <TableCell>{work.description}</TableCell>
                      <TableCell>{work.status}</TableCell>
                      <TableCell>{new Date(work.created_at).toLocaleString()}</TableCell>
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

export default ViewWork;
