import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import itemos from "./../Images/itemos.png";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import "./itempage.css";
import "../responsive.css";
function ItemPage() {
  return (
    <div className="itempage">
      <Header />
      <div className="wrapper">
        <h1>Drinks</h1>
        <h5>Kirkland Still Water</h5>
        <div className="itemcontainer">
          <div className="item-row">
            <p className="price">Price</p>
            <span className="price-number">£10.00</span>
          </div>
          <figure>
            <img src={itemos} />
          </figure>
          <div className="quantity-container">
            <p>Enter Quantity</p>
            <div className="quantity">
              <div>1</div>
              <span>Available 100 in stock</span>
            </div>
          </div>
          <div className="wallet-btn">
            <Link to="/sellerdetails">
              {" "}
              <Button
                rightIcon={<MdArrowForward />}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
              >
                Subscribe
              </Button>
            </Link>
          </div>
          <div className="seller-row">
            <p></p>
            <span></span>chat-icon
          </div>
          <div className="seller-container">
            <div className="seller-box">
              <figure>{/* <img/> */}</figure>
              <span></span>
            </div>
            <div className="qwerty">
              <p></p> | <span></span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemPage;
