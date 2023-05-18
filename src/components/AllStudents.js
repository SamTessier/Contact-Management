import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { saveStudent, getSchools } from '../localStorageDB';

const AllStudents = () => {
  const [students] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [schools, setSchools] = useState([]);

  useState(() => {
    setSchools(getSchools());
  }, []);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const onSubmit = (data) => {
    saveStudent(data);
    alert('Student saved!');
    handleModalClose();
  };

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        {students.length === 0 ? (
          <Typography variant="h5" align="center">
            There are no students yet! Add a student to begin.
          </Typography>
        ) : (
          <></>
        )}
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ minWidth: 200 }}
          onClick={handleModalOpen}
        >
          Add Student
        </Button>
      </Grid>

      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="md" fullWidth>
        <DialogTitle>Add a New Student</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('name', { required: 'Name is required.' })}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>School</InputLabel>
                  <Select
                    {...register('school', { required: 'School is required.' })}
                    error={!!errors.school}
                  >
                    {schools.map((school) => (
                      <MenuItem key={school.id} value={school.id}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Grade</InputLabel>
                  <Select
                    {...register('grade', { required: 'Grade is required.' })}
                    error={!!errors.grade}
                  >
                    {[...Array(12).keys()].map((grade) => (
                      <MenuItem key={grade + 1} value={grade + 1}>
                        {grade + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('parentName', { required: 'Parent Name is required.' })}
                  label="Parent's Name"
                  fullWidth
                  error={!!errors.parentName}
                  helperText={errors.parentName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('parentEmail', { required: 'Parent Email is required.' })}
                  label="Parent's Email"
                  fullWidth
                  error={!!errors.parentEmail}
                  helperText={errors.parentEmail?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('notes')}
                  label="Notes, requests, allergies, etc."
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Save Student
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default AllStudents;
