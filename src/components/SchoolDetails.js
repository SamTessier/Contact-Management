import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

const SchoolDetails = ({ school, open, handleClose }) => {
  if (!school) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{school.name}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Phone Number: {school.phone}</Typography>
        <Button color="primary" href={`tel:${school.phone}`}>
          Call
        </Button>
        <Typography variant="h6">Email Address: {school.email}</Typography>
        <Button color="primary" href={`mailto:${school.email}`}>
          Email
        </Button>
        <Typography variant="h6">Address: </Typography>
        <Typography variant="body1">{school.street}</Typography>
        <Typography variant="body1">{school.city}, {school.state} {school.zip}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default SchoolDetails;
