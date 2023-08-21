
import React,{useState} from 'react'
import Header from '../Components/Header'
import Wallet from './TabContent/Wallet'
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
import { toast ,ToastContainer  } from 'react-toastify';
import axios from 'axios';
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import './bankpage.css'
function BankPage() {
  const [bankName, setBankName] = useState('');
  const [accountTitle, setAccountTitle] = useState('');
  const [ibanNumber, setIbanNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [bankAddress, setBankAddress] = useState('');
const token = useSelector((state) => state.auth.token)
const role = useSelector((state)=>state.auth.role)
const navigate = useNavigate();
const handleRouteChange = (url,datas) => {
  navigate(url, { state: { data: datas } });
};
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  const validate = () => {
    let isValid = true;
  
    if (!bankName) {
      toast.error('Bank Name is required.');
      isValid = false;
    }
  
    if (!accountTitle) {
      toast.error('Account Title is required.');
      isValid = false;
    }
  
    if (!ibanNumber) {
      toast.error('IBAN Number is required.');
      isValid = false;
    }
  
    if (!swiftCode) {
      toast.error('Swift Code is required.');
      isValid = false;
    }
  
    if (!bankAddress) {
      toast.error('Bank Address is required.');
      isValid = false;
    }
  
    return isValid;
  };
  


  const handleSubmit =async (e) => {
    e.preventDefault();
  
    if (validate()) {
      const data = {
        bank_name: bankName,
        account_title: accountTitle,
        iban_number: ibanNumber,
        swift_code: swiftCode,
        bank_address: bankAddress,
      };
      try {
        const response = await axios.post('https://admin.myuni-hub.com/api/bank_details', data, config);
  if (response.data.status == 200) {
    if (role == "seller"){
      handleRouteChange('/seller-details')
    }else{
    handleRouteChange('/sellerdetails')}
  }
        // If the request is successful, response.data will contain the data returned from the server
        console.log(response.data);
      } catch (error) {
        // If the request fails, the error object will contain details about the error
        console.error(error);
      }
      // pass 'data' to your API request here...
    }
  };
  




  return (
    <div>
      <Header/> 

      <div className="tab-wallet">
      <React.Fragment>
          <h2>Add New Bank</h2>
          <h3>Add Bank Details</h3>
          {/* <FormControl className="form-control">
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
                Name of Card Holder
              </FormLabel>
              <Input
                variant="unstyled"
                border="none"
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
                Card Number
              </FormLabel>
              <Input
                variant="unstyled"
                border="none"
                type="email"
                fontSize="41px"
              />
            </Box>
            <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
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
                  Expiry Date
                </FormLabel>
                <Input
                  variant="unstyled"
                  border="none"
                  placeholder="mm/yy"
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
                  CVV
                </FormLabel>
                <Input
                  variant="unstyled"
                  border="none"
                  type="tel"
                  fontSize="41px"
                />
              </Box>
            </SimpleGrid>
          </FormControl> */}
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
      Bank Name
    </FormLabel>
    <Input
     value={bankName}
     onChange={(e) => setBankName(e.target.value)}
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
      Account Title
    </FormLabel>
    <Input
      variant="unstyled"
      value={accountTitle}
      onChange={(e) => setAccountTitle(e.target.value)}
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
      IBAN Number
    </FormLabel>
    <Input
      variant="unstyled"
      border="none"
      type="text"
      value={ibanNumber}
      onChange={(e) => setIbanNumber(e.target.value)}
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
        Swift Code
      </FormLabel>
      <Input
        variant="unstyled"
        border="none"
        type="text"
        value={swiftCode}
        onChange={(e) => setSwiftCode(e.target.value)}
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
        Bank Address
      </FormLabel>
      <Input
        variant="unstyled"
        value={bankAddress}
        onChange={(e) => setBankAddress(e.target.value)}
        border="none"
        type="text"
        fontSize="41px"
      />
    </Box>
</FormControl>

        </React.Fragment>
        <div className="primary-btn">
        <Button
          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
          onClick={(e) => {
            handleSubmit(e)
          }}
        >
          Add Bank
        </Button>
      </div>
      <ToastContainer />

        </div>
    </div>
  )
}

export default BankPage