import React from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const StaffSearch = ({searchTerm, onSearchChange, showSearch, onSearchClick}) => {
    return (
        showSearch ? (
            <TextField
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onBlur={onSearchClick}
                fullWidth
                autoFocus
            />
        ) : (
            <IconButton onClick={onSearchClick}>
                <SearchIcon />
            </IconButton>
        )
    );
};

export default StaffSearch;
