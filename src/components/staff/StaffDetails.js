import React from "react";
import DetailsFactory from "../DetailsFactory";
import { getStaff } from "../../localStorageDB";

const StaffDetails = ({
  open,
  handleClose,
  staff,
  handleDelete,
  handleUpdateStaff,
}) => (
  <DetailsFactory
    config={{
      open,
      handleClose,
      item: staff,
      handleDelete,
      handleUpdate: handleUpdateStaff,
      itemType: "staff",
      staff: getStaff() 
    }}
  />
);

export default StaffDetails;
