import SwipeCarousel from "../framer/Slider";
import "./Home.css";
import SearchBar from "../components/SearchBar";
import HouseListing from "../components/HouseListing";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

function Home() {
  return (
    <div className="home">
      <div className="header">
        <SwipeCarousel />
        <SearchBar />
        <HouseListing />
      </div>
      <div className="footer">
        <div className="contact1">
          <h1>Contact</h1>
          <p>Westlands,Nairobi Kenya</p>
          <p>P.O Box 20227 - 00100</p>
          <p>Nairobi Kenya</p>
          <p>+254700000000</p>
        </div>
        <div className="connect">
          <h1>Connect</h1>
          <div className="ic">
            <h1>
              <FaInstagram />
            </h1>
            <h1>
              <FaSquareXTwitter />
            </h1>
            <h1>
              <FaFacebook />
            </h1>
          </div>
        </div>
        <div className="explore">
          <h1>Explore</h1>
          <p>For Sale</p>
          <p>For Rent</p>
          <p>News</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
