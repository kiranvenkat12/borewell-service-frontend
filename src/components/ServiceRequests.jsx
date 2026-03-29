import { useEffect, useState } from "react";
import { getAllRequests } from "../services/adminDashboardService";
import "./ServiceRequests.css";

const ServiceRequests = ({ onAssignClick }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await getAllRequests();

      // 🔥 Map backend data → frontend format
      const formatted = res.data.map((req) => ({
        id: req.id,
        name: req.name,
        phone: req.phone_primary,
        phoneSecondary: req.phone_secondary,
        serviceType: req.service_type,
        borewellDepth: req.borewell_depth,
        address: req.address,
        area: req.area || "",
        pinCode: req.pincode,
        description: req.description,
        status: req.status?.toLowerCase(), // 🔥 normalize
      }));

      setRequests(formatted);
    } catch (err) {
      console.error("Error fetching requests:", err);

      // 🔥 If token expired / invalid → logout
      if (err.status === 401 || err.message === "Unauthorized") {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin-login";
      }
    }
  };

  return (
    <div className="cards">
      {requests.length === 0 ? (
        <p>No service requests found</p>
      ) : (
        requests.map((req) => (
          <div className="card" key={req.id}>
            <p><b>ID:</b> {req.id}</p>
            <p><b>Name:</b> {req.name}</p>

            <p><b>Phone:</b> {req.phone}</p>

            {req.phoneSecondary && (
              <p><b>Alt Phone:</b> {req.phoneSecondary}</p>
            )}

            <p><b>Service Type:</b> {req.serviceType}</p>

            {req.borewellDepth && (
              <p><b>Borewell Depth:</b> {req.borewellDepth}</p>
            )}

            <p>
              <b>Address:</b> {req.address}, {req.area} - {req.pinCode}
            </p>

            {req.description && (
              <p><b>Description:</b> {req.description}</p>
            )}

            <p><b>Status:</b> {req.status}</p>

            {req.status === "pending" && (
              <button onClick={() => onAssignClick(req.id)}>
                Assign
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceRequests;