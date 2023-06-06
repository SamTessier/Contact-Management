import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const StaffDetails = ({ staff, open, handleClose, onEdit, onDelete }) => {
  if (!staff) {
    return null;
  }

  const handleEditClick = () => {
    onEdit(staff);
  };

  const handleDeleteClick = () => {
    onDelete(staff.id);
    handleClose();
  };
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div" style={{ color: "black" }}>
          {staff.name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" style={{ color: "black" }}>
          Name: {staff.name}
        </Typography>
        <Typography variant="h6" style={{ color: "black" }}>
          Phone Number:
          <a href={`tel:${staff.phoneNumber}`}>{staff.phoneNumber}</a>
        </Typography>
        <Typography variant="h6" style={{ color: "black" }}>
          Email:
          <a href={`mailto:${staff.email}`}>{staff.email}</a>
        </Typography>
        <Typography variant="h6" style={{ color: "black" }}>
          School: {staff.school}
        </Typography>
        <Typography variant="h6" style={{ color: "black" }}>
          Date of Hire: {new Date(staff.dateOfHire).toLocaleDateString()}
        </Typography>
        <Typography variant="h6" style={{ color: "black" }}>
          Notes:
        </Typography>
        <Typography variant="body1" style={{ color: "black" }}>
          {staff.notes}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Edit />} onClick={handleEditClick} />
        <Button startIcon={<Delete />} onClick={handleDeleteClick} />
      </DialogActions>
    </Dialog>
  );
};

export default StaffDetails;
