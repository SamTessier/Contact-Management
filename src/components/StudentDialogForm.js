import React from 'react';
import { Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import {
    saveStudent,
    updateStudent,
  } from "../localStorageDB";
  
const StudentDialogForm = ({ control, handleSubmit, modalOpen, handleModalClose, editStudentName, reset, errors, schools }) => {

  const onSubmit = (data) => {
    if (editStudentName) {
      updateStudent(editStudentName, data.name, data.school);
    } else {
      saveStudent(data.name, data.school);
    }
    handleModalClose();
    reset({ name: "", school: "" });
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {editStudentName ? "Edit Student" : "Add New Student"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
          <Controller
            name="school"
            control={control}
            defaultValue=""
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={schools}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="School"
                    fullWidth
                    error={!!errors.school}
                    helperText={errors.school ? errors.school.message : ""}
                  />
                )}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {editStudentName ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentDialogForm;
