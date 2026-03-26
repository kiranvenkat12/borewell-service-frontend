import { useState } from "react";
import { registerAdmin, loginAdmin } from "../../services/adminService";
import "./AdminAuth.css";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
const AdminLogin = () => {
  const [isRegister, setIsRegister] = useState(true);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerAdmin(formData);
      alert(res.message);
      setIsRegister(false); // switch to login
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(formData);
      alert("Login Success");
      console.log(res);
    } catch (err) {
      alert(err.message);
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
                onChange={handleChange}
              />

              <input
                type="text"
                name="adminId"
                placeholder="Admin ID"
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          )}

          <button type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p onClick={() => setIsRegister(!isRegister)} className="toggle">
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