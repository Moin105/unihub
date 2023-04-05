import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,Button
} from "@chakra-ui/react";
import "./order.css";
import filter from '../../Images/filter.png'
import {MdArrowForward} from 'react-icons/md'
function Order() {
  const [show, setShow] = useState(true)
  return (
    <div className="tab-order">
      <h2>My Orders</h2>
      <span className="upper">View your order history or check the status of a recent order.</span>
      {/* <p>Login email : Malik.h123@gmail.com</p> */}
   {show ?   <React.Fragment>
      <span className="lower">You haven’t placed any orders yet.</span>
      </React.Fragment>:
      <React.Fragment>
        <div className="row">
             <p>All Sales</p>
             <figure>
               <img src={filter}/>
             </figure>
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
      <div className="order-btn">
      <Button onClick={()=>{setShow(false)}} rightIcon={<MdArrowForward />} bg='#7BB564'color={"white"} variant='solid' width={"100%"}>
      Start browsing 
  </Button>
      </div>
    </div>
  );
}

export default Order;
