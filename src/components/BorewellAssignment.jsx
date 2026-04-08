import { useState } from "react";
import axios from "axios";
import "./BorewellAssignment.css";
import { useAuth } from "../../src/services/AuthContext";

const BorewellAssignment = () => {
  const [customerNum, setCustomerNum] = useState("");

  const [formData, setFormData] = useState({
    borewell_depth: "",
    casing_depth: "",
    water_level: "",
    pipe_size: "",
    pipe_joint: "",
    water_gaps: "",
    casing_Condition: "",
    pipe_Condition: "",
    Water_Quality: "",
    tds: "",
    ph: "",
    hardness: "",
    iron: "",
    chlorine: "",
    nitrate: "",
    water_color: "",
    water_smell: "",
    water_quality_status: "",
  });

  // ✅ Use token from context (NOT localStorage)
  const { tokens } = useAuth();
  const token = tokens.admin;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
  if (!customerNum) {
    alert("Enter customer mobile number");
    return;
  }

  if (!token) {
    alert("You are not logged in ❌");
    return;
  }

  try {
    const formattedData = {
      ...formData,
      borewell_depth: Number(formData.borewell_depth),
      casing_depth: Number(formData.casing_depth),
      water_level: Number(formData.water_level),
      tds: Number(formData.tds),
      ph: Number(formData.ph),
      hardness: Number(formData.hardness),
      iron: Number(formData.iron),
      chlorine: Number(formData.chlorine),
      nitrate: Number(formData.nitrate),
    };

    const res = await axios.post(
      `https://borewell-service-production.up.railway.app/admin/borewell-info/${customerNum}`,
      formattedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Borewell info submitted successfully ✅");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.detail || "Error submitting data ❌");
  }
};
  return (
    <div className="borewell-container">
      <h2>Borewell Assignment</h2>

      {/* Customer Number */}
      <input
        type="number"
        placeholder="Enter Customer Mobile Number"
        value={customerNum}
        onChange={(e) => setCustomerNum(e.target.value)}
        className="input-full"
      />

      {/* Form Grid */}
      <div className="form-grid">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace(/_/g, " ")}
            value={formData[key]}
            onChange={handleChange}
          />
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default BorewellAssignment;