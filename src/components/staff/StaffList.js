import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const StaffList = ({ staffMembers, onInfo }) => {

  return staffMembers.map((staff, index) => (
    <Grid
      key={index}
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h6">{staff.name}</Typography>
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={() => onInfo(staff)}>
          <InfoIcon />
        </IconButton>
      </Grid>
    </Grid>
  ));
};

export default StaffList;
