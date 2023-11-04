import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import { SearchContext } from './SearchContext';
import { useLocation } from 'react-router-dom';

const StyledTextField = styled(TextField)({
  "& .MuiFilledInput-root": {
    borderRadius: "50px",
    backgroundColor: "white",
    border: "1px solid grey",
  },
  "& .MuiFilledInput-input": {
    height: "20px",
    padding: "10px 12px",
  },
  "& .MuiFilledInput-underline:before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline.Mui-focused:after": {
    borderBottom: "none",
  },
});

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useContext(SearchContext);
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return(
    <div style={{ height: "64px" }}></div>
    )
  }
  return (
    <StyledTextField
      variant="filled"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
      InputProps={{
        startAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
      style={{ marginTop: "15px", marginBottom: "15px"}}
    />
  );
};

export default SearchBar;