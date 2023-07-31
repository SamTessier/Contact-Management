import React, { useState, useEffect, useContext } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AuthContext } from "../../AuthContext";
import {
  getStudents,
  saveStudent,
  deleteStudent,
  updateStudent,
  getSchools,
} from "../../localStorageDB";
import StudentDialogForm from "./StudentDialogForm";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import { SearchContext } from "../SearchContext";

const AllStudents = () => {
  const { currentUser } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm] = useContext(SearchContext);
  const [filteredStudents, setFilteredStudent] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    let allStudents = getStudents(companyId);
    if (currentUser.role === "staff") {
      allStudents = allStudents.filter(student => student.school === currentUser.school); 
    }
    setStudents(allStudents);
    getSchools(companyId);
  }, [companyId, currentUser]);

  useEffect(() => {
    let filtered = students;
    if (searchTerm !== "") {
      filtered = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredStudent(filtered);
  }, [students, searchTerm]);

  const handleDialogOpen = () => {
    setSelectedStudent(null);
    getSchools(companyId);
    setDialogMode("create");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleAddStudent = (student) => {
    saveStudent(student, companyId);
    setStudents(getStudents(companyId));
    setDialogOpen(false);
  };

  const handleDeleteStudent = (studentId) => {
    deleteStudent(studentId, companyId);
    setStudents(getStudents(companyId));
  };

  const handleUpdateStudent = (updatedStudent) => {
    console.log("Updated student: ", updatedStudent);
    updateStudent(updatedStudent, companyId);
    setStudents(getStudents(companyId));
    setDialogOpen(false);
  };

  const handleStudentSelect = (student) => {
    console.log("Selected student: ", student);
    setSelectedStudent(student);
    setDialogMode("edit");
    getSchools(companyId);
  };

  const handleDetailsOpen = (student) => {
    setSelectedStudent(student);
    getSchools(companyId);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedStudent(null);
  };

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Box
        border={1}
        borderColor="#EFBD26"
        borderRadius={2}
        p={3}
        m={2}
        bgcolor="grey.100"
        overflow="auto"
        maxHeight={500}
      >
        {filteredStudents.length === 0 ? (
          <Typography variant="h5" align="center">
            No students found
          </Typography>
        ) : (
          <StudentList
            students={filteredStudents}
            onStudentSelect={handleStudentSelect}
            onInfo={handleDetailsOpen}
          />
        )}
      </Box>

      <Grid item container justifyContent="center"> 
        {currentUser.role !== "staff" && (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          sx={{
            bgcolor: "#EFBD26",
            "&:hover": { bgcolor: "#EFBD26" },
            padding: 1,
          }}
        >
          <AddCircleOutlineIcon sx={{ color: "black" }} />
        </Button>
        </>
        )}
      </Grid>
      <StudentDialogForm
        open={dialogOpen}
        handleClose={handleDialogClose}
        onSubmit={dialogMode === "create" ? handleAddStudent : handleUpdateStudent}
        schools={getSchools(companyId)}
      />
      {selectedStudent && (
        <StudentDetails
          open={detailsOpen}
          handleClose={handleDetailsClose}
          student={selectedStudent}
          handleDelete={handleDeleteStudent}
          handleUpdateStudent={handleUpdateStudent}
          schools={getSchools(companyId)}
        />
      )}
    </Grid>
  );
};

export default AllStudents;
