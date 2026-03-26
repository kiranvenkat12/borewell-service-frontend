import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

// Admin
import AdminLogin from "../pages/admin/AdminLogin";
import AdminRegister from "../pages/admin/AdminRegister";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageWorkers from "../pages/admin/ManageWorkers";
import NotFound from "../pages/NotFound";

// Worker
import WorkerLogin from "../pages/worker/WorkerLogin";
import WorkerDashboard from "../pages/worker/WorkerDashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/workers" element={<ManageWorkers />} />

        {/* Worker */}
        <Route path="/worker/login" element={<WorkerLogin />} />
        <Route path="/worker/dashboard" element={<WorkerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;