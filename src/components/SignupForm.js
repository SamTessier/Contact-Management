import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { getUsers, getSchools } from "../localStorageDB";

const SignupForm = ({ onSuccess }) => {
  const companyId = localStorage.getItem("companyId");
  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [school, setSchool] = useState("");
  const schools = getSchools(companyId);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, companyId } = event.target.elements;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,20}$/;
    const users = getUsers();
    const userExists = users.some((user) => user.email === email.value);

    if (userExists) {
      setError("User with this email already exists.");
    } else if (!emailRegex.test(email.value)) {
      setError("Invalid email format.");
    } else if (!passwordRegex.test(password.value)) {
      setError(
        "Password must be 4-20 characters, contain at least 1 uppercase and 1 lowercase letter, and 1 number."
      );
    } else {
      const storedCompanyId = localStorage.getItem("companyId");
      const newCompanyId = storedCompanyId ? storedCompanyId : companyId.value;
      if (!storedCompanyId) {
        localStorage.setItem("companyId", newCompanyId);
      }
      setError("");
      signUp(username.value, email.value, password.value, newCompanyId, school);
      onSuccess("Account created successfully. Please log in");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Box mb={2}>
        <TextField
          label="Full Name"
          type="username"
          name="username"
          required
          fullWidth
          autoFocus
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Email"
          type="email"
          name="email"
          required
          fullWidth
          autoFocus
        />
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
      {companyId && (
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel id="school-label">School</InputLabel>
            <Select
              labelId="school-label"
              value={school}
              onChange={(event) => setSchool(event.target.value)}
            >
              {schools.map((school, index) => (
                <MenuItem key={index} value={school.name}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {!companyId && (
        <Box mb={2}>
          <TextField
            label="Company ID"
            type="text"
            name="companyId"
            required
            fullWidth
          />
        </Box>
      )}
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box mb={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default SignupForm;
