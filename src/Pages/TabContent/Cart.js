import React, { useEffect,useState } from "react";
import Header from "../../Components/Header";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ImBin } from "react-icons/im";
import { setProduct } from "../../features/paymentSlice";
import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import "./Cart.css";
import { fetchCart } from "../../thunks/cartThunk";
function Cart() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const product = useSelector((state) => state);
  const navigate = useNavigate()
  const [data,setData] = useState(null)
  const cartItems = useSelector((state) => state.cart.items.products);
  const handleRouteChange = (url,datas)  => {
    navigate(url, { state: { data: datas } });
  };
  const BookRequest = async (token, product_id, quantity, currency) => {
    const url = 'https://admin.myuni-hub.com/api/book_product'; // Replace this with your API URL
   if(data == null){
        toast.error("Please select a product")
        return
   }
    
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
  const addToWishlist = async (productId, quantity, token) => {
    const url = "https://admin.myuni-hub.com/api/wishlist";
    const headers = { Authorization: `Bearer ${token}` };
    const data = { id: productId, quantity: quantity };

    try {
      const response = await axios.post(url, data, { headers });
      toast.success(response.data.message);
      dispatch(fetchCart(token));
    } catch (error) {
      toast.error("Error adding product to wishlist: " + error);
    }
  };
  useEffect(() => {
    dispatch(fetchCart(token));
    console.log("cart", cartItems);
  }, []);

  return (
    <div className="cart">
      <Header />
      <div className="wrapper">
         <div style={{display:"flex",flexDirection:"column",gap:"20px",margin:`${cartItems && cartItems?.length > 0 ? '' : 'auto'}`}}>

        {cartItems && cartItems?.length > 0
          ? cartItems.map((item, index) => {
              return (
                <div className={`cart-container ${data?.id == item.id ? 'active-box' : null}`} key={index} onClick={()=>{setData(item)}}>
                  <figure>
                    <img
                      src={`https://admin.myuni-hub.com/${item.cover_img}`}
                    />
                  </figure>
                  <div className="cart-details">
                    <h2 className="product-name">{item.name}</h2>
                    <div className="details-row">
                      <h3 className="product-price">€{item.price}</h3>
                      <h3 className="product-quantity">
                        X{item.pivot.quantity}
                      </h3>
                      <span
                        className="delete"
                        onClick={() => {
                          addToWishlist(item.id, item.pivot.quantity, token);
                        }}
                      >
                        <ImBin />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          : <>
          <h1 style={{margin: "auto"}}>No Items In Cart</h1>
          </>}
       
       </div>
       {cartItems && cartItems?.length > 0 ?  <div className="primary-btn">
          <Button
            onClick={()=>{BookRequest(token,data?.id,data?.pivot?.quantity,'£')}}
            rightIcon={<MdArrowForward />}
            bg="#7BB564"
            color={"white"}
            variant="solid"
            width={"100%"}
          >
            Checkout
          </Button>
        </div>: null}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
