import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';

function SchoolProfile() {
  const [editMode, setEditMode] = useState(true);
  const [schoolInfo, setSchoolInfo] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    contactPerson: '',
    notes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSchoolInfo({ ...schoolInfo, [name]: value });
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        School Profile
      </Typography>
      <Grid container direction="column" spacing={2} alignItems="center">
        {Object.keys(schoolInfo).map((key) => (
          <Grid item key={key}>
            {editMode ? (
              <TextField
                label={key}
                name={key}
                value={schoolInfo[key]}
                onChange={handleChange}
              />
            ) : (
              <Typography>
                {key}: {schoolInfo[key]}
              </Typography>
            )}
          </Grid>
        ))}
        <Grid item>
          {editMode ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default SchoolProfile;
