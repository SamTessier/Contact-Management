import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Student } from "../types";

type StudentDialogFormProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: Student) => void;
  student?: Student;
  schools: any[];
}; 

const createEmptyObject = (keys: string[]): Record<string, string> => {
  return keys.reduce((obj, key) => ({ ...obj, [key]: "" }), {});
};

const StudentDialogForm = ({
  open,
  handleClose,
  onSubmit,
  student,
  schools,
}: StudentDialogFormProps): JSX.Element => {
  const keys = [
    "name",
    "address",
    "phoneNumber",
    "email",
    "school",
    "contactPerson",
    "notes",
  ];
  const defaultValues = student || createEmptyObject(keys);

  const { handleSubmit, control } = useForm({ defaultValues });
  const handleFormSubmit = (data: Student) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: "black" }}>
        {student ? "Edit Student" : "Add New Student"}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
        <Box mb={2}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Full Name" fullWidth required sx={{ minWidth: { xs: '100%', sm: '500px' } }}/>
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Address" fullWidth required sx={{ minWidth: { xs: '100%', sm: '500px' } }}/>
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Phone Number" fullWidth required sx={{ minWidth: { xs: '100%', sm: '500px' } }}/>
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  fullWidth
                  required
                  sx={{ minWidth: { xs: '100%', sm: '500px' } }}
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="school"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="school-label">School</InputLabel>
                  <Select {...field} labelId="school-label" sx={{ minWidth: { xs: '100%', sm: '500px' } }}>
                    {schools.map((school, index) => (
                      <MenuItem key={index} value={school.name}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Notes (Optional)" fullWidth sx={{ minWidth: { xs: '100%', sm: '500px' } }}/>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{student ? "Update" : "Add"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentDialogForm;
