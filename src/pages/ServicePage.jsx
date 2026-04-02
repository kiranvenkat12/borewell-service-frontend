import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServicePage.css";
import Navbar from "../components/Navbar";

const services = [
  {
    title: "New Bore Drilling",
    description: "Reliable drilling for strong water source",
    icon: "🛠️",
    value: "drilling",
    color: "#d4f5e9",
  },
  {
    title: "Borewell Camera Scanning",
    description: "Detect issues with camera inspection",
    icon: "📷",
    value: "camera",
    color: "#f3d9fa",
  },
  {
    title: "New Motor Installation",
    description: "Install efficient pumping systems",
    icon: "⚙️",
    value: "motor_install",
    color: "#ffe4c7",
  },
  {
    title: "Stuck Motor Removal",
    description: "Safe removal without damage",
    icon: "🔧",
    value: "motor_remove",
    color: "#dbeafe",
  },
  {
    title: "Motor Repair",
    description: "Quick repair & maintenance",
    icon: "🔩",
    value: "repair",
    color: "#e2f7d3",
  },
];

const ServicePage = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceValue) => {
    navigate("/request", { state: { serviceType: serviceValue } });
  };

  return (
    <div className="service-page">
      <Navbar />

      <div className="service-container">
        {/* Header */}
        <div className="service-header">
          <h2>Borewell Services</h2>
          <p>Choose the service you need</p>
        </div>

        {/* Featured Card */}
        <div
          className="featured-card"
          onClick={() => handleServiceClick("drilling")}
        >
          <div>
            <h3>New Bore Drilling</h3>
            <p>Get best drilling service today</p>
            <button>Book Now</button>
          </div>
          <div className="featured-icon">🛠️</div>
        </div>

        {/* Service List */}
        <div className="service-list">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item"
              style={{ background: service.color }}
              onClick={() => handleServiceClick(service.value)}
            >
              <div className="icon">{service.icon}</div>
              <div className="text">
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
              <div className="arrow">›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;