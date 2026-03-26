import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";
import { registerWorker, loginWorker } from "../../services/workerService";
import "./WorkerAuth.css";
import Footer from "../../components/Footer";
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerWorker(formData);
      alert(res.message);
      setIsRegister(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔥 Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginWorker(formData);
      alert("Login Success");
      console.log(res);

      navigate("/worker/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <AuthHeader title="Worker Access" />

      <div className="worker-auth-container">
        <div className="worker-auth-card">

          <h2>{isRegister ? "Worker Register" : "Worker Login"}</h2>

          <form onSubmit={isRegister ? handleRegister : handleLogin}>

            {/* Name */}
            {isRegister && (
              <input
                type="text"
                name="name"
                placeholder="Name *"
                onChange={handleChange}
              />
            )}

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              onChange={handleChange}
            />

            {/* Confirm Phone */}
            {isRegister && (
              <input
                type="text"
                name="confirmPhone"
                placeholder="Confirm Phone Number *"
                onChange={handleChange}
              />
            )}

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password *"
              onChange={handleChange}
            />

            {/* Confirm Password */}
            {isRegister && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                onChange={handleChange}
              />
            )}

            <button type="submit">
              {isRegister ? "Register" : "Login"}
            </button>

          </form>

          <p onClick={() => setIsRegister(!isRegister)} className="toggle">
            {isRegister
              ? "Already registered? Login"
              : "New worker? Register"}
          </p>


        </div>

        
      </div>
      <Footer />
    </div>

              
  );
};

export default WorkerLogin;