import { useEffect, useState } from "react";
import { getAllRequests } from "../services/adminDashboardService";
import "./ServiceRequests.css";
const ServiceRequests = ({ onAssignClick }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await getAllRequests();
    setRequests(res.data);
  };

  return (
    <div className="cards">
      {requests.map((req) => (
        <div className="card" key={req.id}>
          <p><b>ID:</b> {req.id}</p>
          <p><b>Name:</b> {req.name}</p>
          <p><b>Phone:</b> {req.phone}</p>
          <p><b>Service Type:</b> {req.serviceType}</p>
          {req.borewellDepth && <p><b>Borewell Depth:</b> {req.borewellDepth}</p>}
          <p><b>Address:</b> {req.address}, {req.area} - {req.pinCode}</p>
          {req.description && <p><b>Description:</b> {req.description}</p>}
          <p><b>Status:</b> {req.status}</p>
          {req.status === "pending" && (
            <button onClick={() => onAssignClick(req.id)}>Assign</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceRequests;