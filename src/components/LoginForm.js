import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { getUsers, getSchools } from "../localStorageDB";
import SignupForm from "./SignupForm";

const companyId = localStorage.getItem("companyId");

const LoginForm = () => {
  const { logIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const schools = getSchools(companyId);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,20}$/;
    const users = getUsers();
    const user = users.find(
      (user) => user.email === email.value && user.password === password.value
    );

    if (!emailRegex.test(email.value)) {
      setError("Invalid email format.");
      return;
    }
    if (!passwordRegex.test(password.value)) {
      setError(
        "Password must be 4-20 characters, contain at least 1 uppercase and 1 lowercase letter, and 1 number."
      );
      return;
    }
    if (user) {
      setError("");
      localStorage.setItem("companyId", user.companyId); // save companyId to localStorage
      logIn(email.value, password.value);
    } else {
      setError("Invalid email or password.");
    }
  };

  const [signupSuccess, setSignupSuccess] = useState("");

  const handleSignupSuccess = (message) => {
    handleClose();
    setSignupSuccess(message);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Email"
            type="email"
            name="email"
            required
            fullWidth
            autoFocus
          />
          {signupSuccess && (
            <Box mb={2}>
              <Alert severity="success">{signupSuccess}</Alert>
            </Box>
          )}
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            name="password"
            required
            fullWidth
          />
        </Box>
        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        <Box mb={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log In
          </Button>
        </Box>
        <Box mb={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleOpen}
          >
            Sign Up
          </Button>
        </Box>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <SignupForm onSuccess={handleSignupSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginForm;
