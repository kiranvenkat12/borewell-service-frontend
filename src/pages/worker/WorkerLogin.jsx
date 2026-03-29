import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
import "./WorkerAuth.css";

const WorkerLogin = () => {
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    confirmPhone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== REGISTER WORKER =====
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      if (formData.phone !== formData.confirmPhone) {
        alert("Phone numbers do not match");
        return;
      }

      const payload = {
        name: formData.name,
        phonenumber: formData.phone,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      };

      await axios.post("http://127.0.0.1:8000/worker-registers/workers", payload);
      alert("Worker registered successfully!");
      setIsRegister(false); // switch to login form
    } catch (err) {
      console.error("Registration failed", err);
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  // ===== LOGIN WORKER =====
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { phone, password } = formData;

      const res = await axios.post("http://127.0.0.1:8000/worker-registers/login", {
        phonenumber: phone,
        password,
      });

      // ✅ Save token and workerId properly
      localStorage.setItem("workerId", res.data.id);
      localStorage.setItem("workerToken", res.data.token);
      localStorage.setItem("workerName", res.data.name);

      navigate("/worker/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div>
      <AuthHeader title="Worker Access" />

      <div className="worker-auth-container">
        <div className="worker-auth-card">
          <h2>{isRegister ? "Worker Register" : "Worker Login"}</h2>

          <form onSubmit={isRegister ? handleRegister : handleLogin}>
            {isRegister && (
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {isRegister && (
              <input
                type="text"
                name="confirmPhone"
                placeholder="Confirm Phone Number *"
                value={formData.confirmPhone}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {isRegister && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            <button type="submit">{isRegister ? "Register" : "Login"}</button>
          </form>

          <p onClick={() => setIsRegister(!isRegister)} className="toggle">
            {isRegister ? "Already registered? Login" : "New worker? Register"}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorkerLogin;