import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomersDashboard.css";

const CustomerDashboard = () => {
  const [borewellData, setBorewellData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("customerToken");
  const phoneNumber = localStorage.getItem("customerPhone");
  const customerName = localStorage.getItem("customerName") || "Customer";

  // 🔐 Auth Check
  useEffect(() => {
    if (!token || !phoneNumber) {
      navigate("/customer/login");
    }
  }, [token, phoneNumber, navigate]);

  // 📡 Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://borewell-service-production.up.railway.app/admin/borewell-info/${phoneNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBorewellData(res.data || []);
      } catch (err) {
        console.log("No data or API issue");
        setBorewellData([]);
      } finally {
        setLoading(false);
      }
    };

    if (phoneNumber) fetchData();
  }, [token, phoneNumber]);

  // 🔓 Logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.clear();
    navigate("/");
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="dashboard">

      {/* 🔝 HEADER */}
      <div className="top-header">
        <h3>Hello, {customerName}</h3>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* 📌 MAIN HEADER */}
      <div className="main-header">
        <h1>Customer Dashboard</h1>
        <button
          className="request-btn"
          onClick={() => navigate("/services")}
        >
          + Raise Request
        </button>
      </div>

      {/* ❌ EMPTY STATE */}
      {borewellData.length === 0 && (
        <div className="empty-state">
          <h3>No Borewell Data Yet</h3>
          <p>Our team is working on your borewell inspection.</p>
          <p>You will see complete details here soon.</p>
        </div>
      )}

      {/* ✅ FULL DATA */}
      {borewellData.map((bore, index) => (
        <div className="card" key={index}>
          <h2>Borewell #{index + 1}</h2>

          {/* 📊 Dynamic Data */}
          <div className="grid">
            {Object.entries(bore.borewell_data || {}).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {String(value)}
              </p>
            ))}
          </div>

          {/* 🧠 Analysis */}
          <div className="analysis">
            <h3>Status: {bore.analysis?.status}</h3>

            <p>
              <strong>Issues:</strong>{" "}
              {bore.analysis?.issues?.length
                ? bore.analysis.issues.join(", ")
                : "None"}
            </p>

            <h4>Solutions</h4>

            <p><strong>Low Cost:</strong></p>
            <ul>
              {(bore.analysis?.solutions?.low_cost || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p><strong>Medium Cost:</strong></p>
            <ul>
              {(bore.analysis?.solutions?.medium_cost || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p><strong>High Cost:</strong></p>
            <ul>
              {(bore.analysis?.solutions?.high_cost || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerDashboard;