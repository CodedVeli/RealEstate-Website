import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Property from "./pages/Property";
import Navbar from "./components/Navbar";
import PropertyDetails from "./components/PropertyDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/property" element={<Property />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
