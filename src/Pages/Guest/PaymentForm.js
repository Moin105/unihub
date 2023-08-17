import React, { useEffect, useState } from 'react';
import { FormControl, Box, FormLabel, Input, Button } from '@chakra-ui/react';
import Header from '../../Components/Header';
import { useLocation,useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer'
import axios from 'axios';
import { MdArrowForward } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  } from "@chakra-ui/react";
const PaymentForm = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const data = location.state ? location.state.data : null;
  const navigate = useNavigate();
  const handleRouteChange = (url,datas) => {
    navigate(url, { state: { data: datas } });
  };
 const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    event_id: data?.event_id,
    price_id: data?.id,
    currency: '£',
    card_number: '',
    year: '',
    month: '',
    cvc: '',
  });
  
  useEffect(() => {
   console.log("payment",data)
  }, [])
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    if (name === "card_number") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const value = formData.card_number.replace(/[^\d]/g, "").slice(0, 16); // remove non-digits and limit length
    const formatted = value.replace(/(\d{4})/g, "$1 ").trim(); // insert spaces every 4 digits
    // setCardNumber(formatted);
    setFormData((prevState) => ({
      ...prevState,
      'card_number': formatted,
    }));
  }, [formData.card_number]);
  const validateFields = () => {
    if (formData.name.trim() === '') {
      toast.error('Name is required');
      return false;
    }

    if (formData.email.trim() === '') {
      toast.error('Email is required');
      return false;
    }

    // Simple validation for email format
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(formData.email)) {
      toast.error('Invalid email format');
      return false;
    }

    if (formData.address.trim() === '') {
      toast.error('Address is required');
      return false;
    }

    if (formData.phone.trim() === '') {
      toast.error('Phone is required');
      return false;
    }

    // Simple validation for phone format
    // const phonePattern = /^[0-9]{10}$/;
    // if (!phonePattern.test(formData.phone)) {
    //   toast.error('Invalid phone format');
    //   return false;
    // }

    if (formData.card_number.trim() === '') {
      toast.error('Card Number is required');
      return false;
    }

    if (formData.month.trim() === '') {
      toast.error('Expiry Month is required');
      return false;
    }
    if (formData.month > 12) {
      toast.error('Enter Valid Month');
      return false;
    }
    if (formData.year.trim() === '') {
      toast.error('Expiry Year is required');
      return false;
    }
    if (formData.year >99) {
      toast.error('Enter Valid Year');
      return false;
    }
    if (formData.cvc.trim() === '') {
      toast.error('CVC is required');
      return false;
    }

    // if (formData.city.trim() === '') {
    //   toast.error('City is required');
    //   return false;
    // }
    const cardNumberPattern = /^(\d{4} ){3}\d{4}$/;
    if (!cardNumberPattern.test(formData.card_number)) {
      toast.error('Invalid card number format');
      return false;
    }
    return true;
  }
  const handleInputChangecvc = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;
  
    // Validate cvc input
    if (name === 'cvc' && value.length > 3) {
      validatedValue = value.slice(0, 3); // keep only the first 3 digits
      toast.error('CVC cannot be more than 3 digits');
    }
  
    setFormData({ ...formData, [name]: validatedValue });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const postData = async (url, data, token) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log(response.data);
      toast.success('Payment successful!');
      onOpen()
      return response.data;
    } catch (error) {
      console.error('Error', error);
      toast.error(error.response.data.message);
           
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    else{
      postData('https://admin.myuni-hub.com/api/guest_book_event', formData, token);
    }
    console.log('formData', formData);
    // dispatch(createPayment(formData));
  };

  return (
   <>  <Header/>
   <div className='tab-wallet'>
     <h2>Checkout Form</h2>
     <h3>Event Checkout Form</h3>
    <form onSubmit={handleSubmit}>
      <FormControl className="form-control">
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Name
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Email address
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
      
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Address
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Phone
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box>
        {/* <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Event ID
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="event_id"
            type="text"
            value={formData.event_id}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Price ID
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="price_id"
            type="text"
            value={formData.price_id}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box> */}
        {/* <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Currency
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="currency"
            type="text"
            value={formData.currency}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box> */}
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Card Number
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="card_number"
            type="text"
            value={formData.card_number}
            onChange={handleInputChanges}
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Year
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="year"
            type="text"
            value={formData.year}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Month
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="month"
            type="text"
            value={formData.month}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
          marginBottom="103px"
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            CVC
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="cvc"
            type="text"
            value={formData.cvc}
            onChange={handleInputChangecvc}
            fontSize="41px"
          />
        </Box>
      </FormControl>
      <div className="primary-btn">
                  {/* <Link to={{pathname:`/bookcleaner/:${selectedOption?.id}`,state: {selectedOption},}}> */}
                        <Button
          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
          onClick={handleSubmit}
        >
          Pay
        </Button>
        {/* </Link> */}
      </div>
    </form>
   
   </div> 
   <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent style={{alignItems:"center"}}>
      <ModalHeader>Confirm Payment</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <p>Thank you for your purchase!</p>
    <p>Are you ready to checkout?</p>
      </ModalBody>

      <ModalFooter>
        <Button  style={{background:"#7BB564",color:"white"}} mr={3} onClick={onClose}>
          Close
        </Button>
        <Button colorScheme="#7BB564"  onClick={() => {handleRouteChange('/')}} style={{border:"1px solid #7BB564"}} variant="ghost">Submit</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
   <Footer/>
   </> 
  );
};

export default PaymentForm;
