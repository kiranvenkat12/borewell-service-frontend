import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // 🔥 NEW

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Admin Login", path: "/admin/login" },
    { label: "Worker Login", path: "/worker/login" },
    { label: "Services", path: "/services" },
  ];

  // 🔥 SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); // trigger immediately
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
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