import React from 'react';
import { IconButton, Grid, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';

const MainScreen = () => {
  return (
    <Grid container direction="row" spacing={2} justifyContent="center">
      <Grid item>
        <Tooltip title="Schools">
          <IconButton color="primary" component={Link} to="/schools">
            <HomeIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Typography variant="caption" display="block" textAlign="center">Schools</Typography>
      </Grid>
      <Grid item>
        <Tooltip title="Staff">
          <IconButton color="primary" component={Link} to="/staff">
            <WorkIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Typography variant="caption" display="block" textAlign="center">Staff</Typography>
      </Grid>
      <Grid item>
        <Tooltip title="Students">
          <IconButton color="primary" component={Link} to="/students">
            <PeopleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Typography variant="caption" display="block" textAlign="center">Students</Typography>
      </Grid>
    </Grid>
  );
}

export default MainScreen;
