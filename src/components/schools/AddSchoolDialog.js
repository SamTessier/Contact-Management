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
            <Box display="flex" justifyContent="space-between">
              <Controller
                name="street"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Street Address"
                    required
                    style={{ flex: 1, marginRight: "5px" }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              <Controller
                name="suite"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Room # (Optional)"
                    style={{ flex: 1, marginLeft: "5px" }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Box>
          </Box>
          <Box mb={2}>
            <Box display="flex" justifyContent="space-between">
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    required
                    style={{ flex: 1, marginRight: "5px" }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              <Controller
                name="province"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Province"
                    required
                    style={{ flex: 1, marginLeft: "5px" }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Box>
          </Box>
          <Box mb={2}>
            <Box display="flex" justifyContent="space-between">
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Postal Code"
                    required
                    style={{ flex: 1, marginRight: "5px" }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    required
                    style={{ flex: 1, marginLeft: "5px" }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Box>
          </Box>
          <Box mb={2}>
          <Controller
            name="contactName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact Name (Optional)"
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
                label="Contact Phone (Optional)"
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
