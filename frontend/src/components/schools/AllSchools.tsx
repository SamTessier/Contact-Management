import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SchoolList from "./SchoolList";
import SchoolDetails from "./SchoolDetails";
import SchoolDialogForm from "./SchoolDialogForm";
import { School } from "../types";

const AllSchools = (): JSX.Element => {
  const [schools, setSchools] = useState<School[]>([]);
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
    setSchools((prevSchools) => [...prevSchools, school]);
    handleFormClose();
  };

  const handleUpdateSchool = (updatedSchool: School) => {
    setSchools((prevSchools) =>
      prevSchools.map((school) =>
        school.id === updatedSchool.id ? updatedSchool : school
      )
    );
  };

  const handleDeleteSchool = (id: string) => {
    setSchools((prevSchools) => prevSchools.filter((school) => school.id !== id));
  };

  return (
    <div>
      <Button onClick={handleFormOpen} startIcon={<AddIcon />}>
        Add School
      </Button>
      <SchoolList schools={schools} onInfo={handleInfoClick} />
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