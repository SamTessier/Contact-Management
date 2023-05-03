import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainScreen from './components/MainScreen';
import AllSchools from './components/AllSchools';
import CreateSchool from './components/CreateSchool';
import AllStaff from './components/AllStaff';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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

  return (
    <Router>
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to my app!
        </Typography>
        {!showLogin && !showSignup && (
          <div style={{ display: 'grid', gap: '1rem', placeItems: 'center' }}>
            {/* ... login and signup buttons */}
          </div>
        )}
        {showLogin && <LoginForm onClose={handleClose} />}
        {showSignup && <SignupForm onClose={handleClose} />}
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/schools" element={<AllSchools />} />
          <Route path="/createschool" element={<CreateSchool />} />
          <Route path="/staff" element={<AllStaff />} /> 
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
