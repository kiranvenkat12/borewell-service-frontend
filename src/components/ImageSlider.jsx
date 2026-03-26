import { useEffect, useRef } from "react";
import "./ImageSlider.css";
import img1 from "../assets/hero.png";
import img2 from "../assets/react.svg";
import img3 from "../assets/vite.svg";

const images = [
  img1,
  img2,
  img3,
  "/images/work4.jpg",
  "/images/work5.jpg",
];

const ImageSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      slider.scrollLeft += slider.offsetWidth;

      // Reset to start when end reached
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <h2 className="slider-title">Our Work</h2>

      <div className="slider" ref={sliderRef}>
        {images.map((img, index) => (
          <div className="slide" key={index}>
            <img src={img} alt="work" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;