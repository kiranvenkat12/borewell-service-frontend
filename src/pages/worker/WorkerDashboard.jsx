import { useEffect, useState } from "react";
import {
  getAssignedRequests,
  startRequest,
  completeRequest,
} from "../../services/workerDashboardService";

import "./WorkerDashboard.css";

const WorkerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const workerName = localStorage.getItem("workerName") || "Worker";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAssignedRequests();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks. Please login again.");
    }
  };

  const handleStart = async (id) => {
    try {
      await startRequest(id);
      fetchData();
    } catch (error) {
      console.error("Error starting request:", error);
      alert("Failed to start request");
    }
  };

  const handleCompleteClick = (id) => {
    setSelectedId(id);
    setShowCompleteModal(true);
  };

  const confirmComplete = async () => {
    try {
      await completeRequest(selectedId);
      setShowCompleteModal(false);
      fetchData();
    } catch (error) {
      console.error("Error completing request:", error);
      alert("Failed to complete request");
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("workerToken");
    localStorage.removeItem("workerId");
    localStorage.removeItem("workerName");
    window.location.href = "/worker/login";
  };

  return (
    <div className="worker-container">
      <header className="worker-header">
        <div className="header-left">Hello, {workerName}</div>
        <div className="header-center">Worker Dashboard</div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </header>

      <div className="worker-cards">
        {requests.length === 0 && <p>No assigned requests</p>}
        {requests.map((req) => (
          <div className="worker-card" key={req.id}>
            <p><b>Service:</b> {req.service_type}</p>
            <p><b>Name:</b> {req.name}</p>
            <p><b>Phone:</b> {req.phone_primary}</p>
            <p><b>Address:</b> {req.address}</p>
            <p><b>Description:</b> {req.description}</p>

            {req.status === "assigned" || req.status === "pending" ? (
              <button onClick={() => handleStart(req.id)}>Start Work</button>
            ) : req.status === "in_progress" ? (
              <button onClick={() => handleCompleteClick(req.id)}>
                Complete
              </button>
            ) : (
              <span className="status-completed">Completed</span>
            )}
          </div>
        ))}
      </div>

      {showCompleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Completion?</h3>
            <div className="modal-actions">
              <button onClick={confirmComplete}>Yes</button>
              <button onClick={() => setShowCompleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;