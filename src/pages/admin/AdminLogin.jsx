import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin, loginAdmin } from "../../services/adminService";
import "./AdminAuth.css";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";

const AdminLogin = () => {
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminId: "",
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await registerAdmin(formData);

      alert(res.message || "Registered successfully");

      // switch to login
      setIsRegister(false);

      // clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        adminId: "",
      });
    } catch (err) {
      alert(err.detail?.[0]?.msg || err.message || "Register failed");
    }
  };

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginAdmin(formData);

      // 🔥 Extract token (FastAPI usually gives access_token)
      const token = res.access_token || res.token;
      if (!token) throw new Error("No token received from backend");

      // 🔥 Store token
      localStorage.setItem("adminToken", token);
      alert("Login Success");

      // ✅ Navigate using React Router
      navigate("/admin/dashboard");

    } catch (err) {
      alert(err.detail?.[0]?.msg || err.message || "Login failed");
    }
  };

  return (
    <>
      <AuthHeader title={isRegister ? "Admin Register" : "Admin Login"} />

      <div className="auth-container">
        <div className="auth-card">
          <h2>{isRegister ? "Admin Register" : "Admin Login"}</h2>

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
                  name="adminId"
                  placeholder="Admin ID"
                  value={formData.adminId}
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
            style={{ cursor: "pointer" }}
          >
            {isRegister
              ? "Already registered? Login here"
              : "New admin? Register first"}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminLogin;