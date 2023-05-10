import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { saveStaff } from '../localStorageDB';

const CreateStaff = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    saveStaff(data);
    alert('Staff member saved!');
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name', { required: 'Name is required.' })}
        label="Name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <FormControl fullWidth error={!!errors.dayOfWeek}>
        <InputLabel id="dayOfWeek-label">Day of Week</InputLabel>
        <Select
          labelId="dayOfWeek-label"
          {...register('dayOfWeek', { required: 'Day of Week is required.' })}
          fullWidth
        >
          {daysOfWeek.map(day => (
            <MenuItem key={day} value={day}>{day}</MenuItem>
          ))}
        </Select>
        {errors.dayOfWeek && <span>{errors.dayOfWeek.message}</span>}
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Staff
      </Button>
    </form>
  );
}

export default CreateStaff;
