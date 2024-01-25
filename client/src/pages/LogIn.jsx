import React from "react";
import "./LogIn.css";

function LogIn() {
  const loginimage =
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="container6">
      <img src={loginimage} alt="mansion" />
      <div className="signup1">
        <div className="signin-card">
          <h2>Log In</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label> <br />
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label> <br />
              <input type="password" id="password" name="password" />
            </div>
            <button type="submit" className="bt1">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
