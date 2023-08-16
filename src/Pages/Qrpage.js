import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./orderplaced.css";
import "../responsive.css";
import qr from "../Images/qr.png";
import QRCode from 'qrcode.react';
import { useLocation } from "react-router-dom";
function Qrpage() {
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  console.log("qr",data)
  return (
    <>
      <div className="orderplaced-page">
        <Header />
        <div className="wrapper">
          <h2>QR Code</h2>
          {/* <figure> */}
            {/* <img src={qr} /> */}
            <QRCode value={`https://admin.myuni-hub.com/api/${data}`}  width={'30%'} height={'30%'}/>

          {/* </figure> */}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Qrpage;
