import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  saveStaff,
  getStaff,
  getSchools,
  deleteStaff,
  updateStaff,
} from "../localStorageDB";
import StaffDetails from "./StaffDetails";


const AllStaff = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const [staff, setStaff] = useState([]);
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editStaffName, setEditStaffName] = useState(null);

  useEffect(() => {
    setStaff(getStaff());
    setSchools(getSchools());
  }, []);

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
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setEditStaffName(null);
  };
  const handleDetailsOpen = (staff) => {
    setSelectedStaff(staff);
    setDetailsOpen(true);
  };
  const handleDetailsClose = () => setDetailsOpen(false);
  const handleDelete = (staffName) => {
    deleteStaff(staffName);
    setStaff(getStaff());
  };

  const handleEditOpen = (staffName) => {
    setEditStaffName(staffName);
    handleModalOpen();
  };
  

  useEffect(() => {
    if (editStaffName) {
      const staffToEdit = staff.find(
        (staff) => staff.name === editStaffName
      );
      reset(staffToEdit);
    } else {
      reset();
    }
  }, [editStaffName]);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        {staff.length === 0 ? (
          <Typography variant="h5" align="center">
            There are no staff members yet! Add a staff member to begin.
          </Typography>
        ) : (
          staff.map((staff, index) => (
            <Grid key={index} container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  {staff.name}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleDetailsOpen(staff)}>
                  <InfoIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))
        )}
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleModalOpen}
        >
          Add Staff Member
        </Button>
      </Grid>
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <DialogContent>
            <TextField
              {...register("name", { required: "Name is required" })}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              label="Name"
              fullWidth
              margin="dense"
            />
            </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
      <StaffDetails
        staff={selectedStaff}
        open={detailsOpen}
        handleClose={handleDetailsClose}
        handleEdit={handleEditOpen}
        handleDelete={handleDelete}
      />
    </Grid>
  );
};

export default AllStaff;