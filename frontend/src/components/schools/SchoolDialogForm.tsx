import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { School } from "./types";

type SchoolDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: School) => void;
  school?: School;
};

const createEmptyObject = (keys: string[]): Record<string, string> => {
  return keys.reduce((obj, key) => ({ ...obj, [key]: "" }), {});
};

const SchoolDialogForm = ({
  open,
  handleClose,
  onSubmit,
  school,
}: SchoolDialogFormProps): JSX.Element => {
  const keys = ["name", "address", "phoneNumber", "email", "contactPerson", "notes"];
  const defaultValues = school || createEmptyObject(keys);

  const { handleSubmit, control } = useForm({ defaultValues });
  const handleFormSubmit = (data: School) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: "black" }}>
        {school ? "Edit School" : "Add New School"}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          {/*... Rest of the form fields */}
        </DialogContent>
        <DialogActions>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{school ? "Update" : "Add"}</Button>
          </DialogActions>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SchoolDialogForm;
