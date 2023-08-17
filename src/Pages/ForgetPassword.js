// forget password screen 2

import React, { useState } from "react";
import "./ForgetPassword.css";
import "../responsive.css";
import logo from "../Images/logo.png";
import axios from "axios";

function ForgetPassword() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const forgotPassword = async (email) => {
    // Email validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email address');
      return false; // Return an error message or a status to the caller
    }
  
    try {
      const response = await axios.post('https://admin.myuni-hub.com/api/forget_password', {
        email: email // Sending email as the payload
      });
  
      if (response.data.status === 200) {
        console.log('Password reset link sent successfully');
        return true; // Success! You can also return any relevant data from the response
      } else {
        console.error('Error sending password reset link:', response.status);
        return false; // Return an error status or message to the caller
      }
    } catch (error) {
      console.error('An error occurred while sending the password reset link:', error);
      return false; // Return an error status or message to the caller
    }
  };
  
  // Example usage:
  forgotPassword('example@example.com')
    .then(success => {
      if (success) {
        setShow(false);
        console.log('Check your email for the reset link');
      } else {
        console.log('An error occurred, please try again');
      }
    });
 
  
  
  
  
  
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
                  <input type="text" onChange={(e)=>{handleEmail(e)}} value={email} placeholder="Email Address" />
                  {/* icon */}
                </div>
                <button
                  className="btn"
                  onClick={() => {
                  
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
