import { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import StaffDialogForm from "./StaffDialogForm";
import { Staff } from "../types";

type StaffDetailsProps = {
  open: boolean;
  handleClose: () => void;
  staff: Staff;
  handleDelete: (id: string) => void;
  handleUpdateStaff: (updatedStaff: Staff) => void;
  schools: any;
};

const StaffDetails = ({
  open,
  handleClose,
  staff,
  handleDelete,
  handleUpdateStaff,
  schools,
}: StaffDetailsProps): JSX.Element => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFormSubmit = (data: Staff) => {
    handleUpdateStaff({ ...staff, ...data });
    handleClose();
  };

  const handleDeleteClick = () => {
    handleDelete(staff.id);
    handleClose();
  };

  return (
    <>
      {editMode ? (
        <StaffDialogForm
          open={open}
          handleClose={handleClose}
          onSubmit={handleFormSubmit}
          staff={staff}
          schools={schools}
        />
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Typography variant="h5">{staff.name}</Typography>
            <Typography variant="subtitle1">{staff.address}</Typography>
            <Typography variant="subtitle1">{staff.phoneNumber}</Typography>
            <Typography variant="subtitle1">{staff.email}</Typography>
            <Typography variant="subtitle1">{staff.school}</Typography>
            <Typography variant="subtitle1">
              Contact: {staff.contactPerson}
            </Typography>
            <Typography variant="subtitle1">Notes: {staff.notes}</Typography>
          </DialogContent>
          <DialogActions>
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
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default StaffDetails;
