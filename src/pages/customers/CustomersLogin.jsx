import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
import "./CustomersLogin.css";
import { useAuth } from "../../services/AuthContext";

const CustomerLogin = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.phone !== formData.confirmPhone) {
      return alert("Phone numbers do not match");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://borewell-service-production.up.railway.app/customer-registrations/register",
        {
          name: formData.name.trim(),
          phoneNumber: formData.phone.trim(),
          password: formData.password,
        }
      );

      alert(response.data.message || "Registered Successfully");

      setIsRegister(false);
      setFormData({
        name: "",
        phone: formData.phone,
        confirmPhone: "",
        password: formData.password,
        confirmPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "https://borewell-service-production.onrender.com/customer-registrations/login",
        {
          phoneNumber: formData.phone.trim(),
          password: formData.password,
        }
      );

      const token = response.data.access_token;

      localStorage.setItem("customerToken", token);
      localStorage.setItem("customerPhone", formData.phone.trim());
      localStorage.setItem("customerName", response.data.customer_name);

      login("customer", token);

      alert("Login Successful");
      navigate("/customer/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader title={isRegister ? "Customer Register" : "Customer Login"} />

      <div className="auth-container">
        <div className="auth-card">
          <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

          <form onSubmit={isRegister ? handleRegister : handleLogin}>
            {isRegister && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
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

            {/* PASSWORD */}
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {isRegister && (
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            <button type="submit" disabled={loading}>
              {loading
                ? isRegister
                  ? "Creating..."
                  : "Logging in..."
                : isRegister
                ? "Register"
                : "Login"}
            </button>
          </form>

          <p onClick={() => setIsRegister(!isRegister)} className="toggle">
            {isRegister
              ? "Already have an account? Login"
              : "New user? Create account"}
          </p>
        </div>
      </div>

      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CustomerLogin;