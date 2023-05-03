import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainScreen from './components/MainScreen';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleDevBypass = () => {
    setShowMain(true);
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleNavigate = () => {
    setShowMain(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to my app!
      </Typography>
      {!showLogin && !showSignup && !showMain && (
        <div style={{ display: 'grid', gap: '1rem', placeItems: 'center' }}>
          <div>
            <Button variant="contained" color="primary" fullWidth sx={{ minWidth: 200 }} onClick={handleLoginClick}>
              Login
            </Button>
          </div>
          <div>
            <Button variant="contained" color="primary" fullWidth sx={{ minWidth: 200 }} onClick={handleSignupClick}>
              Signup
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              fullWidth
              sx={{ minWidth: 200 }}
              onClick={handleDevBypass}
            >
              Developer Bypass
            </Button>
          </div>
        </div>
      )}
      {showLogin && <LoginForm onClose={handleClose} />}
      {showSignup && <SignupForm onClose={handleClose} />}
      {showMain && <MainScreen onNavigate={handleNavigate} />}
    </Container>
  );
}

export default App;
