import { Grid, Typography, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Staff } from "../types";

type StaffListProps = {
  staffMembers: Staff[];
  onInfo: (staff: Staff) => void;
};

const StaffList = ({ staffMembers, onInfo }: StaffListProps): JSX.Element => {
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
