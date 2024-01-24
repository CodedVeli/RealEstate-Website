
import SwipeCarousel from "../framer/Slider";
import "./Home.css";
import SearchBar from "../components/SearchBar";
import HouseListing from "../components/HouseListing";

function Home() {
  return (
    <div className="header">
      <SwipeCarousel />
      <SearchBar/>
      <HouseListing />
    </div>
  );
}

export default Home;
