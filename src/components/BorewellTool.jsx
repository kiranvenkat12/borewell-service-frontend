import React, { useState } from "react";
import "./BorewellToll.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BorewellTool = () => {
  const [form, setForm] = useState({
    bore_depth: "",
    water_level: "",
    casing_diameter: "",
    floors_supply: "",
    electricity_supply: 1,
    usage_type: 1
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
  };

  // 🔥 VALIDATION FUNCTION
  const validate = () => {
    let newErrors = {};

    if (!form.bore_depth) newErrors.bore_depth = "Required";
    if (!form.water_level) newErrors.water_level = "Required";
    if (!form.casing_diameter) newErrors.casing_diameter = "Required";
    if (!form.floors_supply) newErrors.floors_supply = "Required";

    // Optional: basic sanity checks
    if (form.bore_depth <= 0) newErrors.bore_depth = "Invalid value";
    if (form.water_level < 0) newErrors.water_level = "Invalid value";
    if (form.casing_diameter <= 0) newErrors.casing_diameter = "Invalid value";
    if (form.floors_supply <= 0) newErrors.floors_supply = "Invalid value";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return; // 🚫 stop if invalid

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        "https://borewell-backend.onrender.com/service-requests/borewell",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...form,
            bore_depth: Number(form.bore_depth),
            water_level: Number(form.water_level),
            casing_diameter: Number(form.casing_diameter),
            floors_supply: Number(form.floors_supply)
          })
        }
      );

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Error connecting to server");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="tool-page">
        <div className="tool-container">
          <h2>Borewell Motor Suggestion</h2>

          <div className="form-grid">
            <div>
              <input type="number" name="bore_depth" placeholder="Bore Depth (ft)" onChange={handleChange} />
              {errors.bore_depth && <p className="error">{errors.bore_depth}</p>}
            </div>

            <div>
              <input type="number" name="water_level" placeholder="Water Level (ft)" onChange={handleChange} />
              {errors.water_level && <p className="error">{errors.water_level}</p>}
            </div>

            <div>
              <input type="number" name="casing_diameter" placeholder="Bore Diameter (inch)" onChange={handleChange} />
              {errors.casing_diameter && <p className="error">{errors.casing_diameter}</p>}
            </div>

            <div>
              <input type="number" name="floors_supply" placeholder="Floors" onChange={handleChange} />
              {errors.floors_supply && <p className="error">{errors.floors_supply}</p>}
            </div>

            <select name="electricity_supply" onChange={handleChange}>
              <option value={1}>Single Phase (230V)</option>
              <option value={2}>Three Phase (415V)</option>
            </select>

            <select name="usage_type" onChange={handleChange}>
              <option value={1}>Home</option>
              <option value={2}>Apartment</option>
              <option value={3}>Agriculture</option>
              <option value={4}>Industrial</option>
            </select>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            {loading ? "Calculating..." : "Get Recommendation"}
          </button>

          {result && (
            <div className="result-card">
              <h3>Recommendation</h3>

              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="result-row">
                  <span>{key}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BorewellTool;