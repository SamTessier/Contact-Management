import React from "react";
import DetailsFactory from "../DetailsFactory";
import { getStudents } from "../../localStorageDB";

const StudentDetails = ({
  open,
  handleClose,
  student,
  handleDelete,
  handleUpdateStudent,
}) => (
  <DetailsFactory
    config={{
      open,
      handleClose,
      item: student,
      handleDelete,
      handleUpdate: handleUpdateStudent,
      itemType: "student",
      students: getStudents() 
    }}
  />
);

export default StudentDetails;
