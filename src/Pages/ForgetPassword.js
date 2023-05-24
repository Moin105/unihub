// forget password screen 2

import React, { useState } from "react";
import "./ForgetPassword.css";
import "../responsive.css";
import logo from "../Images/logo.png";

function ForgetPassword() {
  const [show, setShow] = useState(false);
  return (
    <div className="password-forget-page">
      <div className="container">
        <div className="headu">
        <figure className="logo">
          <img src={logo} alt="unihub-logo" />
        </figure>
        <h2>Forgot Your Password</h2>

        </div>
        {show === false ? (
          <React.Fragment>
            <div className="middle-container">
              <span className="small-p">
                Enter your email address and we will send you A link to
                reset your password
              </span>
              <form>
                <div className="input-container">
                  <input type="text" placeholder="Email Address" />
                  {/* icon */}
                </div>
                <button
                  className="btn"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  Send Password Reset Link
                </button>
              </form>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="middle-container">
              <span className="small-p">
                Enter your email address and we will send you A link to
                reset your password{" "}
              </span>
              <form>
                <div className="input-container">
                  <input type="text" placeholder="Password" />
                  {/* icon */}
                </div>
                <span className="small-p">
                  password must be at least 8 characters long contain a number{" "}
                  <br></br>and an uppercase letter example
                </span>
                <div className="input-container">
                  <input type="text" placeholder="Re-enter Password" />
                  {/* icon */}
                </div>
                <button className="btn">Send Password Reset Link</button>
              </form>
            </div>
          </React.Fragment>
        )}
        <h3 className="new-to-unihub">
          Already Have an Account?{" "}
          <span>
            <a href="/login">Sign In</a>
          </span>
        </h3>
      </div>
    </div>
  );
}

export default ForgetPassword;

// forget your password  screen 3
