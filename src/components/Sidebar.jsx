import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ onSelect }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login data (adjust based on your auth system)
    localStorage.removeItem("adminToken");

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <>
          <ul>
            <li onClick={() => onSelect("dashboard")}>Dashboard</li>
            <li onClick={() => onSelect("serviceRequests")}>Service Requests</li>
            <li onClick={() => onSelect("workers")}>Workers</li>
            <li onClick={() => onSelect("assignedRequests")}>Assigned Requests</li>
            <li onClick={() => onSelect("completedRequests")}>Completed Requests</li>
          </ul>

          {/* Logout at bottom */}
          <div className="logout-section">
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;