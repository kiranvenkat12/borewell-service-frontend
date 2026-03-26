import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ onSelect }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <ul>
          <li onClick={() => onSelect("dashboard")}>Dashboard</li>
          <li onClick={() => onSelect("serviceRequests")}>Service Requests</li>
          <li onClick={() => onSelect("workers")}>Workers</li>
          <li onClick={() => onSelect("assignedRequests")}>Assigned Requests</li>
          <li onClick={() => onSelect("completedRequests")}>Completed Requests</li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;