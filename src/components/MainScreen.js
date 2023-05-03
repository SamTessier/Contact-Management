import React from 'react';
import { Button, Grid } from '@mui/material';

function MainScreen({ onNavigate }) {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ width: 200 }}
          onClick={() => onNavigate('allschools')}
        >
          Schools
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ width: 200 }}
          onClick={() => onNavigate('staff')}
        >
          Staff
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ width: 200 }}
          onClick={() => onNavigate('students')}
        >
          Students
        </Button>
      </Grid>
    </Grid>
  );
}

export default MainScreen;
