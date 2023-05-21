import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const StudentDetails = ({ student, open, handleClose, handleEdit, handleDelete }) => {
  if (!student) {
    return null;
  }

  const handleEditClick = () => {
    handleEdit(student.name);
  };
  
const handleDeleteClick = () => {
  handleDelete(student.name);
  handleClose();
};

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div"  style={{ color: 'black' }}>
          {student.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" style={{ color: 'black' }}>School: {student.school}</Typography>
        <Typography variant="h6" style={{ color: 'black' }}>Grade: {student.grade}</Typography>
        <Typography variant="h6" style={{ color: 'black' }}>Parent/Guardian Info:</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>Name: {student.parentName}</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>Phone Number: {student.parentPhone}</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>Email: {student.parentEmail}</Typography>
        <Typography variant="h6" style={{ color: 'black' }}>Allergies/Medical Conditions:</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>{student.allergies}</Typography>
        <Typography variant="h6" style={{ color: 'black' }}>Notes:</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>{student.notes}</Typography>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Edit />} onClick={handleEditClick} />
        <Button startIcon={<Delete />} onClick={handleDeleteClick} />
      </DialogActions>
    </Dialog>
  );
};

export default StudentDetails;
