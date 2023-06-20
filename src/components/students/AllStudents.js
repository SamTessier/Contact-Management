import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import {
  getStudents,
  saveStudent,
  updateStudent,
  deleteStudent,
  getSchools,
} from "../../localStorageDB";

import StudentDetails from "./StudentDetails";

import StudentList from "./StudentList";
import StudentDialogForm from "./StudentDialogForm";
import { SearchContext } from "../SearchContext"; // Import SearchContext

const AllStudents = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create"); // Add dialogMode state

  // Get searchTerm from SearchContext
  const [searchTerm] = useContext(SearchContext);
  const companyId = localStorage.getItem("companyId");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    if (companyId) {
      setStudents(getStudents(companyId));
      setSchools(getSchools(companyId));
    }
  }, [companyId]);

  useEffect(() => {
    let filteredStudents = students;
    if (searchTerm !== "") {
      filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredStudents(filteredStudents);
  }, [students, searchTerm]);

  const onSubmit = (data) => {
    const companyId = localStorage.getItem("companyId");
    if (companyId) {
      data.companyId = companyId;
    }
    if (dialogMode === "edit") {
      updateStudent(selectedStudent.id, data);
      setStudents((prevStudents) => {
        const index = prevStudents.findIndex(
          (student) => student.id === selectedStudent.id
        );
        if (index !== -1) {
          const updatedStudents = [...prevStudents];
          updatedStudents[index] = data;
          return updatedStudents;
        }
        return prevStudents;
      });
    } else {
      saveStudent(data);
      setStudents((prevStudents) => [...prevStudents, data]);
    }

    handleModalClose();
    reset();
  };

  const handleDelete = (studentId) => {
    deleteStudent(studentId);
    setStudents(getStudents());
  };

  const handleModalOpen = () => setModalOpen(true);

  const handleModalClose = () => {
    setModalOpen(false);
    setDialogMode("create"); // Reset dialogMode to 'create'
    setSelectedStudent(null); // Reset selected student
    
  };

  const handleDetailsOpen = (student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => setDetailsOpen(false);

  const handleStudentSelect = (student) => {
    // handleStudentSelect function
    setSelectedStudent(student);
    setDialogMode("edit");
    setModalOpen(true);
  };

  const updateStudentsList = () => {
    setStudents(getStudents());
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#EFBD26",
    "&:hover": {
      backgroundColor: "#EFBD26",
    },
    padding: theme.spacing(1),
  }));

  useEffect(() => {
    if (selectedStudent) {
      reset(selectedStudent);
    } else {
      reset();
    }
  }, [selectedStudent]);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <StudentList
        students={filteredStudents}
        handleDetailsOpen={handleDetailsOpen}
      />
      <Grid item container justifyContent="center">
        <CustomButton variant="contained" onClick={handleModalOpen}>
          <PersonAddIcon sx={{ color: "black" }} />
        </CustomButton>
      </Grid>
      <StudentDialogForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        dialogMode={dialogMode}
        reset={reset}
        errors={errors}
        schools={schools}
        updateStudentsList={updateStudentsList}
      />
      <StudentDetails
        student={selectedStudent}
        open={detailsOpen}
        handleClose={handleDetailsClose}
        handleDelete={handleDelete}
        handleEdit={handleStudentSelect} // Change handleEdit to use handleStudentSelect
      />
    </Grid>
  );
};

export default AllStudents;
