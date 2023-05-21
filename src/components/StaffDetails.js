import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const StaffDetails = ({ staff, open, handleClose, handleEdit, handleDelete }) => {
  if (!staff) {
    return null;
  }

  const handleEditClick = () => {
    handleEdit(staff.name);
  };
  
  const handleDeleteClick = () => {
    handleDelete(staff.name);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div"  style={{ color: 'black' }}>
          {staff.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" style={{ color: 'black' }}>School: {staff.school}</Typography>
        <Typography variant="h6" style={{ color: 'black' }}>Grade: {staff.grade}</Typography>
        <Typography variant="h6" style={{ color: 'black' }}>Parent/Guardian Info:</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>Name: {staff.parentName}</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>Phone Number: {staff.parentPhone}</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>Email: {staff.parentEmail}</Typography>
        <Typography variant="h6" style={{ color: 'black' }}>Allergies/Medical Conditions:</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>{staff.allergies}</Typography>
        <Typography variant="h6" style={{ color: 'black' }}>Notes:</Typography>
        <Typography variant="body1" style={{ color: 'black' }}>{staff.notes}</Typography>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Edit />} onClick={handleEditClick} />
        <Button startIcon={<Delete />} onClick={handleDeleteClick} />
      </DialogActions>
    </Dialog>
  );
};

export default StaffDetails;
