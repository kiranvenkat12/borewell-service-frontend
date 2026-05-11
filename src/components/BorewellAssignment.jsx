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
const token = tokens.admin || localStorage.getItem("adminToken");

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

  const cleanNumber = (val) =>
    val === "" ? null : Number(val);

  try {
    const formattedData = {
      borewell_depth: cleanNumber(formData.borewell_depth),
      casing_depth: cleanNumber(formData.casing_depth),
      water_level: cleanNumber(formData.water_level),

      pipe_size: formData.pipe_size || null,
      pipe_joint: formData.pipe_joint || null,
      water_gaps: formData.water_gaps || null,

      casing_Condition: formData.casing_Condition || null,
      pipe_Condition: formData.pipe_Condition || null,

      Water_Quality: formData.Water_Quality || null,

      tds: cleanNumber(formData.tds),
      ph: cleanNumber(formData.ph),
      hardness: cleanNumber(formData.hardness),
      iron: cleanNumber(formData.iron),
      chlorine: cleanNumber(formData.chlorine),
      nitrate: cleanNumber(formData.nitrate),

      water_color: formData.water_color || null,
      water_smell: formData.water_smell || null,
      water_quality_status: formData.water_quality_status || null,
    };

    // remove null fields completely (VERY IMPORTANT)
    Object.keys(formattedData).forEach((key) => {
      if (formattedData[key] === null || formattedData[key] === "") {
        delete formattedData[key];
      }
    });

    const res = await axios.post(
      `https://borewell-service-production.onrender.com/admin/borewell-info/${customerNum}`,
      formattedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert("Borewell info submitted successfully ✅");
    console.log(res.data);
  } catch (err) {
    console.error(err.response?.data || err);
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