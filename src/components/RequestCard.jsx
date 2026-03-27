import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RequestCard.css";

const RequestCard = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone1: "",
    phone2: "",
    serviceType: "",
    depth: "",
    address: "",
    pincode: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone1 ||
      !formData.serviceType ||
      !formData.address ||
      !formData.pincode
    ) {
      alert("Please fill all mandatory fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert("Request Submitted Successfully!");
      console.log(data);
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-wrapper">
      <div className="request-card">

        {/* 🔙 BACK BUTTON */}
        <div className="back-btn" onClick={() => navigate("/")}>
          Back
        </div>

        <h2 className="card-title">🚰 Borewell Services</h2>
        <p className="subtitle">Fast • Trusted • Doorstep Service</p>

        <form onSubmit={handleSubmit} className="form">

          <div className="form-group">
            <label>👤 Name *</label>
            <input type="text" name="name" onChange={handleChange} placeholder="Enter your name" />
          </div>

          <div className="form-group">
            <label>📞 Mobile Phone *</label>
            <input type="tel" name="phone1" onChange={handleChange} placeholder="10-digit number" />
          </div>

          <div className="form-group">
            <label>📞 Second Mobile Phone(optional)</label>
            <input type="tel" name="phone2" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>⚙️ Service Type *</label>
            <div className="service-options">
              {[
                { label: "Borewell Drilling", value: "drilling" },
                { label: "New Motor Install", value: "motor_install" },
                { label: "Motor Repair", value: "repair" },
                { label: "Stuck Motor Removal", value: "motor_remove" },
                { label: "Borewell Camera scanning", value: "camera" },
                { label: "Other", value: "other" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.value}
                  className={formData.serviceType === item.value ? "active" : ""}
                  onClick={() => handleServiceSelect(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {(formData.serviceType === "motor_install" ||
            formData.serviceType === "repair" ||
            formData.serviceType === "motor_remove" ||
            formData.serviceType === "camera") && (
            <div className="form-group">
              <label>📏 Borewell Depth</label>
              <input type="number" name="depth" onChange={handleChange} placeholder="in feet" />
            </div>
          )}

          <div className="form-group">
            <label>📍 Address *</label>
            <input type="text" name="address" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>📮 Pincode *</label>
            <input type="number" name="pincode" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>📝 Description</label>
            <textarea name="description" onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="submit-btn">
            {loading ? "Submitting..." : "🚀 Submit Request"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RequestCard;