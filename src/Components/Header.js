import React from "react";
import "./styles.css";
import "../App.css";
import logo from "../Images/logo.png";
import cart from "../Images/cart.png";
import user from "../Images/user.png";
import dropdown from "../Images/dropdown.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const token = useSelector((state) => state.auth.tokens); 
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <figure className="logo">
            <img src={logo} />
          </figure>
        </Link>
        <div className="nav">
          <Link to="/details">
            {" "}
            <figure className="media-icon">
              <img src={dropdown} />
            </figure>
          </Link>

          <figure className="media-icon">
            <img src={cart} />
          </figure>
          <Link to={token?"/home":"/login"}>
            <figure className="media-icon">
              <img src={user} />
            </figure>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
