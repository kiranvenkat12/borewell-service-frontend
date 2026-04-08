import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer, loginCustomer } from "../../services/customerService";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
import "./CustomersLogin.css";

const CustomerAuth = () => {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.phone !== formData.confirmPhone) {
      alert("Phone numbers do not match");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        phoneNumber: formData.phone.trim(),
        password: formData.password,
      };

      console.log("Register Payload:", payload);

      const res = await registerCustomer(payload);

      alert(res.message || "Registered Successfully");

      setIsRegister(false);
      setFormData({
        name: "",
        phone: "",
        confirmPhone: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.error("Register Error:", err.response?.data);
      alert(err.response?.data?.detail || err.message || "Registration failed");
    }
  };

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        phoneNumber: formData.phone.trim(),
        password: formData.password,
      };

      console.log("Login Payload:", payload);

      const res = await loginCustomer(payload);

      // Get JWT token from backend
      const token = res.access_token || res.token;
      if (!token) throw new Error("No token received");

      // Store token & phone number for future API calls
      localStorage.setItem("customerToken", token);
      localStorage.setItem("customerPhone", formData.phone.trim());

      alert("Login Successful");

      // Navigate to dashboard
      navigate("/customer/dashboard");

    } catch (err) {
      console.error("Login Error:", err.response?.data);
      alert(err.response?.data?.detail || "Invalid phone number or password");
    }
  };

  return (
    <>
      <AuthHeader title={isRegister ? "Customer Register" : "Customer Login"} />

      <div className="auth-container">
        <div className="auth-card">
          <h2>{isRegister ? "Customer Register" : "Customer Login"}</h2>

          <form onSubmit={isRegister ? handleRegister : handleLogin}>
            {isRegister && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="confirmPhone"
                  placeholder="Confirm Phone Number"
                  value={formData.confirmPhone}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            {!isRegister && (
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {isRegister && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            <button type="submit">{isRegister ? "Register" : "Login"}</button>
          </form>

          <p onClick={() => setIsRegister(!isRegister)} className="toggle">
            {isRegister
              ? "Already registered? Login here"
              : "New customer? Register first"}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CustomerLogin;