import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AdminCreationForm from './AdminCreationForm';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const MainLoginSignup = (): JSX.Element => {
  const [formType, setFormType] = useState<'login' | 'signup' | 'admin'>('login');

  return (
    <Box>
      <Box mb={2}>
        <Button onClick={() => setFormType('login')} variant="contained">Login</Button>
        <Button onClick={() => setFormType('signup')} variant="contained">Signup</Button>
        <Button onClick={() => setFormType('admin')} variant="contained">Create Admin</Button>
      </Box>
      {formType === 'login' && <LoginForm />}
      {formType === 'signup' && <SignupForm />}
      {formType === 'admin' && <AdminCreationForm />}
    </Box>
  );
};

export default MainLoginSignup;
