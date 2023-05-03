import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

function AllStaff() {
  const [staff] = useState([]);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        {staff.length === 0 ? (
          <Typography variant="h5">
            There are no staff members yet! Add a staff member to begin.
          </Typography>
        ) : (
          // Display the list of staff members here
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
          to="/createstaff"
        >
          Add Staff
        </Button>
      </Grid>
    </Grid>
  );
}

export default AllStaff;
