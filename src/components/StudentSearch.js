import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";

const StudentSearch = ({ searchTerm, setSearchTerm, showSearch, setShowSearch }) => {
  return (
    <Grid item xs={12}>
      {showSearch ? (
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "80%" }}
          onBlur={() => setShowSearch(false)}
        />
      ) : (
        <IconButton onClick={() => setShowSearch(true)}>
          <SearchIcon />
        </IconButton>
      )}
    </Grid>
  );
};

export default StudentSearch;
