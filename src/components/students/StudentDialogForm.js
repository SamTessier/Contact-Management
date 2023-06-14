import React from "react";
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
  Button,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const StudentDialogForm = ({ modalOpen, handleModalClose, schools, student, onSubmit }) => {
  const defaultValues = student || {
    name: "",
    school: "",
    grade: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    allergies: "",
    enrollmentDates: "",
    notes: "",
  };

  const { handleSubmit, control } = useForm({ defaultValues });



  return (
    <Dialog open={modalOpen} onClose={handleModalClose}>
      <DialogTitle style={{ color: "black" }}>
        {student ? "Edit Student" : "Add New Student"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="school"
                control={control}
                defaultValue={defaultValues.school || ""}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="grade"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="grade-label">Grade</InputLabel>
                    <Select {...field} labelId="grade-label">
                      {[...Array(12).keys()].map((_, index) => (
                        <MenuItem key={index} value={index + 1}>
                          {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="parentName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parent/Guardian Name"
                    fullWidth
                    required
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="parentPhone"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parent/Guardian Phone"
                    fullWidth
                    required
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="parentEmail"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /^\S+@\S+$/i }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parent/Guardian Email"
                    fullWidth
                    required
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="allergies"
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
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="enrollmentDates"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Enrollment Date"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Notes"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </Grid>
          </Grid>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button type="submit" style={{ color: "black" }}>
            {student ? "Save Changes" : "Add Student"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentDialogForm;
