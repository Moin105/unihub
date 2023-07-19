import React, { useState } from "react";
import Header from "../../Components/Header";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../../Pages/TabContent/details.css";
import { useDispatch, useSelector } from "react-redux";
import { sellerSignUpUser } from "../../thunks/userThunks";
 import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdArrowForward } from "react-icons/md";
import Footer from "../../Components/Footer";
function SignUpSeller() {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password:"",
    confirm_password:""
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      formData,"haswe"
    )
    if(formData.name == "" || formData.email == "" || formData.address == "" || formData.phone == "" || formData.password == "" || formData.confirm_password == ""){
    toast.error("Please fill all the fields");
    }else if(formData.password !== formData.confirm_password){
      toast.error("Password and Confirm Password does not match");
    }else{
      dispatch(sellerSignUpUser(formData));
    }
  };
  return (
    <div className="sellerpage">
      <Header />
      <div className="wrapper">
        <div className="tab-details">
          <h2>Signup as a Seller </h2>
          <h3>Sell as a Service</h3>
          <p className="upper">
            Sell your services and get the customers<br></br> to get benefits of
            services.
          </p>
          <FormControl onSubmit={handleSubmit} className="form-control">
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
                variant="unstyled"
                border="none"
                type="email"
                value={formData.name}
                fontSize="41px"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                name="name"
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
                Email address
              </FormLabel>
              <Input
                variant="unstyled"
                border="none"
                type="email"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                name="email"
                value={formData.email}
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
               Password
              </FormLabel>
              <Input
                variant="unstyled"
                border="none"
                type="password"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                name="password"
                value={formData.password}
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
                Confirm Password
              </FormLabel>
              <Input
                variant="unstyled"
                border="none"
                type="password"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                name="confirm_password"
                value={formData.confirm_password}
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
                border="none"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                name="address"
                value={formData.address}
                type="email"
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
                value={formData.phone}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                name="phone"
                border="none"
                type="tel"
                fontSize="41px"
              />
            </Box>
            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
          </FormControl>
          <div className="primary-btn">
            <Button
              rightIcon={<MdArrowForward />}
              bg="#7BB564"
              color={"white"}
              variant="solid"
              width={"100%"}
              onClick={handleSubmit}
            >
              Submit to Admin for Approval
            </Button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default SignUpSeller;
