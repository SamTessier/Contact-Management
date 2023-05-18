import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { TextField, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { saveSchool, getSchools } from "../localStorageDB";
import SchoolDetails from "./SchoolDetails";

const AllSchools = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleDetailsOpen = (school) => {
    setSelectedSchool(school);
    setDetailsOpen(true);
  };
  const handleDetailsClose = () => setDetailsOpen(false);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        {schools.length === 0 ? (
          <Typography variant="h5" align="center">
            There are no schools yet! Add a school to begin.
          </Typography>
        ) : (
          schools.map((school, index) => (
            <Grid key={index} item>
              <Typography variant="h6">
                {school.name}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: 2 }}
                  onClick={() => handleDetailsOpen(school)}
                >
                  View Details
                </Button>
              </Typography>
            </Grid>
          ))
        )}
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ minWidth: 200 }}
          onClick={handleModalOpen}
        >
          Add School
        </Button>
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
                <TextField
                  {...register("name", { required: "Name is required." })}
                  label="School Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("street", { required: "Street is required." })}
                  label="Street Address"
                  fullWidth
                  error={!!errors.street}
                  helperText={errors.street?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("city", { required: "City is required." })}
                  label="City"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("state", { required: "State is required." })}
                  label="State"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("zip", { required: "ZIP Code is required." })}
                  label="ZIP Code"
                  fullWidth
                  error={!!errors.zip}
                  helperText={errors.zip?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("phone", {
                    required: "Phone number is required.",
                  })}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
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
