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
import Box from "@mui/material/Box";

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
          <Box mb={2}>
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
          </Box>
          <Box mb={2}>
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
          </Box>
          <Box mb={2}>
            <Controller
              name="street"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street Address"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="province"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Province"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Postal Code"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Box>
          <Box mb={2}>
          <Controller
            name="contactName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="School Contact Name"
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </Box>

        <Box mb={2}>
          <Controller
            name="contactPhone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact Phone Number"
                fullWidth
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </Box>
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
