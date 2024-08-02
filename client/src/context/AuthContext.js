import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${apiUrl}/api/users/userDetails`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAuth({ token, user: response.data });
        })
        .catch(() => {
          setAuth({ token: null, user: null });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setAuth({ token: token, user: user });
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
