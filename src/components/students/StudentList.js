import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";


const StudentList = ({ students, handleDetailsOpen }) => {
  return (
    <Box
      border={1}
      borderColor="grey.500"
      borderRadius={2}
      p={3}
      m={2}
      bgcolor="grey.100"
      overflow="auto"
      maxHeight={500}
    >
      {students.length === 0 ? (
        <Typography variant="h5" align="center">
          No students match your search!
        </Typography>
      ) : (
        students.map((student, index) => (
          <Grid
            key={index}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6">{student.name}</Typography>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                onClick={() => handleDetailsOpen(student)}
              >
                <InfoIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))
      )}
    </Box>
  );
};

export default StudentList;
