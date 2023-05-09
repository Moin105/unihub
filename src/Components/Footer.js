import React from "react";
import "./footer.css";
import "../responsive.css";
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
              <li className="footer-link">Privacy Policy</li>
              <li className="footer-link">Contact Us</li>
              <li className="footer-link">About Us</li>
              <li className="footer-link">Services</li>
              <li className="footer-link">Terms & Conditions</li>
            </ul>
          </div>
          <div className="right">
            <h3>Latest From Our Blog</h3>
            <ul>
              <li className="footer-link">Blog Post 1</li>
              <li className="footer-link">Blog Post 2</li>
              <li className="footer-link">Blog Post 3</li>
              <li className="footer-link">Blog Post 4</li>
            </ul>
          </div>
        </div>
        <div className="divner">
          <div className="left">
            <h3>All copyrights are reserved by UNIHUB - 2023</h3>
          </div>
          <div className="right">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
