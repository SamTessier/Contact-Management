import { useState, createContext, Dispatch, ReactNode } from 'react';

type SearchContextType = [string, Dispatch<React.SetStateAction<string>>];

// createContext requires a default value or null
export const SearchContext = createContext<SearchContextType>(['', () => {}]);

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={[searchTerm, setSearchTerm]}>
      {children}
    </SearchContext.Provider>
  );
};
