import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  saveStaff,
  deleteStaff,
  getStaff,
  updateStaff,
  getSchools,
} from "../../localStorageDB";
import StaffList from "./StaffList";
import StaffDialogForm from "./StaffDialogForm";
import StaffDetails from "./StaffDetails";
import { SearchContext } from "../SearchContext";

const AllStaff = () => {
  const [staff, setStaff] = useState([]);
  const [viewStaff, setViewStaff] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [searchTerm] = useContext(SearchContext);
  const [filteredStaff, setFilteredStaff] = useState([]);

const companyId = localStorage.getItem("companyId");  

  useEffect(() => {
    if (companyId) {
    setStaff(getStaff(companyId));
    setSchools(getSchools(companyId));
    }
  }, [companyId]);

  useEffect(() => {
    let filtered = staff;
    if (searchTerm !== "") {
      filtered = staff.filter((staffMember) =>
        staffMember.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredStaff(filtered);
  }, [staff, searchTerm]);

  const onSubmit = (data) => {
    if (editStaff) {
      updateStaff({ ...editStaff, ...data }, companyId);
    } else {
      saveStaff(data, companyId);
    }
    if (companyId) {
    setStaff(getStaff(companyId));
    }
    setModalOpen(false);
    setEditStaff(null);
  };

  const handleDelete = (staffId) => {
    deleteStaff(staffId, companyId);
    if (companyId) {
    setStaff(getStaff(companyId));
    }
  };

  const handleModalOpen = () => setModalOpen(true);

  const handleModalClose = () => {
    setModalOpen(false);
    setEditStaff(null);
  };

  const handleInfoOpen = (staff) => {
    setViewStaff(staff);
    setInfoModalOpen(true);
  };

  const handleInfoClose = () => {
    setInfoModalOpen(false);
  };

  const handleEditOpen = (staff) => {
    setEditStaff(staff);
    handleModalOpen();
  };

  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#EFBD26",
    "&:hover": {
      backgroundColor: "#EFBD26",
    },
    padding: theme.spacing(1),
  }));

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Box
        border={1}
        borderColor="grey.500"
        borderRadius={2}
        p={3}
        m={2}
        bgcolor="grey.100"
        overflow="auto"
        maxHeight={500}
      >
        <StaffList
          staff={filteredStaff}
          onEdit={handleEditOpen}
          onDelete={handleDelete}
          onInfo={handleInfoOpen}
        />
      </Box>
      <Grid item container justifyContent="center">
        <CustomButton variant="contained" onClick={handleModalOpen}>
          <PersonAddIcon sx={{ color: "black" }} />
        </CustomButton>
      </Grid>
      <StaffDialogForm
        open={modalOpen}
        handleClose={handleModalClose}
        onSubmit={onSubmit}
        schools={schools}
        staff={editStaff}
      />
      <StaffDetails
        open={infoModalOpen}
        handleClose={handleInfoClose}
        staff={viewStaff}
        onDelete={handleDelete}
        onEdit={handleEditOpen}
      />
    </Grid>
  );
};

export default AllStaff;
