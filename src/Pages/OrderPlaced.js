import React ,{useEffect}from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./orderplaced.css";
import "../responsive.css";
import { useLocation ,useNavigate} from 'react-router-dom'
import axios from "axios";
function OrderPlaced() {
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  const navigate = useNavigate();
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  useEffect(() => {
    console.log("qwertyu",data)
    }, [])
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
