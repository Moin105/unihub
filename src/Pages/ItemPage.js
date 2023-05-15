import React, { useEffect,useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import itemos from "./../Images/itemos.png";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import "./itempage.css";
import "../responsive.css";
import axios from "axios";
function ItemPage() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const data = location.state ? location.state.data : null;
  const [value, setValue] = useState(1);
  useEffect(() => {
    console.log(data)
  }, [])
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const BookRequest = async (token, product_id, quantity, currency) => {
    const url = 'http://34.233.35.208/api/book_product'; // Replace this with your API URL
   
    
    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('quantity', quantity);
    formData.append('currency', currency);
  
    console.log("formdata",formData)
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      },
    };
    try {
      const response = await axios.post(url, formData, config);
      return response.data;
    
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="itempage">
      <Header />
      <div className="wrapper">
        <h1 style={{textTransform:"capitalize"}}>{data?.name}</h1>
        <h5>{data.descreption}</h5>
        <div className="itemcontainer">
          <div className="item-row">
            <p className="price">Price</p>
            <span className="price-number">£{data.price}</span>
          </div>
          <figure>
            <img src={`http://34.233.35.208/${data.cover_img}`} />
          </figure>
          <div className="quantity-container">
            <p>Enter Quantity</p>
            <div className="quantity">
            <input type="number" value={value} onChange={handleChange} />
              <span>Available {data.stock} in stock</span>
            </div>
          </div>
          <div className="wallet-btn">
         
              {" "}
              <Button
              onClick={()=>{BookRequest(token,data.id,value,'usd')}}
                rightIcon={<MdArrowForward />}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
              >
                Add to Cart
              </Button>
  
          </div>
          {/* <div className="seller-row">
            <p></p>
            <span></span>chat-icon
          </div> */}
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
