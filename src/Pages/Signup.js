// screen 5
import React,{useState} from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import apple from "../Images/apple.png";
import facebook from "../Images/facebook.png";
import google from "../Images/google.svg";
// import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { signUp } from "../apis/UserApi";
import { signUpUser } from "../thunks/userThunks";
function Signup() {
  
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpUser(formData));
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="headu">
          <figure>
            <img src={logo} alt="unihub-logo" />
          </figure>
          <h2>Create Your UNIHUB Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input onChange={(e)=>{handleInputChange(e)}} name="name" type="text" placeholder="Name" />
            {/* icon */}
          </div>
          <div className="input-container">
            <input onChange={(e)=>{handleInputChange(e)}} name="email" type="text" placeholder="Email Address" />
            {/* icon */}
          </div>
          <div className="input-container">
            <input type="password" name="password" onChange={(e)=>{handleInputChange(e)}} placeholder="Password" />
            {/* icon */}
          </div>
          <div className="input-container">
            <input type="password" name="confirmPassword" onChange={(e)=>{handleInputChange(e)}} placeholder="Confirm Password" />
            {/* icon */}
          </div>
          <span className="upspan">
            {" "}
            password must be at least 8 characters long contain a number{" "}
            <br></br>and an uppercase letter example
          </span>
          <button className="btn">Sign Up</button>
          <span className="downspan">Or continue with</span>
          {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {user && <p>Welcome, {user.name}!</p>}
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
