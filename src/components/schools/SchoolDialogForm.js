import React, { useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Button,
  Box
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const SchoolDialogForm = ({ open, handleClose, onSubmit, school }) => {
  const { handleSubmit, control, setValue } = useForm({});

  useEffect(() => {
    if (school) {
      Object.entries(school).forEach(([key, value]) => {
        setValue(key, value, { shouldValidate: true, shouldDirty: true });
      });
    }
  }, [school, setValue]);

  const handleFormSubmit = (data) => {
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
              value={school ? school.name : ""}
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
              value={school ? school.address : ""}
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
              value={school ? school.phoneNumber : ""}
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
              value={school ? school.email : ""}
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
              value={school ? school.contactPerson : ""}
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
              value={school ? school.notes : ""}
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
