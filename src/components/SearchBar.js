import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
};

export default SearchBar;