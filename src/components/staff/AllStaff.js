import React, { useState, useEffect, useContext } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AuthContext } from "../../AuthContext";
import {
  getStaff,
  saveStaff,
  deleteStaff,
  updateStaff,
  getSchools,
} from "../../localStorageDB";
import StaffDialogForm from "./StaffDialogForm";
import StaffList from "./StaffList";
import StaffDetails from "./StaffDetails";
import { SearchContext } from "../SearchContext";

const AllStaff = () => {
  const { currentUser } = useContext(AuthContext);
  const [staffMembers, setStaffMembers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm] = useContext(SearchContext);
  const [filteredStaffMembers, setFilteredStaff] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    let allStaff = getStaff(companyId);
    if (currentUser.role === "staff") {
      allStaff = allStaff.filter(staff => staff.school === currentUser.school);
    }
    setStaffMembers(allStaff);
    getSchools(companyId);
  }, [companyId, currentUser]);

  useEffect(() => {
    let filtered = staffMembers;
    if (searchTerm !== "") {
      filtered = staffMembers.filter((staff) =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredStaff(filtered);
  }, [staffMembers, searchTerm]);

  const handleDialogOpen = () => {
    setSelectedStaff(null);
    getSchools(companyId);
    setDialogMode("create");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedStaff(null);
  };

  const handleAddStaff = (staff) => {
    saveStaff(staff, companyId);
    setStaffMembers(getStaff(companyId));
    setDialogOpen(false);
  };

  const handleDeleteStaff = (staffId) => {
    deleteStaff(staffId, companyId);
    setStaffMembers(getStaff(companyId));
  };

  const handleUpdateStaff = (updatedStaff) => {
    console.log("Updated staff: ", updatedStaff);
    updateStaff(updatedStaff, companyId);
    setStaffMembers(getStaff(companyId));
    setDialogOpen(false);
  };

  const handleStaffSelect = (staff) => {
    console.log("Selected staff: ", staff);
    setSelectedStaff(staff);
    setDialogMode("edit");
    getSchools(companyId);
  };

  const handleDetailsOpen = (staff) => {
    setSelectedStaff(staff);
    getSchools(companyId);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedStaff(null);
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
        {filteredStaffMembers.length === 0 ? (
          <Typography variant="h5" align="center">
            No Staff found!
          </Typography>
        ) : (
          <StaffList
            staffMembers={filteredStaffMembers}
            onStaffSelect={handleStaffSelect}
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
      <StaffDialogForm
        open={dialogOpen}
        handleClose={handleDialogClose}
        onSubmit={dialogMode === "create" ? handleAddStaff : handleUpdateStaff}
        schools={getSchools(companyId)}
      />
      {selectedStaff && (
        <StaffDetails
          open={detailsOpen}
          handleClose={handleDetailsClose}
          staff={selectedStaff}
          handleDelete={handleDeleteStaff}
          handleUpdateStaff={handleUpdateStaff}
          schools={getSchools(companyId)}
        />
      )}
    </Grid>
  );
};

export default AllStaff;
