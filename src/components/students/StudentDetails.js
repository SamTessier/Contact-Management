import React, { useState } from "react";
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

const StudentDetails = ({
  open,
  handleClose,
  student,
  handleDelete,
  handleUpdateStudent,
  schools,
}) => {
  const [editMode, setEditMode] = useState(false);

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
            <Typography variant="h6" style={{ color: "black" }}>
              School: {student.school}
            </Typography>
            <Typography variant="h6" style={{ color: "black" }}>
              Grade: {student.grade}
            </Typography>
            <Typography variant="h6" style={{ color: "black" }}>
              Parent/Guardian Info:
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              Name: {student.parentName}
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              Phone Number: {student.parentPhone}
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              Email: {student.parentEmail}
            </Typography>
            <Typography variant="h6" style={{ color: "black" }}>
              Allergies/Medical Conditions:
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              {student.allergies}
            </Typography>
            <Typography variant="h6" style={{ color: "black" }}>
              Notes:
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              {student.notes}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClick} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              startIcon={<DeleteOutlineIcon />}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default StudentDetails;
