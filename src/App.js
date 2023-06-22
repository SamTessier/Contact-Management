import React, { useContext } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import MainScreen from "./components/MainScreen";
import AllSchools from "./components/schools/AllSchools";
import AllStaff from "./components/staff/AllStaff";
import AllStudents from "./components/students/AllStudents";
import SearchBar from "./components/SearchBar";
import { SearchProvider } from "./components/SearchContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { LoadingProvider, LoadingContext } from './LoadingContext';
import { CircularProgress } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledApp = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  width: "100vw",
  height: "100vh",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const LogoutButton = () => {
  const { logOut, currentUser } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {currentUser && (
        <>
          <IconButton sx={{ color: "red" }} onClick={handleLogOut}>
            <ExitToAppIcon fontSize="small" />{" "}
          </IconButton>
          <Typography variant="caption" display="block" textAlign="center">
            Log Out
          </Typography>
        </>
      )}
    </Box>
  );
};

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <IconButton onClick={handleBackClick}>
      <ArrowBackIcon fontSize="small" />
    </IconButton>
  );
};

const EmptyBackButton = () => (
  <IconButton disabled style={{ color: "transparent" }}>
    <ArrowBackIcon fontSize="small" />
  </IconButton>
);

const App = () => {
  return (
    <AuthProvider>
      <LoadingProvider>
      <Router>
        <StyledApp>
          <StyledAppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <LogoutButton />
              <LocationDependentToolbar />
              <EmptyBackButton/>
              <Typography variant="h6" sx={{ marginLeft: "10px" }}>
                EdNet
              </Typography>
            </Toolbar>
          </StyledAppBar>
          <SearchProvider>
          
            <SearchBar />
            <RoutesWithAuthentication />
          </SearchProvider>
          <LoadingScreen />
        </StyledApp>
      </Router>
      </LoadingProvider>
    </AuthProvider>
  );
};

const LocationDependentToolbar = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" ? <BackButton /> : <EmptyBackButton />}
      <Typography variant="subtitle1">
        <CurrentPage />
      </Typography>
    </>
  );
};

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
          {currentUser.role === "admin" && (
            <>
              <Route path="/schools" element={<AllSchools />} />
              <Route path="/createschool" element={<AllSchools />} />
            </>
          )}
          <Route path="/staff" element={<AllStaff />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/createstudent" element={<AllStudents />} />
          <Route path="/createstaff" element={<AllStaff />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      )}
    </Container>
  );
};

const LoadingScreen = () => {
  const { loading } = useContext(LoadingContext);
  return (
    loading && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        position="fixed"
        left={0}
        top={0}
        width="100vw"
        height="100vh"
        bgcolor="rgba(255, 255, 255, 0.7)"
        zIndex="modal"
      >
        <CircularProgress />
      </Box>
    )
  );
};

export default App;
