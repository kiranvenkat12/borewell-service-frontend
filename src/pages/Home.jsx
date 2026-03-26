import Navbar from "../components/Navbar";
import RequestCard from "../components/RequestCard";
import ImageSlider from "../components/ImageSlider";
import StatsCounter from "../components/StatsCounter";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <RequestCard />
      <ImageSlider />
      <StatsCounter />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Home;