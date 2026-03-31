import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import "./ImageSlider.css";

import img1 from "../assets/motorpumps.jpg";
import img2 from "../assets/bore.jpeg";
import img3 from "../assets/chain.jpeg";
import img4 from "../assets/camara.jpeg";
import img5 from "../assets/pipes.png";

const images = [img1, img2, img3, img4, img5];

const ImageSlider = () => {
  const [current, setCurrent] = useState(2);
  const navigate = useNavigate(); // ✅ init navigation

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // ✅ handle click
  const handleImageClick = () => {
    navigate("/request");
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">

        {/* LEFT ARROW */}
        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>

        {/* SLIDER */}
        <div
          className="slider"
          style={{
            transform: `translateX(-${current * 260}px)`
          }}
        >
          {images.map((img, index) => {
            let position = "next";

            if (index === current) position = "active";
            else if (
              index === current - 1 ||
              (current === 0 && index === images.length - 1)
            )
              position = "prev";

            return (
              <div className={`slide ${position}`} key={index}>
                <img
                  src={img}
                  alt="slide"
                  onClick={handleImageClick} // ✅ click added
                  style={{ cursor: "pointer" }} // UX improvement
                />
              </div>
            );
          })}
        </div>

        {/* RIGHT ARROW */}
        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>
      </div>

      {/* DOTS */}
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;