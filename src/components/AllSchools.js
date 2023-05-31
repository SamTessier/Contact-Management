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
    saveSchool(data);
    setSchools((prevSchools) => [...prevSchools, data]);
    setModalOpen(false);
    reset();
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
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

      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add School</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name is required." }}
                  render={({ field }) => (
                    <TextField {...field} label="School Name" fullWidth />
                  )}
                />
              </Grid>
              {/* ...repeat for each field... */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ color: "black" }}
                  fullWidth
                >
                  Save School
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
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
