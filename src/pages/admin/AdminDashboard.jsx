import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ServiceRequests from "../../components/ServiceRequests";
import Workers from "../../components/Worker";
import AssignedRequests from "../../components/AssignedRequests";
import CompletedRequests from "../../components/CompletedRequests";
import "./AdminDashboard.css";
const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [selectedReq, setSelectedReq] = useState(null);

  const handleAssignClick = (reqId) => {
    setSelectedReq(reqId);
    setSelectedPage("workers");
  };

  return (
    <div className="admin-layout">
      <Sidebar onSelect={setSelectedPage} />
      <div className="content">
        <Header />
        {selectedPage === "dashboard" && <h2>Welcome to Admin Dashboard</h2>}
        {selectedPage === "serviceRequests" && (
          <ServiceRequests onAssignClick={handleAssignClick} />
        )}
        {selectedPage === "workers" && <Workers selectedReq={selectedReq} />}
        {selectedPage === "assignedRequests" && <AssignedRequests />}
        {selectedPage === "completedRequests" && <CompletedRequests />}
      </div>
    </div>
  );
};

export default AdminDashboard;