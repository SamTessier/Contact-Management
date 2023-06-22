import React, { useContext } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import MainScreen from "./MainScreen";
import AllSchools from "./schools/AllSchools";
import AllStaff from "./staff/AllStaff";
import AllStudents from "./students/AllStudents";
import { AuthContext } from "../AuthContext";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";

const AuthenticatedRoutes = () => {
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

export default AuthenticatedRoutes;
