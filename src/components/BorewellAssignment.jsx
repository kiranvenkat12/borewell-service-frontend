import { useState } from "react";
import axios from "axios";
import "./BorewellAssignment.css";

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

    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.post(
        `http://localhost:8000/admin/borewell-info/${customerNum}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Borewell info submitted successfully ✅");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting data ❌");
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