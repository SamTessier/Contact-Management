import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { saveStudent, getSchools } from '../localStorageDB';

const CreateStudent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    setSchools(getSchools());
  }, []);

  const onSubmit = (data) => {
    saveStudent(data);
    alert('Student saved!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name', { required: 'Name is required.' })}
        label="Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />



      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Student
      </Button>
    </form>
  );
}

export default CreateStudent;
