import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const SchoolList = ({ schools, onInfo }) => {

  return schools.map((school, index) => (
    <Grid
      key={index}
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h6">{school.name}</Typography>
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={() => onInfo(school)}>
          <InfoIcon />
        </IconButton>
      </Grid>
    </Grid>
  ));
};

export default SchoolList;
