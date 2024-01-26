import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LogIn.css";
import axios from "axios";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      console.log(response);
      toast.success("User logged in successfully");
      navigate("/profile");
    } catch (err) {
      toast.error("Error logging in");
      console.log(err);
    }
  };

  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const loginimage =
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="container6">
      <img src={loginimage} alt="mansion" />
      <div className="signup1">
        <div className="signin-card">
          <h2>Log In</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label> <br />
              <input
                type="email"
                id="email"
                value={email}
                onChange={onMutate}
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label> <br />
              <input
                type="password"
                id="password"
                value={password}
                onChange={onMutate}
                name="password"
                required
              />
            </div>
            <button type="submit" className="bt1">
              Log In
            </button>
          </form>
        </div>
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

export default LogIn;
