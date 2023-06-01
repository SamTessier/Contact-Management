import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const AddSchoolDialog = ({ open, handleClose, onSubmit }) => {
  const { handleSubmit, control, reset } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New School</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="School Name"
                fullWidth
                required
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                required
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Mailing Address"
                fullWidth
                required
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add School</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSchoolDialog;
