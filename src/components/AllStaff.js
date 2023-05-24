import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
  IconButton
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
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
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setStaff(getStaff());
    setSchools(getSchools());
  }, []);

  let filteredStaff = staff;
  if (searchTerm !== "") {
    filteredStaff = staff.filter(staffMember =>
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
      <Grid item xs={12}>
        {showSearch ? (
          <TextField 
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => setShowSearch(false)}
            fullWidth
            autoFocus
          />
        ) : (
          <IconButton onClick={() => setShowSearch(true)}>
            <SearchIcon />
          </IconButton>
        )}
      </Grid>
      <Grid item>
        {filteredStaff.length === 0 ? (
          <Typography variant="h5" align="center">
            No staff members found!
          </Typography>
        ) : (
          filteredStaff.map((staff, index) => (
            <Box key={index} mb={2}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">{staff.name}</Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleDetailsOpen(staff)}>
                    <InfoIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
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
            <TextField
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message}
              label="Phone Number"
              fullWidth
              margin="dense"
            />
            <TextField
              {...register("email", { required: "Email is required" })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              label="Email"
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="school-label">School</InputLabel>
              <Controller
                name="school"
                control={control}
                defaultValue=""
                rules={{ required: "School is required" }}
                render={({ field }) => (
                  <Select {...field} labelId="school-label">
                    {schools.map((school, index) => (
                      <MenuItem key={index} value={school.name}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            
            <TextField
              {...register("notes")}
              label="Notes"
              multiline
              rows={4}
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