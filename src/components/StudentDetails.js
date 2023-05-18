import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const StudentDetails = ({ student, open, handleClose, handleEdit, handleDelete }) => {
  if (!student) {
    return null;
  }

  const handleEditClick = () => {
    handleEdit(student);
  };

  const handleDeleteClick = () => {
    handleDelete(student);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div">
          {student.name}
        </Typography>
        <div>
          <Button startIcon={<Edit />} onClick={handleEditClick}>
            Edit
          </Button>
          <Button startIcon={<Delete />} onClick={handleDeleteClick}>
            Delete
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">Grade: {student.grade}</Typography>
        <Typography variant="h6">Parent/Guardian Info:</Typography>
        <Typography variant="h6">Name: {student.parentGuardianName}</Typography>
        <Typography variant="h6">Phone Number: {student.parentGuardianPhone}</Typography>
        <Typography variant="h6">Email: {student.parentGuardianEmail}</Typography>
        <Typography variant="h6">Notes, Requests, Allergies:</Typography>
        <Typography variant="body1">{student.notes}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetails;
