import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const StudentList = ({ students, onInfo }) => {

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
        <IconButton color="primary" onClick={() => onInfo(student)}>
          <InfoIcon />
        </IconButton>
      </Grid>
    </Grid>
  ));
};

export default StudentList;
