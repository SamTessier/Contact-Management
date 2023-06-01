import React from "react";
import { Typography, Grid, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const SchoolItem = ({ school, handleDetailsOpen }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h6">{school.name}</Typography>
      </Grid>
      <Grid item>
        <IconButton
          color="primary"
          onClick={() => handleDetailsOpen(school)}
        >
          <InfoIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default SchoolItem;
