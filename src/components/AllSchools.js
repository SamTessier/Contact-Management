import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

function AllSchools() {
  const [schools] = useState([]);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        {schools.length === 0 ? (
          <Typography variant="h5">
            There are no schools yet! Add a school to begin.
          </Typography>
        ) : (
          // Display the list of schools here
          <></>
        )}
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ minWidth: 200 }}
          component={Link}
          to="/createschool"
        >
          Add School
        </Button>
      </Grid>
    </Grid>
  );
}

export default AllSchools;
