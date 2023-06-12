import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const StaffDialogForm = ({ open, handleClose, onSubmit, schools, staff }) => {
  const defaultValues = staff || {
    name: "",
    phoneNumber: "",
    email: "",
    school: "",
    notes: "",
  };

  const { handleSubmit, control } = useForm({ defaultValues });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: "black" }}>
        {staff ? "Edit Staff" : "Add New Staff"}
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label="Full Name" fullWidth required />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label="Phone Number" fullWidth required />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field }) => (
              <TextField {...field} label="Email" fullWidth required />
            )}
          />

          <Controller
            name="school"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="school-label">School</InputLabel>
                <Select {...field} labelId="school-label">
                  {schools.map((school, index) => (
                    <MenuItem key={index} value={school.name}>
                      {school.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Allergies/Medical Conditions"
                multiline
                rows={4}
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" style={{ color: "black" }}>
            {staff ? "Save Changes" : "Add Staff"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StaffDialogForm;
