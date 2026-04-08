import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
import "./CustomersLogin.css";
import { useAuth } from "../../services/AuthContext";

const CustomerLogin = () => {
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      return alert("Phone numbers do not match");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const payload = {
        name: formData.name.trim(),
        phoneNumber: formData.phone.trim(),
        password: formData.password,
      };

      const response = await axios.post(
        "https://borewell-service-production.up.railway.app/customer-registrations/register",
        payload
      );

      console.log("Register Response:", response.data);

      alert(response.data.message || "Registered Successfully");

      setIsRegister(false);
      setFormData({
        name: "",
        phone: "",
        confirmPhone: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.error("Register Error:", err);
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://borewell-service-production.up.railway.app/customer-registrations/login",
        {
          phoneNumber: formData.phone.trim(),
          password: formData.password,
        }
      );

      console.log("Login Response:", response.data);

      const token = response.data.access_token;

      if (!token) {
        return alert("No token received");
      }

      // ✅ store
      localStorage.setItem("customerToken", token);
      localStorage.setItem("customerPhone", formData.phone.trim());

      login("customer", token);

      alert("Login Successful");
      navigate("/customer/dashboard");

    } catch (err) {
      console.error("Login Error:", err);
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

            <button type="submit">
              {isRegister ? "Register" : "Login"}
            </button>
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