import React, { useState } from "react";
import "./Areas.css";
import image1 from "../assets/area1.jpeg";
import image2 from "../assets/area2.jpeg";
import image3 from "../assets/area3.png";
import image4 from "../assets/area4.jpg";
import image5 from "../assets/area5.jpeg";
const allAreas = [
  "Kukatpally","Miyapur","Gachibowli","Madhapur","Hitech City","Kondapur",
  "Ameerpet","Punjagutta","Banjara Hills","Jubilee Hills",
  "Uppal","Nagole","LB Nagar","Dilsukhnagar","Kothapet","Saroornagar",
  "Hayathnagar","Nacharam","Habsiguda","Boduppal",
  "Secunderabad","Begumpet","Somajiguda","Khairatabad","Mehdipatnam",
  "Masab Tank","Lakdikapul","Nampally","Abids","Koti",
  "Patancheru","Beeramguda","Bachupally","Nizampet","Chandanagar",
  "Lingampally","Tellapur","Kollur","Shamshabad","Adibatla"
];

const images = [
  image1,
  image2,
  image3,
  image4,
  image5
];

const Areas = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleAreas = showAll ? allAreas : allAreas.slice(0, 6);

  return (
    <section className="areas-section">
      <h2>Areas We Serve in Hyderabad</h2>
      <p className="subtitle">
        Providing borewell services across all major locations in Hyderabad
      </p>

      <div className="areas-grid">
        {visibleAreas.map((area, index) => (
          <div className="area-card" key={index}>
            <img src={images[index % images.length]} alt={area} />
            <div className="overlay">
              <h3>{area}</h3>
            </div>
          </div>
        ))}
      </div>

      <button className="see-more-btn" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Less" : "See More"}
      </button>
    </section>
  );
};

export default Areas;