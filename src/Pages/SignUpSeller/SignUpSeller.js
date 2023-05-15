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
import { MdArrowForward } from "react-icons/md";
function SignUpSeller() {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      formData,"haswe"
    )
    dispatch(sellerSignUpUser(formData));
  
  };
  // const userProfileData = useSelector((state) => state.userProfile.data);
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
          <div className="details-btn">
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
    </div>
  );
}

export default SignUpSeller;
