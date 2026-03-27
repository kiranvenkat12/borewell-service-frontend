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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const workerName = "John Doe"; // Replace with actual worker name from auth

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAssignedRequests();
    setRequests(res.data);
  };

  const handleStart = async (id) => {
    await startRequest(id);
    fetchData();
  };

  const handleCompleteClick = (id) => {
    setSelectedId(id);
    setShowCompleteModal(true);
  };

  const confirmComplete = async () => {
    await completeRequest(selectedId);
    setShowCompleteModal(false);
    fetchData();
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // TODO: replace with actual logout logic
    console.log("Logged out");
    setShowLogoutModal(false);
  };

  return (
    <div className="worker-container">
      {/* Header */}
      <header className="worker-header">
        <div className="header-left">Hello, {workerName}</div>
        <div className="header-center">Worker Dashboard</div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </header>

      {/* Tasks */}
      <div className="worker-cards">
        {requests.length === 0 && <p>No assigned requests</p>}
        {requests.map((req) => (
          <div className="worker-card" key={req.id}>
            <p><b>Service:</b> {req.serviceType}</p>
            <p><b>Name:</b> {req.name}</p>
            <p><b>Phone:</b> {req.phone}</p>
            <p><b>Address:</b> {req.address}</p>
            <p><b>Description:</b> {req.description}</p>

            {req.status === "pending" ? (
              <button onClick={() => handleStart(req.id)}>Start Work</button>
            ) : (
              <button
                className="complete-btn"
                onClick={() => handleCompleteClick(req.id)}
              >
                Complete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Complete Modal */}
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

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to logout?</h3>
            <div className="modal-actions">
              <button onClick={confirmLogout}>Yes</button>
              <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;