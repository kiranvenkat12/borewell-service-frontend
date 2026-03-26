import { useEffect, useState } from "react";
import { getAssignedRequests } from "../services/adminDashboardService.js"; // fixed path
import "./AssignedRequests.css";

const AssignedRequests = () => {
  const [assigned, setAssigned] = useState([]);

  useEffect(() => {
    fetchAssigned();
  }, []);

  const fetchAssigned = async () => {
    const res = await getAssignedRequests();
    setAssigned(res.data);
  };

  return (
    <div className="cards">
      {assigned.map((req) => (
        <div className="card" key={req.id}>
          <p><b>ID:</b> {req.id}</p>
          <p><b>Name:</b> {req.name}</p>
          <p><b>Status:</b> {req.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AssignedRequests;