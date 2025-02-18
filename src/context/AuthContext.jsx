import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      setJwtToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const logOut = () => {
    setJwtToken(null);
    setIsAuthenticated(false);
    Cookies.remove("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken, isAuthenticated, setIsAuthenticated, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
