import React, { useEffect,useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import profile from '../Images/froe.png'
import itemos from "./../Images/itemos.png";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useLocation,useNavigate } from "react-router-dom";
import { setProduct } from "../features/paymentSlice";
import { MdArrowForward } from "react-icons/md";
import {FaStar} from 'react-icons/fa'
import { useSelector,useDispatch } from "react-redux";
import chat from '../Images/Path 7166.png'
import "./itempage.css";
import "../responsive.css";
import axios from "axios";
import { toast } from "react-toastify";
import {fetchCart} from './../thunks/cartThunk'
function ItemPage() {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);;
  const data = location.state ? location.state.data : null;
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state);
  const sendData =()=>{
    handleRouteChange("/productpayment",{data:data,quantity:value,currency:"£"})
  }
  const handleRouteChange = (url,datas)  => {
    navigate(url, { state: { data: datas } });
  };
  useEffect(() => {
    console.log("monk",data)
  }, [])
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const BookRequest = async (token, product_id, quantity, currency) => {
    const url = 'https://admin.myuni-hub.com/api/book_product'; // Replace this with your API URL
   
    
    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('quantity', quantity);
    formData.append('currency', currency);
  
    console.log("formdata",data)
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      },
    };
    if(token){
    try {
      const response = await axios.post(url, formData, config);
     
      if(response.data.message === "Intent Generated Successfully!"){
        const datas ={response:response.data.intent,product:[data,{quantity:quantity,currency:currency}]}
        dispatch(setProduct(datas))
        console.log(product,)
        navigate('/order-booking');
        // handleRouteChange('/order-booking',{response:response.data,product:formData})
      return response.data;
      }
    } catch (error) {
      console.error(error);
    }}else{
      handleRouteChange("/productpayment",formData)
    }

  };

const addToWishlist =async (productId, quantity, token) => {
  const url = 'https://admin.myuni-hub.com/api/wishlist';
  const headers = { Authorization: `Bearer ${token}` };
  const data = {id: productId, quantity:quantity };

  try {
    const response = await axios.post(url, data, { headers });
    toast.success( response.data.message);
    dispatch(fetchCart(token))
  } catch (error) {
    toast.error('Error adding product to wishlist: ' + error);
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
            <img src={`https://admin.myuni-hub.com/${data.cover_img}`} />
          </figure>
          <div className="quantity-container">
            <p>Enter Quantity</p>
            <div className="quantity">
            <input type="number" value={value} onChange={handleChange} />
              <span>Available {data.stock} in stock</span>
            </div>
          </div>
          <div className="primary-btn">
         
              {" "}
           { token ?  <Button
              // onClick={()=>{BookRequest(token,data.id,value,'EUR')}}
              onClick={()=>{addToWishlist(data.id,value,token)}}
                rightIcon={<MdArrowForward />}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
              >
                Add to Cart
              </Button>:
              <Button
              onClick={()=>{sendData()}}
                rightIcon={<MdArrowForward />}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
              >
                Add to Cart
              </Button>
  }
          </div>
          <div className="seller-row">
            <p>Seller</p>
            <span style={{display:"flex"}} onClick={()=>{handleRouteChange('/messages')}}>Chat with seller <img src={chat}/></span>
          </div>
          <div className="seller-container">
            <div className="seller-box">
              <figure> <img src={data.user.profile_img ?`https://admin.myuni-hub.com/${data.user.profile_img}`:profile}/></figure>
              <span>{data.user.name}</span>
            </div>
            <div className="qwerty">
              <p style={{display:"flex"}}> <span style={{color:"#7BB564",margin:"2px 2px 0px 0px"}}><FaStar/></span> {data.rating_count == null ? 0 :data.rating_count}</p> | <span>{ data.reviews_count}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ItemPage;
