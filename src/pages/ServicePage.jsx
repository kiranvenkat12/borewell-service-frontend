import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServicePage.css";
import Navbar from "../components/Navbar";

const services = [
  {
    title: "New Bore Drilling",
    description: "Expert bore drilling services to ensure a reliable water source for your property.",
    icon: "🛠️",
    value: "drilling",
  },
  {
    title: "Borewell Camera Scanning",
    description: "Identify blockages and assess the condition of your borewell with precision camera scanning.",
    icon: "📷",
    value: "camera",
  },
  {
    title: "New Motor Installation",
    description: "Professional installation of borewell motors to ensure efficient water pumping.",
    icon: "⚙️",
    value: "motor_install",
  },
  {
    title: "Stuck Motor Removal",
    description: "Safe and quick removal of stuck motors from borewells without damaging the structure.",
    icon: "🔧",
    value: "motor_remove",
  },
  {
    title: "Motor Repair",
    description: "Repair and maintenance services to keep your borewell motor running smoothly.",
    icon: "🔩",
    value: "repair",
  },
];

const ServicePage = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceValue) => {
    // Pass the selected service to the request page
    navigate("/request", { state: { serviceType: serviceValue } });
  };

  return (
    <div className="service-page">
      <Navbar />
      <div className="service-container">
        <header className="service-header">
          <h1>Our Borewell Services</h1>
          <p>Reliable and professional services for all your borewell needs.</p>
        </header>

        <div className="service-cards">
          {services.map((service, index) => (
            <div
              className="service-card"
              key={index}
              onClick={() => handleServiceClick(service.value)}
              style={{ cursor: "pointer" }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button>Request Service</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;