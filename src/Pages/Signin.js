// screen 1
import React from "react";
import "./signin.css";
import logo from "../Images/logo.png";

import apple from "../Images/apple.png";

import facebook from "../Images/facebook.png";
import { Link } from "react-router-dom";

import google from "../Images/google.svg";
import React,{useRef} from 'react'
import './signin.css'
import logo from '../Images/logo.png'
import apple from '../Images/apple.png'
import facebook from '../Images/facebook.png'
import { Link } from 'react-router-dom'
import google from '../Images/google.png'
import { useMutation } from 'react-query';
const baseUrl = process.env.BASE_URL;
export const login = async (formData) => {
  console.log("firstttt",formData)
  try {
    console.log("firstttssst")
    // Make a POST request to the login API endpoint with the form data
    const response = await fetch('http://34.233.35.208/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Handle error response from the server
      throw new Error('Failed to login');
    }

    // Parse the response as JSON and return it
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors that occur during the request
    throw new Error('Failed to login');
  }
};
function Signin() {
  const passwordRef = useRef();
const emailRef = useRef();

const handleSubmit = async (event) => {
  event.preventDefault();

  const password = passwordRef?.current?.value;
  const email = emailRef?.current?.value;
const data = {
  password: password,
  email: email,
};
console.log("data",data)  
  login(data)
// fetch('http://192.168.19.25:8000/api/login', {
//   method: 'POST',
//   headers:{
//     'Content-Type': 'application/json',
//   },
//   body:JSON.stringify(data),
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error('There was a problem with the API call:', error);
//   });  
  // const response = await fetch('https://example.com/api/data', {
  //   method: 'POST',
  //   body: JSON.stringify({ name, email }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // ...
};

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
          <span className="continue">Or continue with</span>
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
