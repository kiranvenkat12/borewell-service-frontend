import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false); // desktop
  const [mobileStaffOpen, setMobileStaffOpen] = useState(false); // mobile
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Customer Portal", path: "/customer/auth", highlight: true }
  ];

  const staffMenu = [
    { label: "Admin Login", path: "/admin/login" },
    { label: "Worker Login", path: "/worker/login" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    if (path.startsWith("http")) {
      window.location.href = path;
    } else {
      navigate(path);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          Borewell Service
        </div>

        {/* DESKTOP MENU */}
        <ul className="navbar-menu">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className={item.highlight ? "navbar-btn" : ""}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </li>
          ))}

          {/* STAFF DROPDOWN (DESKTOP) */}
          <li
            className="staff-dropdown"
            onMouseEnter={() => setStaffOpen(true)}
            onMouseLeave={() => setStaffOpen(false)}
          >
            Staff ▾

            {staffOpen && (
              <ul className="dropdown-menu">
                {staffMenu.map((item) => (
                  <li key={item.label} onClick={() => handleNavigation(item.path)}>
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* HAMBURGER */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* MOBILE MENU */}
      <ul className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={item.highlight ? "mobile-highlight" : ""}
            onClick={() => {
              handleNavigation(item.path);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </li>
        ))}

        {/* 🔥 STAFF MOBILE ACCORDION */}
        <li
          className="mobile-staff-title"
          onClick={() => setMobileStaffOpen(!mobileStaffOpen)}
        >
          Staff {mobileStaffOpen ? "▲" : "▼"}
        </li>

        {mobileStaffOpen && (
          <div className="mobile-submenu">
            {staffMenu.map((item) => (
              <li
                key={item.label}
                onClick={() => {
                  handleNavigation(item.path);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </li>
            ))}
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;