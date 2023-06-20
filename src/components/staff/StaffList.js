import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const StaffList = ({ staff, onInfo }) => {
  console.log(staff);
  if (!Array.isArray(StaffList) || staff.length === 0) {
    return (
      <Typography variant="h5" align="center">
        No staff members found!
      </Typography>
    );
  }

  return staff.map((staffMember, index) => (
    <Grid
      key={index}
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h6">{staffMember.name}</Typography>
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={() => onInfo(staffMember)}>
          <InfoIcon />
        </IconButton>
      </Grid>
    </Grid>
  ));
};

export default StaffList;
