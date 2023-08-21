// forget password screen 2

import React, { useState } from "react";
import "./ForgetPassword.css";
import "../responsive.css";
import logo from "../Images/logo.png";
import axios from "axios";

function ForgetPassword() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [otp ,setOtp] = useState('')
  const [showCp,setShowCp] = useState(false)
  const [password,setPassword] = useState('')
  const [cpassword,setCpassword] = useState('')
  const [token,setToken] = useState('')
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOtp = (e) => {
    setOtp(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }; const handleConfirmPassword = (e) => {
    setCpassword(e.target.value);
  };
  const forgotPassword = async (e) => {
    e.preventDefault()
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
        setShow(true);
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
  
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  const ConfirmOtp = async (e) => {
    e.preventDefault()
    // Email validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (otp == "") {
      console.error('Invalid email address');
      return false; // Return an error message or a status to the caller
    }
  
    try {
      const response = await axios.post('https://admin.myuni-hub.com/api/match_otp', {
        email: email,
        otp:otp // Sending email as the payload
      });

     console.log("otp",response.data)
      if (response.data.status == 200) {
        console.log('Password reset link sent successfully');
        setShowCp(true);
        setToken(response.data.token)
        return true; // Success! You can also return any relevant data from the response
      } 
    } catch (error) {
      console.error('An error occurred while sending the password reset link:', error);
      return false; // Return an error status or message to the caller
    }
  };
  const newPassowrd = async (e) => {
    e.preventDefault()
    // Email validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (password == "") {
      console.error('Invalid email address');
      return false; // Return an error message or a status to the caller
    } else if(cpassword == "") {
      console.error('Invalid email address');
      return false; // Return an error message or a status to the caller
    }
    else if(password !== cpassword) {
      console.error('Invalid ',password,cpassword);
      return false; // Return an error message or a status to the caller
    }
  
  
    try {
      const response = await axios.post('https://admin.myuni-hub.com/api/change_password', {
        password: password,
        confirm_password:cpassword // Sending email as the payload
      },config);
     console.log("otp",response.data)
      if (response.data.status == 200) {
        console.log('Password reset link sent successfully');
        setToken(response.data.token)
        setShowCp(true);
        return true; // Success! You can also return any relevant data from the response
      } 
    } catch (error) {
      console.error('An error occurred while sending the password reset link:', error);
      return false; // Return an error status or message to the caller
    }
  };
  
  
  
  
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
                  onClick={(e) => {
                    e.preventDefault()
                    forgotPassword(e)
                  }}
                >
                  Send Password Reset Link
                </button>
              </form>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
      {  showCp === false ?  <div className="middle-container">
                <span className="small-p">
                  Enter Otp {" "}
                </span>
              <form>
                <div className="input-container">
                  <input type="number" value={otp} onChange={(e)=>{handleOtp(e)}} placeholder="Enter Otp" />
                  {/* icon */}
                </div>
                <button className="btn"onClick={(e) => {
                    e.preventDefault()
                    ConfirmOtp(e)
                  }}>Confirm Otp</button>
              </form>
            </div>:<div className="middle-container">
            
              <form>
                <span className="small-p">
                  Enter New Password {" "}
          
                </span>
                <div className="input-container">
                  <input type="password" value={password} onChange={(e)=>{handlePassword(e)}} placeholder="Enter Password" />
                  {/* icon */}
                </div>
                <div className="input-container">
                  <input type="password" value={cpassword} onChange={(e)=>{handleConfirmPassword(e)}} placeholder="Confirm Password" />
                  {/* icon */}
                </div>
                <button className="btn" onClick={(e) => {
                    e.preventDefault()
                    newPassowrd(e)
                  }}>Submit</button>
              </form>
            </div>}
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
