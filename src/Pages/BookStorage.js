import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./bookcleaner.css";
import "../responsive.css";
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
import cleaner from "./../Images/storages.png";
import { MdArrowForward } from "react-icons/md";
function BookStorage() {
  return (
    <div className="bookcleaner">
      <Header />
      <div className="wrapper">
        <h2>Book A Storage</h2>
        <figure>
          <img src={cleaner} />
        </figure>
        <h1>Coming Soon</h1>
        <div className="card-cleaner">
          <h4>Be the first to know</h4>
          <p>Subscribe to our newsletter to receive news and updates.</p>
        </div>
        <FormControl className="form-control">
          <p className="tag-label">Enter your email here</p>
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
              Email Address*
            </FormLabel>
            <Input
              variant="unstyled"
              border="none"
              type="email"
              fontSize="41px"
            />
          </Box>
        </FormControl>
        <div className="primary-btn">
          <Button
            rightIcon={<MdArrowForward />}
            bg="#7BB564"
            color={"white"}
            variant="solid"
            width={"100%"}
          >
            Subscribe
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookStorage;
