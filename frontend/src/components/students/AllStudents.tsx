import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import StudentDialogForm from "./StudentDialogForm";
import { Student } from "../types";
import { useMutation, useQuery, useQueryClient } from "react-query";

const AllStudents = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { data: Students, isLoading } = useQuery(
    ["Students"],
    async () =>
      (await (await fetch("http://${import.meta.env.VITE_API_URL}api/students")).json()) as Student[]
  );

  const { mutate: createStudent } = useMutation(async (student: Student) => {
    await fetch("http://${import.meta.env.VITE_API_URL}api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    queryClient.invalidateQueries(["Students"]);
  });

  const { mutate: updateStudent } = useMutation(async (student: Student) => {
    await fetch(`http://${import.meta.env.VITE_API_URL}api/students/${student.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    queryClient.invalidateQueries(["Students"]);
  });

  const { mutate: deleteStudent } = useMutation(async (id: string) => {
    await fetch(`http://${import.meta.env.VITE_API_URL}api/students/${id}`, {
      method: "DELETE",
    });
    queryClient.invalidateQueries(["Students"]);
  });

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleInfoClick = (student: Student) => {
    setSelectedStudent(student);
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

  const handleAddStudent = (student: Student) => {
    createStudent(student);
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

        <Button onClick={handleFormOpen} startIcon={<AddIcon />}>
          Add New Student
        </Button>
 
      <StudentList students={Students || []} onInfo={handleInfoClick} />
      {selectedStudent && (
        <StudentDetails
                  open={detailsOpen}
                  handleClose={handleDetailsClose}
                  Student={selectedStudent}
                  handleDelete={handleDeleteStudent}
                  handleUpdateStudent={handleUpdateStudent} schools={undefined}        />
      )}
      <StudentDialogForm
              open={formOpen}
              handleClose={handleFormClose}
              onSubmit={handleAddStudent} schools={[]}      />
   </>
  );
};

export default AllStudents;
