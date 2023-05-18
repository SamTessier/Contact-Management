import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import {
  saveStudent,
  getStudents,
  getSchools,
  deleteStudent,
  updateStudent,
} from "../localStorageDB";
import StudentDetails from "./StudentDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AllStudents = () => {
  const {
    register,
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

  useEffect(() => {
    setStudents(getStudents());
    setSchools(getSchools());
  }, []);

  const onSubmit = (data) => {
    if (editStudentName) {
      console.log("hi sam and pat")
      const updatedStudent = { ...data, name: editStudentName };
      updateStudent(updatedStudent);
  
    } else {
      console.log("else block")
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
      <Grid item>
        {students.length === 0 ? (
          <Typography variant="h5" align="center">
            There are no students yet! Add a student to begin.
          </Typography>
        ) : (
          students.map((student, index) => (
            <Grid key={index} item>
              <Typography variant="h6">
                {student.name}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: 2 }}
                  onClick={() => handleDetailsOpen(student)}
                >
                  View Details
                </Button>
              </Typography>
            </Grid>
          ))
        )}
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ minWidth: 200 }}
          onClick={handleModalOpen}
        >
          {editStudentName ? "Edit Student" : "Add Student"}
        </Button>
      </Grid>

      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {editStudentName ? "Edit Student" : "Add New Student"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Controller
              name="school"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="school-label">School</InputLabel>
                  <Select {...field} labelId="school-label">
                    {schools.map((school, index) => (
                      <MenuItem key={index} value={school.name}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="grade"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="grade-label">Grade</InputLabel>
                  <Select {...field} labelId="grade-label">
                    {[...Array(12).keys()].map((_, index) => (
                      <MenuItem key={index} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="parentName"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Parent/Guardian Name"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Controller
              name="parentPhone"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Parent/Guardian Phone"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Controller
              name="parentEmail"
              control={control}
              defaultValue=""
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Parent/Guardian Email"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Controller
              name="allergies"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Allergies/Medical Conditions"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Controller
              name="enrollmentDates"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Enrollment Date"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Controller
              name="notes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notes"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {editStudentName ? "Save Changes" : "Add Student"}
          </Button>
        </DialogActions>
      </Dialog>

      <StudentDetails
        student={selectedStudent}
        open={detailsOpen}
        handleClose={handleDetailsClose}
      />
    </Grid>
  );
};

export default AllStudents;
