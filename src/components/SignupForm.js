import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function SignupForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add logic to submit the signup form
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ minWidth: 200 }}
            >
              Signup
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ minWidth: 200 }}
              onClick={onClose}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SignupForm;
