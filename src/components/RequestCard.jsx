import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RequestCard.css";
import { createRequest } from "../services/requestService";

const RequestCard = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone_primary: "",
    phone_secondary: "",
    service_type: "",
    borewell_depth: "",
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
      service_type: value, // ✅ FIXED
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone_primary ||   // ✅ FIXED
      !formData.service_type ||    // ✅ FIXED
      !formData.address ||
      !formData.pincode
    ) {
      alert("Please fill all mandatory fields");
      return;
    }

    try {
      setLoading(true);

      const data = await createRequest(formData);

      alert("Request Submitted Successfully!");
      console.log(data);

      setFormData({
        name: "",
        phone_primary: "",
        phone_secondary: "",
        service_type: "",
        borewell_depth: "",
        address: "",
        pincode: "",
        description: "",
      });

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-wrapper">
      <div className="request-card">

        <div className="back-btn" onClick={() => navigate("/")}>
          Back
        </div>

        <h2 className="card-title">🚰 Borewell Services</h2>
        <p className="subtitle">Fast • Trusted • Doorstep Service</p>

        <form onSubmit={handleSubmit} className="form">

          <div className="form-group">
            <label>👤 Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>📞 Mobile Phone *</label>
            <input
              type="tel"
              name="phone_primary"
              value={formData.phone_primary}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>📞 Second Mobile Phone(optional)</label>
            <input
              type="tel"
              name="phone_secondary"
              value={formData.phone_secondary}
              onChange={handleChange}
            />
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
                  className={formData.service_type === item.value ? "active" : ""}
                  onClick={() => handleServiceSelect(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {(formData.service_type === "motor_install" ||
            formData.service_type === "repair" ||
            formData.service_type === "motor_remove" ||
            formData.service_type === "camera") && (
            <div className="form-group">
              <label>📏 Borewell Depth</label>
              <input
                type="number"
                name="borewell_depth"
                value={formData.borewell_depth} // ✅ fixed spacing typo
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>📍 Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>📮 Pincode *</label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>📝 Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "🚀 Submit Request"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RequestCard;