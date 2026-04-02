import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicePage.css";
import Navbar from "../components/Navbar";
import Fotter from "../components/Footer"

/* 🔥 Featured Auto Slider */
const featuredServices = [
  {
    title: "New Bore Drilling",
    description: "Get the best professional drilling service today",
    icon: "🛠️",
    value: "drilling",
  },
  {
    title: "Camera Scanning",
    description: "Inspect your borewell with advanced cameras",
    icon: "📷",
    value: "camera",
  },
  {
    title: "Motor Installation",
    description: "Install efficient pumping systems",
    icon: "⚙️",
    value: "motor_install",
  },
];

/* 🔥 All Services */
const services = [
  {
    title: "New Bore Drilling",
    description: "Reliable drilling for strong water source",
    icon: "🛠️",
    value: "drilling",
    color: "#e0f2fe",
  },
  {
    title: "Borewell Camera Scanning",
    description: "Detect internal issues with inspection",
    icon: "📷",
    value: "camera",
    color: "#dbeafe",
  },
  {
    title: "Motor Installation",
    description: "Install efficient pumping systems",
    icon: "⚙️",
    value: "motor_install",
    color: "#e5e7eb",
  },
  {
    title: "Stuck Motor Removal",
    description: "Safe removal without damage",
    icon: "🔧",
    value: "motor_remove",
    color: "#fef3c7",
  },
  {
    title: "Motor Repair",
    description: "Quick repair & maintenance",
    icon: "🔩",
    value: "repair",
    color: "#dcfce7",
  },
];

const ServicePage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleServiceClick = (serviceValue) => {
    navigate("/request", { state: { serviceType: serviceValue } });
  };

  /* 🔥 Auto slide every 3 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === featuredServices.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentService = featuredServices[currentIndex];

  return (
    <div className="service-page">
      <Navbar />

      <div className="service-container">
        {/* Header */}
        {/* <div className="service-header">
          <h2>Borewell Services</h2>
          <p>Choose the service you need</p>
        </div> */}

        {/* 🔥 Featured Slider */}
        <div
          className="featured-card"
          onClick={() => handleServiceClick(currentService.value)}
        >
          <div className="featured-content">
            <h3>{currentService.title}</h3>
            <p>{currentService.description}</p>
            <button>Book Now</button>
          </div>

          <div className="featured-icon">{currentService.icon}</div>
        </div>

        {/* 🔥 All Services */}
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
            </div>
          ))}
        </div>
      </div>
      <Fotter/>
    </div>
  );
};

export default ServicePage;