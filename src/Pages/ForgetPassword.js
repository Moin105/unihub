// forget password screen 2

import React, { useState } from "react";
import "./ForgetPassword.css";
import logo from "../Images/logo.png";

function ForgetPassword() {
  const [show, setShow] = useState(false);
  return (
    <div className="password-forget-page">
      <div className="container">
        <figure>
          <img src={logo} alt="unihub-logo" />
        </figure>
        {show === false ? (
          <React.Fragment>
            <div className="middle-container">
              <h2>Forget Your Password</h2>
              <span>
                Enter your email address and we will send you <br></br>A link to
                reset your password{" "}
              </span>
              <form>
                <div className="input-container">
                  <input type="text" placeholder="Email Address" />
                  {/* icon */}
                </div>
                <button
                  className="btn-forget"
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
              <h2>Forgot Your Password</h2>
              <span>
                Enter your email address and we will send you <br></br>A link to
                reset your password{" "}
              </span>
              <form>
                <div className="input-container">
                  <input type="text" placeholder="Password" />
                  {/* icon */}
                </div>
                <span className="smaller">
                  password must be at least 8 characters long contain a number{" "}
                  <br></br>and an uppercase letter example
                </span>
                <div className="input-container">
                  <input type="text" placeholder="Re-enter Password" />
                  {/* icon */}
                </div>
                <button className="btn-forget">Send Password Reset Link</button>
              </form>
            </div>
          </React.Fragment>
        )}
        <h3 className="new-to-unihub">
          Already Have an Account?{" "}
          <span>
            <a href="/">Sign In</a>
          </span>
        </h3>
      </div>
    </div>
  );
}

export default ForgetPassword;

// forget your password  screen 3
