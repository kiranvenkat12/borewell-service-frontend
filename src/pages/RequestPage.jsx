import RequestCard from  "../components/RequestCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const RequestPage = () => {
  return (
    <div className="request-page-container">    
        <Navbar />
        <RequestCard />
        <Footer />

    </div>
  );
}       

export default RequestPage;
