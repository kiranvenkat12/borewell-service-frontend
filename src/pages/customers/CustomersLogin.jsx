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
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ REGISTER CUSTOMER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await registerCustomer(formData);

      alert(res.message || "Customer Registered Successfully");

      setIsRegister(false);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
    } catch (err) {
      alert(err.detail?.[0]?.msg || err.message || "Register failed");
    }
  };

  // ✅ LOGIN CUSTOMER
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginCustomer(formData);

      const token = res.access_token || res.token;
      if (!token) throw new Error("No token received");

      localStorage.setItem("customerToken", token);

      alert("Login Success");

      navigate("/customer/dashboard"); // 🔥 change route

    } catch (err) {
      alert(err.detail?.[0]?.msg || err.message || "Login failed");
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
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

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

          <p
            onClick={() => setIsRegister(!isRegister)}
            className="toggle"
          >
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

export default CustomerAuth;