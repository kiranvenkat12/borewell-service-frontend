import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  // Check token based on role
  const token =
    role === "admin"
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("workerToken");

  const location = useLocation();

  if (!token) {
    // Redirect to login of correct role
    return (
      <Navigate
        to={role === "admin" ? "/admin/login" : "/worker/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  // Token exists → allow access
  return children;
};

export default ProtectedRoute;