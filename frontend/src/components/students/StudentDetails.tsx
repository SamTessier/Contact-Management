import { useState, useContext } from "react";
import { Button, Dialog, DialogContent, DialogActions, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import StudentDialogForm from "./StudentDialogForm";
import { Student } from "../types";


type StudentDetailsProps = {
  open: boolean;
  handleClose: () => void;
  Student: Student;
  handleDelete: (id: string) => void;
  handleUpdateStudent: (updatedStudent: Student) => void;
  schools: any;  
};

const StudentDetails = ({
  open,
  handleClose,
  Student,
  handleDelete,
  handleUpdateStudent,
  schools,
}: StudentDetailsProps): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFormSubmit = (data: Student) => {
    handleUpdateStudent({ ...Student, ...data });
    handleClose();
  };

  const handleDeleteClick = () => {
    handleDelete(Student.id);
    handleClose();
  };

  return (
    <>
      {editMode ? (
        <StudentDialogForm
          open={open}
          handleClose={handleClose}
          onSubmit={handleFormSubmit}
          student={Student}
          schools={schools}
        />
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Typography variant="h5">{Student.name}</Typography>
            <Typography variant="subtitle1">{student.address}</Typography>
            <Typography variant="subtitle1">{student.phoneNumber}</Typography>
            <Typography variant="subtitle1">{student.email}</Typography>
            <Typography variant="subtitle1">{student.school}</Typography>
            <Typography variant="subtitle1">
              Contact: {Student.contactPerson}
            </Typography>
            <Typography variant="subtitle1">Notes: {Student.notes}</Typography>
          </DialogContent>
          <DialogActions>
          {currentUser.role !== "Student" && (
            <>
            <Button onClick={handleEditClick} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              startIcon={<DeleteOutlineIcon />}
            >
              Delete
            </Button>
            </>
          )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default StudentDetails;
