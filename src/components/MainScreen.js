import React from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function MainScreen() {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Button variant="contained" color="primary" fullWidth sx={{ width: 200 }} component={Link} to="/schools">
          Schools
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" fullWidth sx={{ width: 200 }} component={Link} to="/staff">
          Staff
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" fullWidth sx={{ width: 200 }}>
          Students
        </Button>
      </Grid>
    </Grid>
  );
}

export default MainScreen;
