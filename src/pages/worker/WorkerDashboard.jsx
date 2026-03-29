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

  // ✅ Fetch assigned requests
  const fetchData = async () => {
    const workerId = localStorage.getItem("workerId");

    if (!workerId) {
      alert("Worker not logged in properly");
      window.location.href = "/worker/login";
      return;
    }

    try {
      const data = await getAssignedRequests();

      // ✅ Remove completed tasks (case-insensitive)
      const activeRequests = data.filter(
        (req) => req.status?.toLowerCase() !== "completed"
      );

      setRequests(activeRequests);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks. Please login again.");
    }
  };

  // ✅ Start Work
  const handleStart = async (id) => {
    try {
      await startRequest(id);
      fetchData(); // refresh list
    } catch (error) {
      console.error("Error starting request:", error);
      alert("Failed to start request");
    }
  };

  // ✅ Show modal to complete
  const handleCompleteClick = (id) => {
    setSelectedId(id);
    setShowCompleteModal(true);
  };

  // ✅ Confirm completion
  const confirmComplete = async () => {
    try {
      await completeRequest(selectedId);

      // ✅ Remove task immediately from UI
      setRequests((prev) => prev.filter((req) => req.id !== selectedId));
      setShowCompleteModal(false);
      setSelectedId(null);
    } catch (error) {
      console.error("Error completing request:", error);
      alert("Failed to complete request");
    }
  };

  // ✅ Logout
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

        {requests.map((req) => {
          const status = req.status?.toLowerCase();

          return (
            <div className="worker-card" key={req.id}>
              <p><b>Service:</b> {req.service_type}</p>
              <p><b>Name:</b> {req.name}</p>
              <p><b>Phone:</b> {req.phone_primary}</p>
              <p><b>Address:</b> {req.address}</p>
              <p><b>Description:</b> {req.description}</p>

              {["pending", "assigned"].includes(status) ? (
                <button onClick={() => handleStart(req.id)}>Start Work</button>
              ) : status === "in progress" ? (
                <button onClick={() => handleCompleteClick(req.id)}>Complete</button>
              ) : null}
            </div>
          );
        })}
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