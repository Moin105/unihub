import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./orderplaced.css";
import "../responsive.css";
import qr from "../Images/qr.png";
function Qrpage() {
  return (
    <>
      <div className="orderplaced-page">
        <Header />
        <div className="wrapper">
          <h2>QR Code</h2>
          <figure>
            <img src={qr} />
          </figure>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Qrpage;
