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
import StaffDialogForm from "./staff/StaffDialogForm";
import SchoolDialogForm from "./schools/SchoolDialogForm";
import StudentDialogForm from "./students/StudentDialogForm";
import { AuthContext } from "./../AuthContext";

const forms = {
  staff: StaffDialogForm,
  school: SchoolDialogForm,
  student: StudentDialogForm,
};

const fieldsToExclude = ["companyId", "role", "id"];

const DetailsFactory = ({ config }) => {
  const [editMode, setEditMode] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFormSubmit = (data) => {
    config.handleUpdate({ ...config.item, ...data });
    config.handleClose();
  };

  const handleDeleteClick = () => {
    config.handleDelete(config.item.id);
    config.handleClose();
  };

  const DialogForm = forms[config.itemType];
  const itemFields = Object.keys(config.item).filter(
    (field) => !fieldsToExclude.includes(field)
  );

  return (
    <>
      {editMode ? (
        <DialogForm
          open={config.open}
          handleClose={config.handleClose}
          onSubmit={handleFormSubmit}
          item={config.item}
          schools={config.schools}
        />
      ) : (
        <Dialog open={config.open} onClose={config.handleClose}>
          <DialogContent>
            {itemFields.map((field) => (
              <Typography variant="subtitle1" key={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
                {config.item[field]}
              </Typography>
            ))}
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

export default DetailsFactory;
