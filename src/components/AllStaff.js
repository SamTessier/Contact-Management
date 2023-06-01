import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import {
  getStaff,
  getSchools,
  saveStaff,
  updateStaff,
} from "../localStorageDB";
import StaffList from "./StaffList";
import StaffDialogForm from "./StaffDialogForm";
import StaffSearch from "./StaffSearch";

const AllStaff = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const [staff, setStaff] = useState([]);
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStaffName, setEditStaffName] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setStaff(getStaff());
    setSchools(getSchools());
  }, []);

  let filteredStaff = staff;
  if (searchTerm !== "") {
    filteredStaff = staff.filter((staffMember) =>
      staffMember.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const onSubmit = (data) => {
    if (editStaffName) {
      const updatedStaff = { ...data, name: editStaffName };
      updateStaff(updatedStaff);
    } else {
      const newStaff = { ...data };
      saveStaff(newStaff);
    }
    setStaff(getStaff());
    setModalOpen(false);
    setEditStaffName(null);
    reset();
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setEditStaffName(null);
    reset();
  };

  const handleEditOpen = (staffName) => {
    setEditStaffName(staffName);
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
      <Grid item xs={12}>
      <StaffSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} showSearch={showSearch} onSearchClick={() => setShowSearch(!showSearch)} />
      </Grid>
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
        <StaffList staff={filteredStaff} onEdit={handleEditOpen} />
      </Box>

      <Grid item container justifyContent="center">
        <CustomButton variant="contained" onClick={handleModalOpen}>
          <PersonAddIcon sx={{ color: "black" }} />
        </CustomButton>
      </Grid>

      <StaffDialogForm
        open={modalOpen}
        handleClose={handleModalClose}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        errors={errors}
        schools={schools}
        staffName={editStaffName}
      />
    </Grid>
  );
};

export default AllStaff;
