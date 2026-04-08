const ProtectedRoute = ({ children, role }) => {
  let token;
  if (role === "admin") token = localStorage.getItem("adminToken");
  else if (role === "worker") token = localStorage.getItem("workerToken");
  else if (role === "customer") token = localStorage.getItem("customerToken");

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