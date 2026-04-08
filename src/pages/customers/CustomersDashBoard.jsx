import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("customerToken");
  const phoneNumber = localStorage.getItem("customerPhone");

  // Redirect if not logged in
  useEffect(() => {
    if (!token || !phoneNumber) {
      navigate("/customer/login");
    }
  }, [token, phoneNumber, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://borewell-service-production.up.railway.app/customer-registrations/dashboard/${phoneNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCustomerData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err.response?.data);
        alert("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, phoneNumber]);

  if (loading) return <p>Loading...</p>;
  if (!customerData) return <p>No data available</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {customerData.name}</h1>

      {customerData.borewell_info?.map((bore, index) => (
        <div className="borewell-card" key={index}>
          <h2>Borewell #{index + 1}</h2>
          <div className="borewell-details">
            <p><strong>Depth:</strong> {bore.borewell_data.borewell_depth} m</p>
            <p><strong>Casing Depth:</strong> {bore.borewell_data.casing_depth} m</p>
            <p><strong>Water Level:</strong> {bore.borewell_data.water_level} m</p>
            <p><strong>Pipe Size:</strong> {bore.borewell_data.pipe_size} inch</p>
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

          <div className="borewell-analysis">
            <h3>Analysis & Recommendations</h3>
            <p>{bore.analysis}</p>
            {bore.recommendations && bore.recommendations.length > 0 && (
              <ul>
                {bore.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerDashboard;