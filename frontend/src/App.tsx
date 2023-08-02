import MainScreen from "./components/MainScreen";
import AllSchools from "./components/schools/AllSchools";
import SearchBar from "./components/SearchBar";
import { SearchProvider } from "./components/SearchContext";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

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

const LogoutButton = (): JSX.Element => {
  const navigate = useNavigate();
  
  const handleLogoutClick = () => {
    navigate("/login");
  };

  return (
    <button onClick={handleLogoutClick}>Logout</button>
  );
};


const BackButton = (): JSX.Element => {
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

const EmptyBackButton = (): JSX.Element => (
  <IconButton disabled style={{ color: "transparent" }}>
    <ArrowBackIcon fontSize="small" />
  </IconButton>
);

const App = (): JSX.Element => {
  return (
<Router>
<QueryClientProvider client={queryClient}>
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
        </StyledApp>
        </QueryClientProvider>
      </Router>
  );
};

const LocationDependentToolbar = (): JSX.Element => {
  const location = useLocation();

  return (
    <>
     {["/", "/login", "/signup"].includes(location.pathname) ? <EmptyBackButton /> : <BackButton />}
      <Typography variant="subtitle1">
        <CurrentPage />
      </Typography>
    </>
  );
};

const CurrentPage = (): string => {
  const location = useLocation();

  let path = location.pathname.replace("/", "").toLowerCase();
  path = path.charAt(0).toUpperCase() + path.slice(1);
  if (path === "") {
    path = "Main";
  }

  return path;
};

const RoutesWithAuthentication = (): JSX.Element => {
  return (
    <Container maxWidth="sm" sx={{ flexGrow: 1 }}>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/schools" element={<AllSchools />} />
        {/* <Route path="/staff" element={<AllStaff />} />
        <Route path="/students" element={<AllStudents />} /> */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
