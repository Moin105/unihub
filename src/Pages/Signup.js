// screen 5
import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";

import apple from "../Images/apple.png";

import facebook from "../Images/facebook.png";

import google from "../Images/google.svg";
function Signup() {
  return (
    <div className="signup-page">
      <div className="container">
        <div className="headu">
          <figure>
            <img src={logo} alt="unihub-logo" />
          </figure>
          <h2>Create Your UNIHUB Account</h2>
        </div>
        <form>
          <div className="input-container">
            <input type="text" placeholder="Email Address" />
            {/* icon */}
          </div>
          <div className="input-container">
            <input type="text" placeholder="Password" />
            {/* icon */}
          </div>
          <span className="upspan">
            {" "}
            password must be at least 8 characters long contain a number{" "}
            <br></br>and an uppercase letter example
          </span>
          <button className="btn">Sign Up</button>
          <span className="downspan">Or continue with</span>
        </form>
        <div className="media-newhub">
          <div className="media-accounts">
            <figure>
              <img src={facebook} alt="facebook" />
            </figure>
            <figure>
              <img src={google} alt="google" />
            </figure>
            <figure>
              <img src={apple} alt="apple" />
            </figure>
          </div>
          <h3 className="new-to-unihub">
            Already Have an Account?{" "}
            <span>
              <Link to="/">Sign In</Link>
            </span>
          </h3>
          {/* <h3 >New to UNIHUB? <span>Sign Up</span></h3> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
