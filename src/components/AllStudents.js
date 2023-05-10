import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const AllStudents = () => {
  const [students] = useState([]);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        {students.length === 0 ? (
          <Typography variant="h5">
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
          component={Link}
          to="/createstudent"
        >
          Add Student
        </Button>
      </Grid>
    </Grid>
  );
}

export default AllStudents;