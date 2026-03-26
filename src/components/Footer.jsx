import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Borewell Service</h3>
          <p>
            Reliable borewell services including drilling, repair, motor installation and maintenance.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Admin Login</p>
          <p>Worker Login</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📞 7702486592</p>
          <p>📍 Hyderabad</p>
          <p>✉️ support@borewell.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Borewell Service. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;