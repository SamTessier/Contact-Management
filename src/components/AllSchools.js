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
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { saveSchool, getSchools } from "../localStorageDB";
import SchoolDetails from "./SchoolDetails";

const AllSchools = () => {
  const { handleSubmit, control, reset } = useForm();
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    setSchools(getSchools());
  }, []);

  const onSubmit = (data) => {
    const newSchool = { ...data };
    saveSchool(newSchool);
    setSchools(getSchools());
    setModalOpen(false);
    reset();
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    reset();
  };
  const handleDetailsOpen = (school) => {
    setSelectedSchool(school);
    setDetailsOpen(true);
  };
  const handleDetailsClose = () => setDetailsOpen(false);


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
        {schools.length === 0 ? (
          <Typography variant="h5" align="center">
            No schools found!
          </Typography>
        ) : (
          schools.map((school, index) => (
            <Grid
              key={index}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h6">{school.name}</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  onClick={() => handleDetailsOpen(school)}
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
          <AddCircleOutlineIcon sx={{ color: "black" }} />
        </CustomButton>
      </Grid>

      <Dialog open={modalOpen} onClose={handleModalClose}>
    <DialogTitle>Add New School</DialogTitle>
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
              label="School Name"
              fullWidth
              required
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        <Controller
          name="phone"
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
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Mailing Address"
              fullWidth
              required
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>Cancel</Button>
        <Button type="submit">Add School</Button>
      </DialogActions>
    </form>
  </Dialog>
      <SchoolDetails
        school={selectedSchool}
        open={detailsOpen}
        handleClose={handleDetailsClose}
      />
    </Grid>
  );
};

export default AllSchools;
