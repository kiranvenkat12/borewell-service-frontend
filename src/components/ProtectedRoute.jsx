import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = role === "admin"
    ? localStorage.getItem("adminToken")
    : localStorage.getItem("workerToken");

  const location = useLocation();

  // ❌ No token → redirect to appropriate login
  if (!token) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/worker/login"} state={{ from: location }} replace />;
  }

  // ✅ Token exists → allow access
  return children;
};

export default ProtectedRoute;