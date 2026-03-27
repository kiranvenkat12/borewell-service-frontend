import React from "react";
import "./ServicePage.css";
import Navbar from "../components/Navbar";

const services = [
  {
    title: "New Bore Drilling",
    description: "Expert bore drilling services to ensure a reliable water source for your property.",
    icon: "🛠️",
  },
  {
    title: "Borewell Camera Scanning",
    description: "Identify blockages and assess the condition of your borewell with precision camera scanning.",
    icon: "📷",
  },
  {
    title: "New Motor Installation",
    description: "Professional installation of borewell motors to ensure efficient water pumping.",
    icon: "⚙️",
  },
  {
    title: "Stuck Motor Removal",
    description: "Safe and quick removal of stuck motors from borewells without damaging the structure.",
    icon: "🔧",
  },
  {
    title: "Motor Repair",
    description: "Repair and maintenance services to keep your borewell motor running smoothly.",
    icon: "🔩",
  },
];

const ServicePage = () => {
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
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button>Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;