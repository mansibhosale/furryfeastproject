
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/system";

// Styled gradient button
const GradientButton = styled(Button)({
  background: "linear-gradient(145deg,rgb(184, 31, 20),rgb(69, 64, 171))",
  boxShadow: "5px 5px 15px #4b47a4, -5px -5px 15px #847dff",
  color: "#fff",
  textTransform: "none",
  fontWeight: "bold",
  transition: "0.3s",
  "&:hover": {
    background: "linear-gradient(145deg,rgb(135, 13, 2),rgb(85, 77, 235))",
    boxShadow: "5px 5px 15px #847dff, -5px -5px 15pxrgb(55, 51, 145)",
  },
});

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function RegistrationForm() {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Submitted values:", values);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      alert("Registration Successful!");
      navigate("/dashboard"); // Navigate to a dashboard or login page after success
    }, 1000);
  };

  return (
    <Box className="background-video-container">
      <video autoPlay loop muted className="background-video">
        <source src="gray-cloud.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Paper
        elevation={12}
        sx={{
          padding: "2rem",
          borderRadius: "20px",
          maxWidth: 400,
          background: "rgba(266, 266, 255, 0.3)",
          backdropFilter: "blur(5px)",
          boxShadow:
            "20px 20px 50px rgba(0, 0, 0, 0.3), -20px -20px 50px rgba(255, 255, 255, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Register
        </Typography>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {/* Username Field */}
              <Field
                name="username"
                as={TextField}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ccc",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6c63ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6c63ff",
                  },
                }}
              />

              {/* Email Field */}
              <Field
                name="email"
                as={TextField}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ccc",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6c63ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6c63ff",
                  },
                }}
              />

              {/* Password Field */}
              <Field
                name="password"
                as={TextField}
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ccc",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6c63ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6c63ff",
                  },
                }}
              />

              <GradientButton
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </GradientButton>
            </Form>
          )}
        </Formik>

        <Typography align="center" sx={{ mt: 2, fontWeight: "bold" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "underline",
              color: "#740d02",
              fontWeight: "bold",
            }}
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default RegistrationForm;

