import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Verified Workers",
      desc: "All our workers are experienced and verified professionals.",
    },
    {
      title: "Fast Response",
      desc: "Quick response and service within short time.",
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden charges. Clear and fair pricing.",
    },
    {
      title: "Trusted Service",
      desc: "Hundreds of customers trust our services daily.",
    },
    {
      title: "Wide Coverage",
      desc: "Service available in multiple locations.",
    },
    {
      title: "Complete Solutions",
      desc: "From drilling to repair and maintenance.",
    },
  ];

  return (
    <div className="why-container">
      <h2 className="why-title">Why Choose Us</h2>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;