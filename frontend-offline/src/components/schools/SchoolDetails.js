import React from "react";
import DetailsFactory from "../DetailsFactory";
import { getSchools } from "../../localStorageDB";

const SchoolDetails = ({
  open,
  handleClose,
  school,
  handleDelete,
  handleUpdateSchool,
}) => (
  <DetailsFactory
    config={{
      open,
      handleClose,
      item: school,
      handleDelete,
      handleUpdate: handleUpdateSchool,
      itemType: "school",
      schools: getSchools() 
    }}
  />
);

export default SchoolDetails;
