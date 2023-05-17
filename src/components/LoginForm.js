import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const LoginForm = ({ onClose }) => {
  const { logIn } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,20}$/;

    if (!emailRegex.test(email.value)) {
      setError('Invalid email format.');
    } else if (!passwordRegex.test(password.value)) {
      setError(
        'Password must be 4-20 characters, contain at least 1 uppercase and 1 lowercase letter, and 1 number.'
      );
    } else {
      setError('');
      logIn(email.value, password.value);
      onClose();
    }
  };

  return (
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
    </form>
  );
  
}

export default LoginForm;
