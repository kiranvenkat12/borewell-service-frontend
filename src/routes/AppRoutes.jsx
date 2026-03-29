import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ServicePage from "../pages/ServicePage";
import ProtectedRoute from "../components/ProtectedRoute";
// Admin
import AdminLogin from "../pages/admin/AdminLogin";
import AdminRegister from "../pages/admin/AdminRegister";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NotFound from "../pages/NotFound";
import RequestPage from "../pages/RequestPage"; 
// Worker
import WorkerLogin from "../pages/worker/WorkerLogin";
import WorkerDashboard from "../pages/worker/WorkerDashboard";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
  {/* Admin */}
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin/register" element={<AdminRegister />} />
  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    }
  />

  {/* Worker */}
  <Route path="/worker/login" element={<WorkerLogin />} />
  <Route
    path="/worker/dashboard"
    element={
      <ProtectedRoute role="worker">
        <WorkerDashboard />
      </ProtectedRoute>
    }
  />

  {/* Other pages */}
  <Route path="/" element={<Home />} />
  <Route path="/services" element={<ServicePage />} />
  <Route path="/request" element={<RequestPage />} />

  {/* Catch all */}
  <Route path="*" element={<NotFound />} />
</Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;