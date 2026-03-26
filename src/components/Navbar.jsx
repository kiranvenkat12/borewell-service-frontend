import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // External CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Admin Login", path: "/admin/login" },
    { label: "Worker Login", path: "/worker/login" },
    { label: "Services", path: "/services" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          Borewell Service
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          {menuItems.map((item) => (
            <li key={item.label} onClick={() => navigate(item.path)}>
              {item.label}
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <ul className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        {menuItems.map((item) => (
          <li
            key={item.label}
            onClick={() => {
              navigate(item.path);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;