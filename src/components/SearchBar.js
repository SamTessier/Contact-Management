import React, { useContext } from 'react';
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import { SearchContext } from './SearchContext';

const StyledTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    borderRadius: '50px',
    backgroundColor: 'white',
  },
  '& .MuiFilledInput-input': {
    height: '20px',
    padding: '10px 12px',
  },
  '& .MuiFilledInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottom: '2px solid #1E1E1E',
  },
  '& .MuiFilledInput-underline.Mui-focused:after': {
    borderBottom: '2px solid #1E1E1E',
  },
});

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useContext(SearchContext);
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
      style={{ marginTop: "15px" }}
    />
  );
};

export default SearchBar;
