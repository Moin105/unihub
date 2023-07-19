// screen 5
import React, { useState, useEffect } from "react";
import "./signup.css";
import "../responsive.css";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import apple from "../Images/apple.png";
import facebook from "../Images/facebook.png";
import google from "../Images/google.svg";
// import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { signUp } from "../apis/UserApi";
import { signUpUser } from "../thunks/userThunks";
import { toast } from "react-toastify";
function Signup() {
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "1",
  });
  const [universities, setUniversities] = useState(null);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password must be same");
    } else if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
    } else if (
      formData.confirmPassword == "" ||
      formData.password == "" ||
      formData.email == "" ||
      formData.name == ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      dispatch(signUpUser(formData));
    }
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="headu">
          <Link to="/">
            <figure className="logo">
              <img src={logo} alt="unihub-logo" />
            </figure>{" "}
          </Link>
          <h2>Create Your UNIHUB Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="name"
              type="text"
              placeholder="Name"
            />
            {/* icon */}
          </div>
          <div className="input-container">
            <input
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="email"
              type="text"
              placeholder="Email Address"
            />
            {/* icon */}
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              onChange={(e) => {
                handleInputChange(e);
              }}
              placeholder="Password"
            />
            {/* icon */}
          </div>

          <div className="input-container">
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => {
                handleInputChange(e);
              }}
              placeholder="Confirm Password"
            />
            {/* icon */}
          </div>
          <span className="upspan">
            Password must be at least 8 characters long contain a number and an
            uppercase letter example
          </span>
          <button className="btn">Sign Up</button>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {user && <p>Welcome, {user.name}!</p>}
        </form>
        <div className="media-newhub">
          <span className="downspan">Or continue with</span>
          <div className="media-accounts">
            <figure className="media-icon">
              <img src={facebook} alt="facebook" />
            </figure>
            <figure className="media-icon">
              <img src={google} alt="google" />
            </figure>
            <figure className="media-icon">
              <img src={apple} alt="apple" />
            </figure>
          </div>
          <h3 className="new-to-unihub">
            Already Have an Account?
            <span>
              <Link to="/login">Sign In</Link>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Signup;
