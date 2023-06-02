import React, { useContext } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainScreen from './components/MainScreen';
import AllSchools from './components/AllSchools';
import AllStaff from './components/AllStaff';
import AllStudents from './components/AllStudents';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import { AppBar, Toolbar, IconButton, Typography, Container, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/system';
import { useLocation } from "react-router-dom";

const StyledApp = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  width: '100vw',
  height: '100vh',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <StyledApp>
          <StyledAppBar position="static">
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant="h6" sx={{ marginLeft: '10px' }}>
                EdNet
              </Typography>
              <Typography variant="subtitle1">
                <CurrentPage />
              </Typography>
              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Typography variant="h6" sx={{opacity: 0}}>
                  EdN
                </Typography>
                <IconButton edge="end" color="inherit" aria-label="settings">
                  <SettingsIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </StyledAppBar>
          <RoutesWithAuthentication />
        </StyledApp>
      </Router>
    </AuthProvider>
  );
}

const CurrentPage = () => {
  const location = useLocation();

  let path = location.pathname.replace("/", "").toLowerCase();
  path = path.charAt(0).toUpperCase() + path.slice(1);
  if (path === "") {
    path = "Main";
  }

  return path;
};

const RoutesWithAuthentication = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container maxWidth="sm" sx={{ flexGrow: 1 }}>
      {currentUser === null ? (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/schools" element={<AllSchools />} />
          <Route path="/createschool" element={<AllSchools />} />
          <Route path="/staff" element={<AllStaff />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/createstudent" element={<AllStudents />} />
          <Route path="/createstaff" element={<AllStaff />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      )}
    </Container>
  );
}

export default App;
