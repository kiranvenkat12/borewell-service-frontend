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

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!token || !phoneNumber) {
      alert("Please login first");
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

        setBorewellData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (phoneNumber) fetchData();
  }, [token, phoneNumber]);

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/customer/login");
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
          onClick={() => navigate("/customer/request")}
        >
          + Raise Request
        </button>
      </div>

      {/* ❌ EMPTY STATE */}
      {(!borewellData || borewellData.length === 0) && (
        <div className="empty-state">
          <p>Our team is working on your bore details.</p>
          <p>It will be updated soon.</p>
        </div>
      )}

      {/* ✅ DATA */}
      {borewellData.map((bore, index) => (
        <div className="card" key={index}>
          <h2>Borewell #{index + 1}</h2>

          <div className="grid">
            <p><strong>Depth:</strong> {bore.borewell_data.borewell_depth} m</p>
            <p><strong>Casing:</strong> {bore.borewell_data.casing_depth} m</p>
            <p><strong>Water Level:</strong> {bore.borewell_data.water_level} m</p>
            <p><strong>pH:</strong> {bore.borewell_data.ph}</p>
            <p><strong>TDS:</strong> {bore.borewell_data.tds}</p>
            <p><strong>Iron:</strong> {bore.borewell_data.iron}</p>
          </div>

          <div className="analysis">
            <h3>Status: {bore.analysis.status}</h3>
            <p><strong>Issues:</strong> {bore.analysis.issues.join(", ") || "None"}</p>
          </div>
        </div>
      ))}

    </div>
  );
};

export default CustomerDashboard;