import { useEffect, useState } from "react";
import { getCompletedRequests, deleteCompleted } from "../services/adminDashboardService";
import "./CompletedRequests.css";

const CompletedRequests = () => {
  const [completed, setCompleted] = useState([]);

  // 🔥 Fetch completed requests on mount
  useEffect(() => {
    fetchCompleted();
  }, []);

  const fetchCompleted = async () => {
    try {
      const res = await getCompletedRequests();
      setCompleted(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete single completed request
  const handleDelete = async (id) => {
    try {
      await deleteCompleted(id);
      fetchCompleted(); // refresh after delete
    } catch (err) {
      console.error("Failed to delete request:", err);
    }
  };

  // 🔹 Delete all completed requests
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all completed requests?")) return;
    try {
      await deleteCompleted(); // no id deletes all
      fetchCompleted(); // refresh after delete
    } catch (err) {
      console.error("Failed to delete all requests:", err);
    }
  };

  return (
    <div>
      <h2>Completed Requests</h2>
      <button className="delete-all-btn" onClick={handleDeleteAll}>
        Delete All Completed
      </button>

      <div className="cards">
        {completed.length === 0 ? (
          <p>No completed requests found.</p>
        ) : (
          completed.map((req) => (
            <div className="card" key={req.id}>
              <p><b>ID:</b> {req.id}</p>
              <p><b>Name:</b> {req.name}</p>
              <p><b>Status:</b> {req.status}</p>
              <button onClick={() => handleDelete(req.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedRequests;