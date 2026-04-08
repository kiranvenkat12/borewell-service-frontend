import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState({
    admin: localStorage.getItem("adminToken"),
    worker: localStorage.getItem("workerToken"),
    customer: localStorage.getItem("customerToken"),
  });

  // Login for any role
  const login = (role, token) => {
    localStorage.setItem(`${role}Token`, token);
    setTokens(prev => ({ ...prev, [role]: token }));
  };

  const logout = (role) => {
    localStorage.removeItem(`${role}Token`);
    setTokens(prev => ({ ...prev, [role]: null }));
  };

  return (
    <AuthContext.Provider value={{ tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);