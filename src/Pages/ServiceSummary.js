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
function ServiceSummary() {
  const serviceData = useSelector((state) => state.service);
  const location = useLocation();
  const userData = useSelector((state)=> state.user.user)
  const token = useSelector((state) => state.auth.token);
  const data = location.state ? location.state.data : null;
  const navigate = useNavigate();
  const [phone,setPhone] = useState('')
  const [address,setAddress] = useState('')
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  const conster = useSelector((state)=> state)
  useEffect(() => {
    console.log("payment details",conster );
    console.log("which scenario", data);
  }, []);
  return (
    <>
      <div className="bookingsummary">
        <Header />
        <div className="wrapper">
          <h2>Order Summary</h2>
          <p>Confirm your booking details</p>
          <div className="summary">
               <h3>Title : { serviceData?.datas.selectedOption.title}</h3>
               <h3>Date : { serviceData?.value?.toDateString()}</h3>
               <p style={{display:"flex",alignItems:"flex-start"}}> <h3 style={{color:"black",padding:"0px 10px 0px 0px"}}>Price :</h3> {`${serviceData?.datas.selectedOption.price}  ${serviceData?.currency}`}</p>
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
      Name
    </FormLabel>
    <Input
     value={userData.name}
    //  onChange={(e) => setAddress(e.target.value)}
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
      Email Address
    </FormLabel>
    <Input
      variant="unstyled"
      value={userData.email}
      // onChange={(e) => setPhone(e.target.value)}
      border="none"
      readOnly
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
      Address
    </FormLabel>
    <Input
      variant="unstyled"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
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
          if(phone == ""  ){
            toast.error("Please add Phone Number");
          }else if(address == ''){
            toast.error("Please add Address");
          } else{

            handleRouteChange("/checkout",{phone,"type":"service"})}}
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

export default ServiceSummary;
