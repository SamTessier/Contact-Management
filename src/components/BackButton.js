import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <IconButton onClick={handleBackClick}>
      <ArrowBackIcon fontSize="small" />
    </IconButton>
  );
};

export default BackButton;
