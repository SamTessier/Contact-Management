import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AdminCreationForm from './AdminCreationForm';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Box from '@mui/material/Box';

const MainLoginSignup = (): JSX.Element => {
  const [formType, setFormType] = useState<'login' | 'signup' | 'admin'>('login');

  const renderForm = () => {
    switch (formType) {
      case 'login':
        return <LoginForm />;
      case 'signup':
        return <SignupForm />;
      case 'admin':
        return <AdminCreationForm />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <Box>
      <Box mb={2}>
        <Button onClick={() => setFormType('login')} variant="contained">Login</Button>
        <Button onClick={() => setFormType('signup')} variant="contained">Signup</Button>
        <Button onClick={() => setFormType('admin')} variant="contained">Create Admin</Button>
      </Box>
      {renderForm()}
    </Box>
  );
};

export default MainLoginSignup;
