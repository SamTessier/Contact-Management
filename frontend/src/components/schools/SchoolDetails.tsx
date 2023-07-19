import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SchoolDialogForm from "./SchoolDialogForm";
import { School } from "./types";

type SchoolDetailsProps = {
  open: boolean;
  handleClose: () => void;
  school: School;
  handleDelete: (id: string) => void;
  handleUpdateSchool: (school: School) => void;
};

const SchoolDetails = ({
  open,
  handleClose,
  school,
  handleDelete,
  handleUpdateSchool,
}: SchoolDetailsProps): JSX.Element => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFormSubmit = (data: School) => {
    handleUpdateSchool({ ...school, ...data });
    handleClose();
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
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Typography variant="h5">{school.name}</Typography>
            <Typography variant="subtitle1">{school.address}</Typography>
            <Typography variant="subtitle1">{school.phoneNumber}</Typography>
            <Typography variant="subtitle1">{school.email}</Typography>
            <Typography variant="subtitle1">
              Contact: {school.contactPerson}
            </Typography>
            <Typography variant="subtitle1">Notes: {school.notes}</Typography>
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

export default SchoolDetails;
