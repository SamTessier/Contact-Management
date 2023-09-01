import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import StudentDialogForm from "./StudentDialogForm";
import { Student } from "../types";
import { useMutation, useQuery, useQueryClient } from "react-query";

const AllStudent = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { data: Students, isLoading } = useQuery(
    ["Students"],
    async () =>
      (await (await fetch("http://localhost:5000/Students")).json()) as Student[]
  );

  const { mutate: createStudent } = useMutation(async (Student: Student) => {
    await fetch("http://localhost:5000/Students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Student),
    });
    queryClient.invalidateQueries(["Students"]);
  });

  const { mutate: updateStudent } = useMutation(async (Student: Student) => {
    await fetch(`http://localhost:5000/Students/${Student.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Student),
    });
    queryClient.invalidateQueries(["Students"]);
  });

  const { mutate: deleteStudent } = useMutation(async (id: string) => {
    await fetch(`http://localhost:5000/Students/${id}`, {
      method: "DELETE",
    });
    queryClient.invalidateQueries(["Students"]);
  });

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleInfoClick = (Student: Student) => {
    setSelectedStudent(Student);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedStudent(null);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleAddStudent = (Student: Student) => {
    createStudent(Student);
    handleFormClose();
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    updateStudent(updatedStudent);
  };

  const handleDeleteStudent = (id: string) => {
    deleteStudent(id);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
   <>
      {currentUser.role !== "Student" && (
        <Button onClick={handleFormOpen} startIcon={<AddIcon />}>
          Add New Student
        </Button>
      )}
      <StudentList Students={Students || []} onInfo={handleInfoClick} />
      {selectedStudent && (
        <StudentDetails
          open={detailsOpen}
          handleClose={handleDetailsClose}
          Student={selectedStudent}
          handleDelete={handleDeleteStudent}
          handleUpdateStudent={handleUpdateStudent}
        />
      )}
      <StudentDialogForm
        open={formOpen}
        handleClose={handleFormClose}
        onSubmit={handleAddStudent}
      />
   </>
  );
};

export default AllStudent;
