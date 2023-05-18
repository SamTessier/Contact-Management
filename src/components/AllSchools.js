import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { TextField, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { saveSchool, getSchools } from '../localStorageDB';
import SchoolDetails from './SchoolDetails';

const AllSchools = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    setSchools(getSchools());
  }, []);

  const onSubmit = (data) => {
    saveSchool(data);
    setSchools(prevSchools => [...prevSchools, data]);
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

      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add School</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Form Fields Here */}
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
}

export default AllSchools;
