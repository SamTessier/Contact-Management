import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import StudentDialogForm from "./StudentDialogForm";
import { AuthContext } from "../../AuthContext";

const StudentDetails = ({
  open,
  handleClose,
  student,
  handleDelete,
  handleUpdateStudent,
  schools,
}) => {
  const [editMode, setEditMode] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFormSubmit = (data) => {
    handleUpdateStudent({ ...student, ...data });
    handleClose();
  };

  const handleDeleteClick = () => {
    handleDelete(student.id);
    handleClose();
  };

  return (
    <>
      {editMode ? (
        <StudentDialogForm
          open={open}
          handleClose={handleClose}
          onSubmit={handleFormSubmit}
          student={student}
          schools={schools}
        />
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Typography variant="h6">School: {student.school}</Typography>
            <Typography variant="h6">Grade: {student.grade}</Typography>
            <Typography variant="h6">Parent/Guardian Info:</Typography>
            <Typography variant="body1">Name: {student.parentName}</Typography>
            <Typography variant="body1">
              Phone Number: {student.parentPhone}
            </Typography>
            <Typography variant="body1">
              Email: {student.parentEmail}
            </Typography>
            <Typography variant="h6">Allergies/Medical Conditions:</Typography>
            <Typography variant="body1">{student.allergies}</Typography>
            <Typography variant="h6">Notes:</Typography>
            <Typography variant="body1">{student.notes}</Typography>
          </DialogContent>
          <DialogActions>
            {currentUser.role !== "staff" && (
              <>
            <Button onClick={handleEditClick} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              startIcon={<DeleteOutlineIcon />}
            >
              Delete
            </Button>
            </>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default StudentDetails;
