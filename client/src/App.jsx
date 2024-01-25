import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Property from "./pages/Property";
import Navbar from "./components/Navbar";
import PropertyDetails from "./components/PropertyDetails";
import CreateListing from "./pages/CreateListing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
       <ToastContainer />  
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/property" element={<Property />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/create" element={<CreateListing />} />
        </Routes>
      </Router>
       
    </div>
  );
}

export default App;
