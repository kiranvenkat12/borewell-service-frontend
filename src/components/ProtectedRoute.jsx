import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { tokens } = useAuth();
  const token = tokens[role];   // Get the token for the specific role
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to={role === "customer" ? "/customer/auth" : `/${role}/login`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;