import React, { useState } from 'react';
import { IconButton, Grid, Tooltip, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import StudentDetails from './StudentDetails';
import { getStudents, getStaff } from "../localStorageDB"; 

const MainScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  let data = searchTerm !== "" ? [...getStudents(), ...getStaff()] : [];
  data = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailsOpen = (student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => setDetailsOpen(false);

  return (
    <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
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
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <TextField 
            variant="outlined" 
            label="Search" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
            style={{width: '80%'}}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={2} alignItems="center">
          {searchTerm && data.map((item, index) => (
            <Grid key={index} container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="body1">{item.name}</Typography>
              </Grid>
              <Grid item>
                <IconButton color="primary" onClick={() => handleDetailsOpen(item)}>
                  <InfoIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <StudentDetails
        student={selectedStudent}
        open={detailsOpen}
        handleClose={handleDetailsClose}
        handleDelete={()=>{}}
        handleEdit={()=>{}}
      />
    </Grid>
  );
}

export default MainScreen;
