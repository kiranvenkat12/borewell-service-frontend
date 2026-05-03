import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ onSelect }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
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

            <li onClick={() => onSelect("serviceRequests")}>
              Service Requests
            </li>

            <li onClick={() => onSelect("workers")}>Workers</li>

            <li onClick={() => onSelect("assignedRequests")}>
              Assigned Requests
            </li>

            <li onClick={() => onSelect("completedRequests")}>
              Completed Requests
            </li>

            <li onClick={() => onSelect("borewellAssignment")}>
              Borewell Assignment
            </li>

            {/* 🔥 NEW ITEM ADDED */}
            <li
  onClick={() =>
    window.open("https://borewell-lens-notes.lovable.app/", "_blank")
  }
>
  Bore Inception
</li>
          </ul>

          {/* Logout */}
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