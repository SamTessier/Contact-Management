import React, { createContext, useEffect, useState } from 'react';
import { saveUser, getUsers } from './localStorageDB';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const logIn = (email, password) => {
    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const signUp = (email, password) => {
    const user = { email, password };
    saveUser(user);  // save the user in the local storage

  };

  const logOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = { currentUser, logIn, signUp, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
