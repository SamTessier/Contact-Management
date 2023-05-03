import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainScreen from './components/MainScreen';
import AllSchools from './components/AllSchools';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('auth');

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

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleDevBypassClick = () => {
    setCurrentScreen('main');
  };

  const handleCreateSchoolClick = () => {
    setCurrentScreen('createschool');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to my app!
      </Typography>
      {!showLogin && !showSignup && currentScreen === 'auth' && (
        <div style={{ display: 'grid', gap: '1rem', placeItems: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLoginClick}
            sx={{ minWidth: 200 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSignupClick}
            sx={{ minWidth: 200 }}
          >
            Signup
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDevBypassClick}>
            Dev Bypass
          </Button>
        </div>
      )}
      {showLogin && <LoginForm onClose={handleClose} />}
      {showSignup && <SignupForm onClose={handleClose} />}
      {currentScreen === 'main' && <MainScreen onNavigate={handleNavigate} />}
      {currentScreen === 'allschools' && <AllSchools onCreateSchool={handleCreateSchoolClick} />}
    </Container>
  );
}

export default App;
