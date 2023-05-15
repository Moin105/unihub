import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import "./ticket.css";
import "../../responsive.css";

import { MdArrowForward } from "react-icons/md";
function Order() {
  return (
    <div className="tab-tickets">
      <h2>MyTickets</h2>
      <span className="upper">
        View your order history or check the status of a recent order.
      </span>
      {/* <p>Login email : Malik.h123@gmail.com</p> */}
      <span className="lower">You haven’t placed any orders yet.</span>
      <div className="primary-btn">
        <Button
          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
        >
          Start browsing
        </Button>
      </div>
    </div>
  );
}

export default Order;
