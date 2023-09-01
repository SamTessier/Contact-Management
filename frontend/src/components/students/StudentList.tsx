import { Grid, Typography, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Student } from "../types";

type StudentListProps = {
  students: Student[];
  onInfo: (student: Student) => void;
};

const StudentList = ({ students, onInfo }: StudentListProps): JSX.Element => {
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
