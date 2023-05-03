// screen 1
import React from "react";
import "./signin.css";
import logo from "../Images/logo.png";

import apple from "../Images/apple.png";

import facebook from "../Images/facebook.png";
import { Link } from "react-router-dom";

import google from "../Images/google.svg";
function Signin() {
  return (
    <div className="signin-page">
      <div className="container">
        <div className="headu">
          <figure>
            <img src={logo} alt="unihub-logo" />
          </figure>
          <h2>Sign in to Continue</h2>
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
          <span className="forgetti-password">
            <Link to="/forgetpassword">Forget Password?</Link>
          </span>
          <Link to="/Home">
            <button className="btn">Sign in</button>
          </Link>
        </form>
        <div className="media-newhub">
          <span className="continue">Or continue with</span>
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
            New to UNIHUB?{" "}
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Signin;
