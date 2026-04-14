import Navbar from "../components/Navbar";
import RequestCard from "../components/RequestCard";
import ImageSlider from "../components/ImageSlider";
import StatsCounter from "../components/StatsCounter";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import SeoContent from "../components/SeoContent";
import "./Home.css";
import Areas from "../components/Areas";  
const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Banner />
      <ImageSlider />
      <StatsCounter />
      <Areas/>
      <WhyChooseUs />
      <SeoContent />
      <Footer />
    </div>
  );
};

export default Home;