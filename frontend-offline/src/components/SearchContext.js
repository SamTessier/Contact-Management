import React, { useState, createContext } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <SearchContext.Provider value={[searchTerm, setSearchTerm]}>
      {children}
    </SearchContext.Provider>
  );
};
