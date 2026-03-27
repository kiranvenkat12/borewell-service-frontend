import React from "react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="banner">
      <div className="banner-overlay">
        <div className="banner-left">
          <h1 className="banner-title">
            Experience a <br />
            fresh way to <br />
            <span className="highlight-text">
              raise your bore well problem request
            </span>
          </h1>

          <p className="banner-description">
            Easily submit your borewell issues and get timely support with proper
            tracking and updates—all in one place.
          </p>
<button className="banner-button" onClick={() => navigate("/request")}>
  Raise Request
</button>
        </div>
      </div>
    </section>
  );
};

export default Banner;