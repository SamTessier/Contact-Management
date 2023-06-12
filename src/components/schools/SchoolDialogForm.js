import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const SchoolDialogForm = ({ open, handleClose, onSubmit, school }) => {
  const defaultValues = school || {
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    contactPerson: "",
    notes: ""
  };

  const { handleSubmit, control } = useForm({ defaultValues });

  const handleFormSubmit = (data) => {
    console.log('Form submission data: ', data);
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: "black" }}>
        {school ? "Edit School" : "Add New School"}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box mb={2}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Full Name" fullWidth required />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Address" fullWidth required />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Phone Number" fullWidth required />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  fullWidth
                  required
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="contactPerson"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact Person (Optional)"
                  fullWidth
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Notes (Optional)" fullWidth />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{school ? "Update" : "Add"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SchoolDialogForm;
