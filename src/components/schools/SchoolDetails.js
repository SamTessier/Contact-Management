import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SchoolDialogForm from "./SchoolDialogForm";

const SchoolDetails = ({
  open,
  handleClose,
  school,
  handleDelete,
  handleUpdate,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFormSubmit = (data) => {
    handleUpdate({ ...school, ...data });
    handleClose();
  };

  const handleFormCancel = () => {
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    handleDelete(school.id);
    handleClose();
  };

  return (
    <>
      {editMode ? (
        <SchoolDialogForm
          open={open}
          handleClose={handleClose}
          onSubmit={handleFormSubmit}
          school={school}
        />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5">{school.name}</Typography>
            <Typography variant="subtitle1">Address: {school.address}</Typography>
            <Typography variant="subtitle1">Phone Number: {school.phoneNumber}</Typography>
            <Typography variant="subtitle1">Email: {school.email}</Typography>
            <Typography variant="subtitle1">Contact Person: {school.contactPerson}</Typography>
            <Typography variant="subtitle1">Notes: {school.notes}</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleEditClick}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              startIcon={<DeleteOutlineIcon />}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default SchoolDetails;
