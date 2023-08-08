import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import './bookingsummary.css'
import Header from "../Components/Header";
import {toast} from 'react-toastify'
function BookingSummary() {
  const productData = useSelector((state) => state.product);

  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const data = location.state ? location.state.data : null;
  const navigate = useNavigate();
  const [phone,setPhone] = useState('')
  const [address,setAddress] = useState('')
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  useEffect(() => {
    console.log("payment details", productData);    console.log("which scenario", data);
  }, []);
  return (
    <>
      <div className="bookingsummary">
        <Header />
        <div className="wrapper">
          <h2>Order Summary</h2>
          <p>Confirm your booking details</p>
          <div className="summary">
               <h3>{ productData.product[0].name}</h3>
               <h3>Quantity { productData.product[1].quantity}</h3>
               <p>{` ${productData.product[0].price}  ${productData.product[1]?.currency}`}</p>
          </div> 
     <h2>Order Confirmation</h2>     
          <FormControl className="form-control">
  <Box
    className="input-container"
    border="1px solid #7BB564"
    borderRadius={30}
    marginTop="103px"
  >
    <FormLabel
      padding="20px 0px 0px 20px"
      fontSize="37px"
      fontWeight={300}
    >
      Address
    </FormLabel>
    <Input
     value={address}
     onChange={(e) => setAddress(e.target.value)}
      variant="unstyled"
      border="none"
      type="text"
      fontSize="41px"
    />
  </Box>

  <Box
    className="input-container"
    border="1px solid #7BB564"
    borderRadius={30}
    marginTop="103px"
  >
    <FormLabel
      padding="20px 0px 0px 20px"
      fontSize="37px"
      fontWeight={300}
    >
      Phone
    </FormLabel>
    <Input
      variant="unstyled"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      border="none"
      type="number"
      fontSize="41px"
    />
  </Box>

</FormControl>
          <div className="primary-btn">
         
         {" "}
               <Button
         onClick={()=>{ 
          if(phone == "" || address == ""){
            toast.error("Please fill all the fields");
          }else{

            handleRouteChange("/checkout",{phone,address,"type":"product"})}}
          }
          
           
           bg="#7BB564"
           color={"white"}
           variant="solid"
           width={"100%"}
         >
           Next
         </Button>
     </div>
        </div>{" "}
      </div>
    </>
  );
}

export default BookingSummary;
