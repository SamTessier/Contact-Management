import React from 'react';
import { Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { saveStudent, updateStudent } from "../localStorageDB";
  
const StudentDialogForm = ({ control, handleSubmit, modalOpen, handleModalClose, editStudentName, reset, errors, schools }) => {

  const onSubmit = (data) => {
    if (editStudentName) {
      updateStudent(editStudentName, data);
    } else {
      saveStudent(data);
    }
    handleModalClose();
    reset();
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="grade"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="grade-label">Grade</InputLabel>
                    <Select {...field} labelId="grade-label">
                      {[...Array(12).keys()].map((_, index) => (
                        <MenuItem key={index} value={index + 1}>
                          {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="parentName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parent/Guardian Name"
                    fullWidth
                    required
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="parentPhone"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parent/Guardian Phone"
                    fullWidth
                    required
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="parentEmail"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /^\S+@\S+$/i }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parent/Guardian Email"
                    fullWidth
                    required
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="allergies"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Allergies/Medical Conditions"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="enrollmentDates"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Enrollment Date"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Notes"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} style={{ color: "black" }}>
            Cancel
          </Button>
          <Button type="submit" style={{ color: "black" }}>
            {editStudentName ? "Save Changes" : "Add Student"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentDialogForm;
