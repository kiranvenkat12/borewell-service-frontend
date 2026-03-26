import { useEffect, useState } from "react";
import { getAllRequests, deleteCompleted } from "../services/adminDashboardService";
import "./AdminDashboard.css";
const CompletedRequests = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    fetchCompleted();
  }, []);

  const fetchCompleted = async () => {
    const res = await getAllRequests();
    setCompleted(res.data.filter((req) => req.status === "completed"));
  };

  const handleDelete = async (id) => {
    await deleteCompleted(id);
    fetchCompleted();
  };

  return (
    <div className="cards">
      {completed.map((req) => (
        <div className="card" key={req.id}>
          <p><b>ID:</b> {req.id}</p>
          <p><b>Name:</b> {req.name}</p>
          <p><b>Status:</b> {req.status}</p>
          <button onClick={() => handleDelete(req.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CompletedRequests;