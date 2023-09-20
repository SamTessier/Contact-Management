import React, { createContext, useEffect, useState } from 'react';
import { getUsers, saveUser} from './localStorageDB';

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

  const signUp = (username, email, password, companyId, school = null) => {
    const user = { userName: username, email, password, companyId, school };
    const users = getUsers();
    const companyExists = users.some(user => user.companyId === companyId);

    if (companyExists) {
      user.role = "staff";
    } else {
      user.role = "admin";
      localStorage.setItem('companyID', companyId);
    }
    saveUser(user);
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
