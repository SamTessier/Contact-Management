import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
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
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
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
      const staffToEdit = staff.find((staff) => staff.name === editStaffName);
      reset(staffToEdit);
    } else {
      reset();
    }
  }, [editStaffName]);

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
        {filteredStaff.length === 0 ? (
          <Typography variant="h5" align="center">
            No staff members found!
          </Typography>
        ) : (
          filteredStaff.map((staff, index) => (
            <Grid
              key={index}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h6">{staff.name}</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  onClick={() => handleDetailsOpen(staff)}
                >
                  <InfoIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))
        )}
      </Box>

      <Grid item container justifyContent="center">
        <CustomButton variant="contained" onClick={handleModalOpen}>
          <PersonAddIcon sx={{ color: "black" }} />
        </CustomButton>
      </Grid>

      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: "black" }}>
          {editStaffName ? "Edit Staff" : "Add New Staff"}
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <Controller
              name="staffPhone"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  required
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />

            <Controller
              name="school"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="school-label">School</InputLabel>
                  <Select {...field} labelId="school-label">
                    {schools.map((school, index) => (
                      <MenuItem key={index} value={school.name}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="notes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Allergies/Medical Conditions"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" style={{ color: "black" }}>
              {editStaffName ? "Save Changes" : "Add Staff"}
            </Button>
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
