import React, { useState, useContext } from "react";
import { IconButton, Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import StaffDetails from "./staff/StaffDetails";
import SchoolDetails from "./schools/SchoolDetails";
import StudentDetails from "./students/StudentDetails";
import { getStudents, getStaff, getSchools } from "../localStorageDB";
import { SearchContext } from "./SearchContext";
import { AuthContext } from "../AuthContext";

const MainScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchTerm] = useContext(SearchContext);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const companyId = localStorage.getItem("companyId");
  let data =
    searchTerm !== ""
      ? [
          ...getStudents(companyId),
          ...getStaff(companyId),
          ...getSchools(companyId),
        ]
      : [];
  data = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (currentUser.role !== "staff" || item.school === currentUser.school)
  );

  const handleDetailsOpen = (item) => {
    item.type === "student"
      ? setSelectedStudent(item)
      : item.type === "staff"
      ? setSelectedStaff(item)
      : setSelectedSchool(item);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedStudent(null);
    setSelectedStaff(null);
    setSelectedSchool(null);
  };

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
              {currentUser.role !== "staff" && (
                <>
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
                </>
              )}
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
          <Grid item>
            <Grid container direction="column" spacing={2} alignItems="center">
              {searchTerm &&
                data.map((item, index) => (
                  <Grid
                    key={index}
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="body1">{item.name}</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={() => handleDetailsOpen(item)}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
          {selectedStudent && (
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
          )}
          {selectedSchool && (
            <SchoolDetails
              school={selectedSchool}
              open={handleDetailsOpen}
              handleClose={handleDetailsClose}
            />
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

export default MainScreen;
