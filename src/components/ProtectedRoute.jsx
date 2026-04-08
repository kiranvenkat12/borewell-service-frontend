import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  let token;

  // Determine token based on role
  switch (role) {
    case "admin":
      token = localStorage.getItem("adminToken");
      break;
    case "worker":
      token = localStorage.getItem("workerToken");
      break;
    case "customer":
      token = localStorage.getItem("customerToken");
      break;
    default:
      token = null;
  }

  const location = useLocation();

  if (!token) {
    // Redirect to the correct login page based on role
    const redirectPath =
      role === "admin"
        ? "/admin/login"
        : role === "worker"
        ? "/worker/login"
        : "/customer/auth"; // customer login

    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Token exists → allow access
  return children;
};

export default ProtectedRoute;