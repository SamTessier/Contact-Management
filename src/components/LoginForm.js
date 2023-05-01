import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function LoginForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add logic to submit the login form
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
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button type="button" variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default LoginForm;