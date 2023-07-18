import React, { useState, useEffect, useContext } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  getSchools,
  saveSchool,
  deleteSchool,
  updateSchool,
} from "../../localStorageDB";
import SchoolDialogForm from "./SchoolDialogForm";
import SchoolList from "./SchoolList";
import SchoolDetails from "./SchoolDetails"; // Import the SchoolDetails component
import { SearchContext } from "../SearchContext";

const AllSchools = () => {
  const [schools, setSchools] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [searchTerm] = useContext(SearchContext);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
      setSchools(getSchools(companyId));
  }, [companyId]);

  useEffect(() => {
    let filtered = schools;
    if (searchTerm !== "") {
      filtered = schools.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredSchools(filtered);
  }, [schools, searchTerm]);

  const handleDialogOpen = () => {
    setSelectedSchool(null);
    setDialogMode("create");
    setDialogOpen(true);
  };

  const handleDialogClose = () => { 
    setDialogOpen(false);
  setSelectedSchool(null);
  };  

  const handleAddSchool = (school) => {
    saveSchool(school, companyId);
    setSchools(getSchools(companyId));
    setDialogOpen(false);
  };

  const handleDeleteSchool = (schoolId) => {
    deleteSchool(schoolId, companyId);
    setSchools(getSchools(companyId));
  };

  const handleUpdateSchool = (updatedSchool) => {
    console.log("Updated school: ", updatedSchool);
    updateSchool(updatedSchool, companyId);
    setSchools(getSchools(companyId));
    setDialogOpen(false);
  };

  const handleSchoolSelect = (school) => {
    console.log("Selected school: ", school);
    setSelectedSchool(school);
    setDialogMode("edit");
  };

  const handleDetailsOpen = (school) => {
    setSelectedSchool(school);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedSchool(null);
  };

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Box
        border={1}
        borderColor="#EFBD26"
        borderRadius={2}
        p={3}
        m={2}
        bgcolor="grey.100"
        overflow="auto"
        maxHeight={500}
      >
        {filteredSchools.length === 0 ? (
          <Typography variant="h5" align="center">
            No schools found
          </Typography>
        ) : (
          <SchoolList
            schools={filteredSchools}
            onSchoolSelect={handleSchoolSelect}
            onInfo={handleDetailsOpen}
          />
        )}
      </Box>

      <Grid item container justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          sx={{
            bgcolor: "#EFBD26",
            "&:hover": { bgcolor: "#EFBD26" },
            padding: 1,
          }}
        >
          <AddCircleOutlineIcon sx={{ color: "black" }} />
        </Button>
      </Grid>

      <SchoolDialogForm
        open={dialogOpen}
        handleClose={handleDialogClose}
        onSubmit={
          dialogMode === "create" ? handleAddSchool : handleUpdateSchool
        }
        school={selectedSchool}
      />

      {selectedSchool && (
        <SchoolDetails
          open={detailsOpen}
          handleClose={handleDetailsClose}
          school={selectedSchool}
          handleDelete={handleDeleteSchool}
          handleUpdateSchool={handleUpdateSchool}
        />
      )}
    </Grid>
  );
};

export default AllSchools;
