import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ServiceRequests from "../../components/ServiceRequests";
import Worker from "../../components/Worker";
import AssignedRequests from "../../components/AssignedRequests";
import CompletedRequests from "../../components/CompletedRequests";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [selectedReq, setSelectedReq] = useState(null);
  const navigate = useNavigate();

 

useEffect(() => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    window.location.href = "/admin-login";
  }
}, []);

  const handleAssignClick = (reqId) => {
    setSelectedReq(reqId);
    setSelectedPage("workers");
  };

  return (
    <div className="admin-layout">
      <Sidebar onSelect={setSelectedPage} />

      <div className="content">
        <Header />

        {selectedPage === "dashboard" && (
          <h2>Welcome to Admin Dashboard</h2>
        )}

        {selectedPage === "serviceRequests" && (
          <ServiceRequests onAssignClick={handleAssignClick} />
        )}

        {selectedPage === "workers" && (
          <Worker selectedReq={selectedReq} />
        )}

        {selectedPage === "assignedRequests" && (
          <AssignedRequests />
        )}

        {selectedPage === "completedRequests" && (
          <CompletedRequests />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;