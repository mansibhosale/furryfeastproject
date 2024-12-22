import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Typography, Snackbar } from '@mui/material';

function ManageRescue() {
  const [openDialog, setOpenDialog] = useState(false);
  const [rescueDetails, setRescueDetails] = useState({
    name: '',
    location: '',
    urgency: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    location: false,
    urgency: false,
    description: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRescueDetails({
      ...rescueDetails,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = { ...errors };
    formErrors.name = !rescueDetails.name;
    formErrors.location = !rescueDetails.location;
    formErrors.urgency = !rescueDetails.urgency;
    formErrors.description = !rescueDetails.description;

    setErrors(formErrors);

    return !Object.values(formErrors).includes(true);
  };

  const handleRescueSubmit = () => {
    if (validateForm()) {
      // Add the logic to save the rescue details (e.g., API call)
      setSnackbarMessage('Rescue operation details submitted successfully!');
      setOpenSnackbar(true);
      setOpenDialog(false);
    } else {
      setSnackbarMessage('Please fill in all the details.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom><br></br>
        Rescue Operation Management
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleDialogOpen}>
            New Rescue Operation
          </Button>
        </Grid>
      </Grid>

      {/* Dialog to capture rescue operation details */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>New Rescue Operation</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Rescue Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={rescueDetails.name}
            onChange={handleInputChange}
            error={errors.name}
            helperText={errors.name ? "This field is required" : ""}
          />
          <TextField
            name="location"
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={rescueDetails.location}
            onChange={handleInputChange}
            error={errors.location}
            helperText={errors.location ? "This field is required" : ""}
          />
          <TextField
            name="urgency"
            label="Urgency Level"
            variant="outlined"
            fullWidth
            margin="normal"
            value={rescueDetails.urgency}
            onChange={handleInputChange}
            error={errors.urgency}
            helperText={errors.urgency ? "This field is required" : ""}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={rescueDetails.description}
            onChange={handleInputChange}
            error={errors.description}
            helperText={errors.description ? "This field is required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRescueSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}

export default ManageRescue;
