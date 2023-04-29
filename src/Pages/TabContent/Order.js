import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,Textarea,
  Box,Button
} from "@chakra-ui/react";
import "./order.css";
import filter from '../../Images/filter.png'
import {MdArrowForward} from 'react-icons/md'
// import Rating from "../../Components/Rating";
// import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function Order() {
  const [show, setShow] = useState(true)
  const [hide ,setHide ] = useState(true)
  return (
    <React.Fragment>

    
{   hide === true ?
   <div className="tab-order">
      <h2>My Orders</h2>
      <span className="upper">View your order history or check the status of a recent order.</span>
      {/* <p>Login email : Malik.h123@gmail.com</p> */}
   {show ?   <React.Fragment>
      <span className="lower">You haven’t placed any orders yet.</span>
      <div className="order-btn">
      <Button onClick={()=>{setShow(false)}} rightIcon={<MdArrowForward />} bg='#7BB564'color={"white"} variant='solid' width={"100%"}>
      Start browsing 
  </Button>
      </div>
      </React.Fragment>:
      <React.Fragment>
        <div className="row">
             <p>All Sales</p>
             <figure>
               <img src={filter}/>
             </figure>
        </div>
        <div className="order-btn">
      <Button onClick={()=>{setHide(false)}} rightIcon={<MdArrowForward />} bg='#7BB564'color={"white"} variant='solid' width={"100%"}>
      Start browsing 
  </Button>
      </div>
      </React.Fragment>}

      {/* <FormControl>
        <Box border="1px solid #7BB564" borderRadius={30} marginTop="103px">
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Name
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            type="email"
            fontSize="41px"
          />
        </Box>
        <Box border="1px solid #7BB564" borderRadius={30} marginTop="103px">
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Email address
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            type="email"
            fontSize="41px"
          />
        </Box>
        <Box border="1px solid #7BB564" borderRadius={30} marginTop="103px">
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Address
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            type="email"
            fontSize="41px"
          />
        </Box>
        <Box border="1px solid #7BB564" borderRadius={30} marginTop="103px">
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Phone
          </FormLabel>
          <Input variant="unstyled" border="none" type="tel" fontSize="41px" />
        </Box>
      </FormControl> */}
   
    </div> :
      <React.Fragment>
         <div className="tab-order">
       <h2>Order Summery</h2>
       <p className="order-details">wqd</p>
       <h4 className="heading">qwdqw</h4>
       <h4 className="heading">wqdqw</h4>
       <p className="price"> qwdw </p>
       <React.Fragment>
       <h4 className="heading">Rating</h4>
       {/* <Rating
        size={48}
        icon="star"
        scale={5}
        fillColor="#7BB564"
        strokeColor="transparent"
      />
      <CSSReset/> */}
       <h4 className="heading">Feedback</h4>
       <FormControl className="form-control">
       <Box className="input-container" border="1px solid #7BB564" borderRadius={30} marginTop="103px">
          <FormLabel
          
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Name
          </FormLabel>
          <Textarea placeholder="Enter text here" 
           variant="unstyled"
           width="870px"
           marginTop="30px"
           className="input"
           border="none"
           fontSize="41px" />
        </Box>
        </FormControl>
       </React.Fragment>
       <div className="order-btn">
      <Button onClick={()=>{setHide(false)}} rightIcon={<MdArrowForward />} bg='#7BB564'color={"white"} variant='solid' width={"100%"}>
      Rate your order
  </Button>
  <h4 className="support">Having issue with the order<span className="price">  Contact Support?</span></h4>
      </div>
       </div>
     </React.Fragment>}
     </React.Fragment>
  );
}

export default Order;
