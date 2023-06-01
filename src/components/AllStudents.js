import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import {
  saveStudent,
  getStudents,
  getSchools,
  deleteStudent,
  updateStudent,
} from "../localStorageDB";

import StudentDetails from "./StudentDetails";
import StudentSearch from "./StudentSearch";
import StudentList from "./StudentList";
import StudentDialogForm from "./StudentDialogForm";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setStudents(getStudents());
    setSchools(getSchools());
  }, []);

  let filteredStudents = students;
  if (searchTerm !== "") {
    filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const onSubmit = (data) => {
    if (editStudentName) {
      console.log("hi sam and pat");
      const updatedStudent = { ...data, name: editStudentName };
      updateStudent(updatedStudent);
    } else {
      console.log("else block");
      const newStudent = { ...data };
      saveStudent(newStudent);
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
      <StudentSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      <StudentList
        students={filteredStudents}
        handleDetailsOpen={handleDetailsOpen}
      />
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
