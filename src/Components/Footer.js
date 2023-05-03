import React from "react";
import "./footer.css";

// import logo from '../Images/logo.png'
// import logo from ''
import apple from "../Images/apple.png";

import facebook from "../Images/facebook.png";

import google from "../Images/google.svg";
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="diver">
          <div className="left">
            <h3>Important Links</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Services</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div className="right">
            <h3>Latest From Our Blog</h3>
            <ul>
              <li>Blog Post 1</li>
              <li>Blog Post 2</li>
              <li>Blog Post 3</li>
              <li>Blog Post 4</li>
            </ul>
          </div>
        </div>
        <div className="divner">
          <div className="left">
            <h3>All copyrights are reserved by UNIHUB - 2023</h3>
          </div>
          <div className="right">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
