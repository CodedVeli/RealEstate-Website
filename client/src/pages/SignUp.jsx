import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignUp.css";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const { name, email, password, role } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = {
      name,
      email,
      password,
      role,
    };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      const result = await response.json();
      toast.success("User created successfully");
      navigate("/login");
      return result;
    } catch (err) {
      console.log(err);
      toast.error("Error creating user");
    }
  };

  const onMutate = (e) => {
    let boolean = null;
    if (e.target.name === "true") {
      boolean = true;
    } else if (e.target.name === "false") {
      boolean = false;
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: boolean || e.target.value,
    }));
  };

  const signupimage =
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="container5">
      <img src={signupimage} alt="mansion" />
      <div className="signup1">
        <div className="signin-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name"> Name</label> <br />
              <input
                type="text"
                id="name"
                onChange={onMutate}
                value={name}
                name="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label> <br />
              <input
                type="email"
                id="email"
                onChange={onMutate}
                value={email}
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label> <br />
              <input
                type="password"
                value={password}
                onChange={onMutate}
                id="password"
                name="password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label> <br />
              <select id="role" name="role" onChange={onMutate} value={role}>
                <option value="user">User</option>
                <option value="owner">Owner</option>
              </select>
            </div>

            <button type="submit" className="bt1">
              Sign Up
            </button>
          </form>
          <p className="login-link">
            Already registered?{" "}
            <a href="/login" className="link">
              Log in
            </a>
          </p>
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

export default SignUp;
