import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const SignupForm = ({ onClose }) => {
  const { signUp } = useContext(AuthContext);
  console.log(signUp)
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
      signUp(email.value, password.value);
      onClose();
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        name="email"
        required
        fullWidth
        autoFocus
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        required
        fullWidth
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ minWidth: 200 }}
            >
              Signup
            </Button>
          
      </form>
    
  );
}

export default SignupForm;
