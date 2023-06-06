import React, { useEffect } from "react";
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

const StaffDialogForm = ({ open, handleClose, onSubmit, schools, staff, onEdit }) => {
  const { handleSubmit, control, setValue } = useForm({});

  useEffect(() => {
    if (staff) {
      Object.entries(staff).forEach(([key, value]) => {
        setValue(key, value, { shouldValidate: true, shouldDirty: true });
      });
    }
  }, [staff, setValue]);

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
            defaultValue={staff ? staff.name : ""}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label="Full Name" fullWidth required />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            defaultValue={staff ? staff.phoneNumber : ""}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label="Phone Number" fullWidth required />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue={staff ? staff.email : ""}
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field }) => (
              <TextField {...field} label="Email" fullWidth required />
            )}
          />

          <Controller
            name="school"
            control={control}
            defaultValue={staff ? staff.school : ""}
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
            defaultValue={staff ? staff.notes : ""}
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
