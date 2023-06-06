import React, { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import "./checkout.css";
import Header from "../Components/Header";

const fetchData = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
};

function CheckOutPage() {
  const productData = useSelector((state) => state.product);

  const location = useLocation();
  const url = "https://admin.myuni-hub.com/api/get_cards";
  const token = useSelector((state) => state.auth.token);
  const data = location.state ? location.state.data : null;
  const navigate = useNavigate();
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  const postData = async (url, token, data) => {
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
        return null;
    }
}
const handlecheckout = ()=>{
  postData("https://admin.myuni-hub.com/api/confirm_payment",token,{payment_intent:productData.response,address:data?.address,phone:data?.phone})
}
  const [card, setCard] = useState(null)
  useEffect(() => {
    console.log("payment details", data,productData.response);
    fetchData(url, token).then((data) =>  {setCard(prevState =>{
      prevState = data.cards
      return prevState;
    }); console.log(data.cards)});
  }, []);
  return (
    <>
      <div className="bookingsummary">
        <Header />
        <div className="wrapper">
          <h2>Checkout</h2>
          {/* <p>Confirm your booking details</p> */}
          <div className="summary">
            <h2>Payment</h2>
            <h3>{productData.product[0].name}</h3>
            <h3>Quantity {productData.product[1].quantity}</h3>
            <p>{` ${productData.product[0].price}  ${productData.product[1]?.currency}`}</p>
          </div>
          <div className="summarys">
            <p>Payment Details</p>
            <div className="cards-container">
              {
                card?.map(item=>{
               return     <div className="card-row">
                <div className="card"></div>
                <div className="card-text"><h3>{item.brand}</h3><p> &#8226;&#8226;&#8226;&#8226;{item.last_digit}</p></div>
                <div className="check"></div>
              </div>
                })
              }
            
            </div>
          </div>
          <div className="primary-btn">
            {" "}
            <Button
              onClick={() => {
                handlecheckout()
              }}
              bg="#7BB564"
              color={"white"}
              variant="solid"
              width={"100%"}
            >
              Pay
            </Button>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default CheckOutPage;
