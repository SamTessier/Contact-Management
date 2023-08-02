import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SchoolList from "./SchoolList";
import SchoolDetails from "./SchoolDetails";
import SchoolDialogForm from "./SchoolDialogForm";
import { School } from "../types";
import { useMutation, useQuery, useQueryClient } from "react-query";

const AllSchools = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { data: schools, isLoading } = useQuery(
    ["schools"],
    async () =>
      (await (await fetch("http://localhost:5000/schools")).json()) as School[]
  );

  const { mutate: createSchool } = useMutation(async (school: School) => {
    await fetch("http://localhost:5000/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(school),
    });
    queryClient.invalidateQueries(["schools"]);
  });

  const { mutate: updateSchool } = useMutation(async (school: School) => {
    await fetch(`http://localhost:5000/schools/${school.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(school),
    });
    queryClient.invalidateQueries(["schools"]);
  });

  const { mutate: deleteSchool } = useMutation(async (id: string) => {
    await fetch(`http://localhost:5000/schools/${id}`, {
      method: "DELETE",
    });
    queryClient.invalidateQueries(["schools"]);
  });

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleInfoClick = (school: School) => {
    setSelectedSchool(school);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedSchool(null);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleAddSchool = (school: School) => {
    createSchool(school);
    handleFormClose();
  };

  const handleUpdateSchool = (updatedSchool: School) => {
    updateSchool(updatedSchool);
  };

  const handleDeleteSchool = (id: string) => {
    deleteSchool(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button onClick={handleFormOpen} startIcon={<AddIcon />}>
        Add School
      </Button>
      <SchoolList schools={schools || []} onInfo={handleInfoClick} />
      {selectedSchool && (
        <SchoolDetails
          open={detailsOpen}
          handleClose={handleDetailsClose}
          school={selectedSchool}
          handleDelete={handleDeleteSchool}
          handleUpdateSchool={handleUpdateSchool}
        />
      )}
      <SchoolDialogForm
        open={formOpen}
        handleClose={handleFormClose}
        onSubmit={handleAddSchool}
      />
    </div>
  );
};

export default AllSchools;
