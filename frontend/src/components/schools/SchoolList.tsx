import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { School } from "./types";

type SchoolListProps = {
  schools: School[];
  onInfo: (school: School) => void;
};

const SchoolList = ({ schools, onInfo }: SchoolListProps): JSX.Element => {
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
