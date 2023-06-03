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
} from "../localStorageDB";

import StudentDetails from "./StudentDetails";

import StudentList from "./StudentList";
import StudentDialogForm from "./StudentDialogForm";
import { SearchContext } from './SearchContext'; // Import SearchContext

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
  const [editStudentName, setEditStudentName] = useState(null);

  // Get searchTerm from SearchContext
  const [searchTerm] = useContext(SearchContext);

  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    setStudents(getStudents());
    setSchools(getSchools());
  }, []);

  useEffect(() => {
    let filtered = students;
    if (searchTerm !== "") {
      filtered = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredStudents(filtered);
  }, [students, searchTerm]);

  const onSubmit = (data) => {
    const companyId = localStorage.getItem("companyId");
    if (companyId) {
      data.companyId = companyId;
    }

    if (editStudentName) {
      const updatedStudent = { ...data, name: editStudentName };
      updateStudent(updatedStudent);
    } else {
      saveStudent(data);
    }

    setStudents(getStudents());
    setModalOpen(false);
    setEditStudentName(null);
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setEditStudentName(null);
  };
  const handleDetailsOpen = (student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };
  const handleDetailsClose = () => setDetailsOpen(false);
  const handleDelete = (studentName) => {
    deleteStudent(studentName);
    setStudents(getStudents());
  };

  const handleEditOpen = (studentName) => {
    setEditStudentName(studentName);
    handleModalOpen();
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#EFBD26",
    "&:hover": {
      backgroundColor: "#EFBD26",
    },
    padding: theme.spacing(1),
  }));

  useEffect(() => {
    if (editStudentName) {
      const studentToEdit = students.find(
        (student) => student.name === editStudentName
      );
      reset(studentToEdit);
    } else {
      reset();
    }
  }, [editStudentName]);

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
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        editStudentName={editStudentName}
        reset={reset}
        errors={errors}
        schools={schools}
      />
      <StudentDetails
        student={selectedStudent}
        open={detailsOpen}
        handleClose={handleDetailsClose}
        handleDelete={handleDelete}
        handleEdit={handleEditOpen}
      />
    </Grid>
  );
};

export default AllStudents;
