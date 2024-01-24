import React from "react";
import "./About.css";
import photo6 from "../assets/img3.jpg";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

function About() {
  const aboutUs =
    "https://images.unsplash.com/photo-1628745750148-d7e23162d956?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="about">
      <div className="aboutimage">
        <img className="image" src={aboutUs} alt="" />
        <h1 className="abouttext">About Us</h1>
      </div>
      <div className="about1">
        <div className="first">
          <div className="mission">
            <h1>Our Mission</h1>
            <p>
              Our mission is to re-define the property development business{" "}
              <br />
              standards through impartiality and honesty. To make it easy for{" "}
              <br />
              our customers to become home owners with our flexible payment{" "}
              <br />
              plans at zero percent interest rates.
            </p>
          </div>
          <div className="vission">
            <h1>Our Vision</h1>
            <p>
              Our vision is to succeed, enabling our diverse team of valued{" "}
              <br />
              employees to hold great accountability towards our esteemed <br />
              customers. We aim high, with integrity, diversification, and{" "}
              <br />
              consistency.
            </p>
          </div>
        </div>
        <div className="sec">
          <div className="values">
            <h1>Our Values</h1>
            <p>
              Our service to our clients and partners is based on four pillars
              that <br /> define who we are and how we deliver our promise.{" "}
              <br />
              1.Creative and dynamic one-stop Real Estate solutions <br />{" "}
              2.Honest and fact-based strategies <br /> 3.Result oriented
              approach <br /> 4.Experienced and passionate team
            </p>
          </div>
          <div className="philosopy">
            <h1>Our Philosophy</h1>
            <p>
              Our philosophy is that success should be shared and will be <br />
              enhanced with team based approach characterized by mutual <br />
              understanding, enthusiasm and drive. This result orientated <br />
              approach ensures our clients are treated as partners and enables{" "}
              <br />
              both the business and service targets we set together to be <br />
              achieved.
            </p>
          </div>
        </div>
      </div>
      <div className="cardimage">
        <div className="image">
          <img className="lastimage" src={photo6} alt="building" />
        </div>
        <div className="form">
          <div className="formimage">
            <h1>
              Get in touch to purchase your <br /> dream house
            </h1>
          </div>
          <div className="name">
            <div className="firstname">
              <label>FirstName</label> <br />
              <input type="text" />
            </div>
            <div className="lastname">
              <label>LastName</label> <br />
              <input type="text" />
            </div>
          </div>
          <div className="em">
            <div className="email">
              <label>Email</label> <br />
              <input type="text" />
            </div>
            <div className="phone">
              <label>Phone num</label> <br />
              <input type="number" />
            </div>
          </div>
          <label>Message</label> <br />
          <input type="text" />
          <br />
          <br />
          <button className="button1">Send Email</button>
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

export default About;
