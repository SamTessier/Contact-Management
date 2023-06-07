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
  const [detailsOpen, setDetailsOpen] = useState(false); // State for controlling school details card

  useEffect(() => {
    setSchools(getSchools());
  }, []);

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

  const handleDialogClose = () => setDialogOpen(false);

  const handleAddSchool = (school) => {
    saveSchool(school);
    setSchools((prevSchools) => [...prevSchools, school]);
    setDialogOpen(false);
  };

  const handleDeleteSchool = (schoolId) => {
    deleteSchool(schoolId);
    setSchools(getSchools());
  };

  const handleUpdateSchool = (updatedSchool) => {
    updateSchool(updatedSchool);
    setSchools(getSchools());
    setDialogOpen(false);
  };

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleDetailsOpen = (school) => {
    setSelectedSchool(school);
    setDetailsOpen(true)
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
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
            No schools found!
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
          handleUpdate={handleUpdateSchool}
        />
      )}
    </Grid>
  );
};

export default AllSchools;
