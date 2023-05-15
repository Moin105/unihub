import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./orderplaced.css";
import "../responsive.css";

function OrderPlaced() {
  return (
    <>
      <div className="orderplaced-page">
        <Header />
        <div className="wrapper">
          <h2>Order Placed!</h2>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default OrderPlaced;
