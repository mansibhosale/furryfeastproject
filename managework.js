import React, { useState, useEffect } from "react";
// import manageworkImage from './path-to-your-file/managework.png';  // Ensure this path is correct
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

function Managework() {
  const [works, setWorks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentWork, setCurrentWork] = useState({
    id: null,
    title: "",
    description: "",
  });

  // Fetch all works from the backend
  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/works");
      setWorks(response.data);
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  const handleOpen = (work = { id: null, title: "", description: "" }) => {
    setCurrentWork(work);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentWork({ id: null, title: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWork({ ...currentWork, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (currentWork.id) {
        // Update existing work
        await axios.put(
          `http://localhost:5000/api/works/${currentWork.id}`,
          currentWork
        );
      } else {
        // Add new work
        await axios.post("http://localhost:5000/api/works", currentWork);
      }
      fetchWorks();
      handleClose();
    } catch (error) {
      console.error("Error saving work:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/works/${id}`);
      fetchWorks();
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  return (
    <div>
      <h1>Manage Work</h1>
      {/* Example of displaying the image */}
      {/* <img src={logo192} alt="Manage Work" style={{ width: '100px', height: 'auto' }} /> */}

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Work
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {works.map((work) => (
              <TableRow key={work.id}>
                <TableCell>{work.id}</TableCell>
                <TableCell>{work.title}</TableCell>
                <TableCell>{work.description}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpen(work)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDelete(work.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentWork.id ? "Edit Work" : "Add Work"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={currentWork.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            value={currentWork.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Managework;

