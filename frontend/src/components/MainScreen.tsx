import { useState, useContext } from "react";
import { IconButton, Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import StaffDetails from "./staff/StaffDetails";
import SchoolDetails from "./schools/SchoolDetails";
import StudentDetails from "./students/StudentDetails";
import { SearchContext } from "./SearchContext";

// Define the types here (type for selected student, staff, school) according to your data structure

// TODO: Replace this with real auth context from the backend
// const AuthContext = React.createContext<any>(null);

// Type for items - replace with your own types
type Item = {
  type: string;
  // Other properties
}

const MainScreen = () => {
  // const { currentUser } = useContext(AuthContext);
  // const [searchTerm] = useContext(SearchContext);
  // const [selectedSchool, setSelectedSchool] = useState<Item | null>(null);
  // const [selectedStaff, setSelectedStaff] = useState<Item | null>(null);
  // const [selectedStudent, setSelectedStudent] = useState<Item | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // const handleDetailsOpen = (item: Item) => {
  //   // item.type === "student"
  //   //   ? setSelectedStudent(item)
  //   //   : item.type === "staff"
  //   //   ? setSelectedStaff(item)
  //     : setSelectedSchool(item);
  //   setDetailsOpen(true);
  // };

  // const handleDetailsClose = () => {
  //   setDetailsOpen(false);
  //   // setSelectedStudent(null);
  //   // setSelectedStaff(null);
  //   setSelectedSchool(null);
  // };

  return (
    <Grid item xs={12}>
      <Box
        border={1}
        borderColor="#EFBD26"
        borderRadius={2}
        p={3}
        m={2}
        bgcolor="grey.100"
      >
        <Grid
          container
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Grid container direction="row" spacing={2} justifyContent="center">
              {/* {currentUser.role !== "staff" && ( */}
                <Grid item>
                  <IconButton color="primary" component={Link} to="/schools">
                    <HomeIcon fontSize="large" />
                  </IconButton>
                  <Typography
                    variant="caption"
                    display="block"
                    textAlign="center"
                  >
                    Schools
                  </Typography>
                </Grid>
              {/* )} */}
              <Grid item>
                <IconButton color="primary" component={Link} to="/staff">
                  <WorkIcon fontSize="large" />
                </IconButton>
                <Typography
                  variant="caption"
                  display="block"
                  textAlign="center"
                >
                  Staff
                </Typography>
              </Grid>
              <Grid item>
                <IconButton color="primary" component={Link} to="/students">
                  <PeopleIcon fontSize="large" />
                </IconButton>
                <Typography
                  variant="caption"
                  display="block"
                  textAlign="center"
                >
                  Students
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* As the data loading will now be handled by the backend, the data mapping section has been removed */}
          {/* {selectedStudent && (
            <StudentDetails
              student={selectedStudent}
              open={detailsOpen}
              handleClose={handleDetailsClose}
            />
          )}
          {selectedStaff && (
            <StaffDetails
              staff={selectedStaff}
              open={detailsOpen}
              handleClose={handleDetailsClose}
            />
          )} */}
          {/* {selectedSchool && (
            <SchoolDetails
              school={selectedSchool}
              open={detailsOpen}
          //     handleClose={handleDetailsClose} */}
          {/* //   />
          // )} */}
        </Grid>
      </Box>
    </Grid>
  );
};

export default MainScreen;
