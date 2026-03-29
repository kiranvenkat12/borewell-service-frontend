import { useNavigate } from "react-router-dom";
import "./AuthHeader.css";
import logo from "../assets/logo.png";

const AuthHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-header">
      
      <div className="auth-left">
        <img src={logo} alt="logo" className="auth-logo" />
      </div>

      <div className="auth-center">
        <h2>{title}</h2>
      </div>

      <div className="auth-right">
        <button onClick={() => navigate("/")}>Back</button>
      </div>

    </div>
  );
};

export default AuthHeader;