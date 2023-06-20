import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";

const StudentList = ({ students, handleDetailsOpen }) => {
  console.log(students);
  if (!Array.isArray(students) || students.length === 0) {
    return (
      <Typography variant="h5" align="center">
        No students members found!
      </Typography>
    );
  }

  return students.map((student, index) => (
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
        <IconButton color="primary" onClick={() => handleDetailsOpen(student)}>
          <InfoIcon />
        </IconButton>
      </Grid>
    </Grid>
  ));
};

export default StudentList;
