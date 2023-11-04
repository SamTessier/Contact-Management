import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import StaffList from "./StaffList";
import StaffDetails from "./StaffDetails";
import StaffDialogForm from "./StaffDialogForm";
import { Staff } from "../types";
import { useMutation, useQuery, useQueryClient } from "react-query";

const AllStaff = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { data: staffMembers, isLoading } = useQuery(
    ["staffMembers"],
    async () =>
      (await (await fetch("http://${import.meta.env.VITE_API_URL}api/staff")).json()) as Staff[]
  );

  const { mutate: createStaff } = useMutation(async (staff: Staff) => {
    await fetch("http://${import.meta.env.VITE_API_URL}api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(staff),
    });
    queryClient.invalidateQueries(["staffMembers"]);
  });

  const { mutate: updateStaff } = useMutation(async (staff: Staff) => {
    await fetch(`http://${import.meta.env.VITE_API_URL}api/staff/${staff.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(staff),
    });
    queryClient.invalidateQueries(["staffMembers"]);
  });

  const { mutate: deleteStaff } = useMutation(async (id: string) => {
    await fetch(`http://${import.meta.env.VITE_API_URL}api/staff/${id}`, {
      method: "DELETE",
    });
    queryClient.invalidateQueries(["staff"]);
  });

  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleInfoClick = (staff: Staff) => {
    setSelectedStaff(staff);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedStaff(null);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleAddStaff = (staff: Staff) => {
    createStaff(staff);
    handleFormClose();
  };

  const handleUpdateStaff = (updatedStaff: Staff) => {
    updateStaff(updatedStaff);
  };

  const handleDeleteStaff = (id: string) => {
    deleteStaff(id);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Button onClick={handleFormOpen} startIcon={<AddIcon />}>
        Add New Staff
      </Button>

      <StaffList staffMembers={staffMembers || []} onInfo={handleInfoClick} />
      {selectedStaff && (
        <StaffDetails
          open={detailsOpen}
          handleClose={handleDetailsClose}
          staff={selectedStaff}
          handleDelete={handleDeleteStaff}
          handleUpdateStaff={handleUpdateStaff}
          schools={undefined}
        />
      )}
      <StaffDialogForm
        open={formOpen}
        handleClose={handleFormClose}
        onSubmit={handleAddStaff}
        schools={[]}
      />
    </>
  );
};

export default AllStaff;
