import React, { useState } from "react";
import "./Areas.css";

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
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
  "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
  "https://images.unsplash.com/photo-1581092335397-9583eb92d232",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
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