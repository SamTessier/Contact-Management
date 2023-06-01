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
import { Controller } from "react-hook-form";

const StaffDialogForm = ({
  open,
  handleClose,
  onSubmit,
  control,
  errors,
  schools,
  staffName,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: "black" }}>
        {staffName ? "Edit Staff" : "Add New Staff"}
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                fullWidth
                required
              />
            )}
          />

          <Controller
            name="staffPhone"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                required
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                required
              />
            )}
          />

          <Controller
            name="school"
            control={control}
            defaultValue=""
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
            defaultValue=""
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
            {staffName ? "Save Changes" : "Add Staff"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StaffDialogForm;
