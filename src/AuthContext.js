import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const logIn = (email, password) => {
    // here you would normally check the credentials against a real database
    // for the sake of this project, any email and password will log you in
    const user = { email };
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const signUp = (email, password) => {
    // here you would normally create the user in a real database
    // for the sake of this project, any email and password will create a user
    const user = { email };
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = { currentUser, logIn, signUp, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
