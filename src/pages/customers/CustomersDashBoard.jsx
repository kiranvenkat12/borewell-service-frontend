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

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!token || !phoneNumber) {
      alert("Please login first");
      navigate("/customer/login");
    }
  }, [token, phoneNumber, navigate]);

  // 📡 Fetch Borewell Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Phone:", phoneNumber);

        const res = await axios.get(
          `https://borewell-service-production.up.railway.app/admin/borewell-info/${phoneNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", res.data);

        setBorewellData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err.response?.data);
        alert("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (phoneNumber) {
      fetchData();
    }
  }, [token, phoneNumber]);

  if (loading) return <p>Loading...</p>;
  if (!borewellData || borewellData.length === 0)
    return <p>No borewell data available</p>;

  return (
    <div className="dashboard-container">
      <h1>Customer Dashboard</h1>

      {borewellData.map((bore, index) => (
        <div className="borewell-card" key={index}>
          <h2>Borewell #{index + 1}</h2>

          {/* 📊 Borewell Details */}
          <div className="borewell-details">
            <p><strong>Depth:</strong> {bore.borewell_data.borewell_depth} m</p>
            <p><strong>Casing Depth:</strong> {bore.borewell_data.casing_depth} m</p>
            <p><strong>Water Level:</strong> {bore.borewell_data.water_level} m</p>
            <p><strong>Pipe Size:</strong> {bore.borewell_data.pipe_size}</p>
            <p><strong>Pipe Joint:</strong> {bore.borewell_data.pipe_joint}</p>
            <p><strong>Water Quality:</strong> {bore.borewell_data.Water_Quality}</p>

            <p><strong>TDS:</strong> {bore.borewell_data.tds}</p>
            <p><strong>pH:</strong> {bore.borewell_data.ph}</p>
            <p><strong>Hardness:</strong> {bore.borewell_data.hardness}</p>
            <p><strong>Iron:</strong> {bore.borewell_data.iron}</p>
            <p><strong>Chlorine:</strong> {bore.borewell_data.chlorine}</p>
            <p><strong>Nitrate:</strong> {bore.borewell_data.nitrate}</p>

            <p><strong>Water Color:</strong> {bore.borewell_data.water_color}</p>
            <p><strong>Water Smell:</strong> {bore.borewell_data.water_smell}</p>
          </div>

          {/* 🧠 Analysis */}
          <div className="borewell-analysis">
            <h3>Analysis</h3>
            <p><strong>Status:</strong> {bore.analysis.status}</p>
            <p><strong>Issues:</strong> {bore.analysis.issues.join(", ") || "None"}</p>

            {/* 💡 Solutions */}
            <h4>Solutions</h4>

            <p><strong>Low Cost:</strong></p>
            <ul>
              {bore.analysis.solutions.low_cost.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p><strong>Medium Cost:</strong></p>
            <ul>
              {bore.analysis.solutions.medium_cost.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p><strong>High Cost:</strong></p>
            <ul>
              {bore.analysis.solutions.high_cost.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {/* 🛠️ Product Recommendations */}
            <h3>Product Recommendations</h3>

            <p><strong>Drinking:</strong></p>
            <ul>
              {bore.recommendations.drinking.low.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p><strong>Bathing:</strong></p>
            <ul>
              {bore.recommendations.bathing.low.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p><strong>Washing:</strong></p>
            <ul>
              {bore.recommendations.washing.low.map((item, i) => (
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