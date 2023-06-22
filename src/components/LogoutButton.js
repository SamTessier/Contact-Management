import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Box, IconButton, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const LogoutButton = () => {
  const { logOut, currentUser } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {currentUser && (
        <>
          <IconButton sx={{ color: "red" }} onClick={handleLogOut}>
            <ExitToAppIcon fontSize="small" />{" "}
          </IconButton>
          <Typography variant="caption" display="block" textAlign="center">
            Log Out
          </Typography>
        </>
      )}
    </Box>
  );
};

export default LogoutButton;
