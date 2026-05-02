import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import ServicePage from "../pages/ServicePage";
import RequestPage from "../pages/RequestPage";
import NotFound from "../pages/NotFound";
import BorewellTool from "../components/BorewellTool";

// Admin
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";

// Worker
import WorkerLogin from "../pages/worker/WorkerLogin";
import WorkerDashboard from "../pages/worker/WorkerDashboard";

// Customer
import CustomersLogin from "../pages/customers/CustomersLogin";
import CustomerDashboard from "../pages/customers/CustomersDashBoard";
// ProtectedRoute
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/borewell-tool" element={<BorewellTool />} />

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

        {/* Customer */}
<Route path="/customer/auth" element={<CustomersLogin />} />
<Route
  path="/customer/dashboard"
  element={
    <ProtectedRoute role="customer">
      <CustomerDashboard />
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