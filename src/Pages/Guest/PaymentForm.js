import React, { useEffect, useState } from 'react';
import { FormControl, Box, FormLabel, Input, Button } from '@chakra-ui/react';
import Header from '../../Components/Header';
import { useLocation } from 'react-router-dom';
import Footer from '../../Components/Footer'
import axios from 'axios';
import { MdArrowForward } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const PaymentForm = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const data = location.state ? location.state.data : null;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    event_id: data?.event_id,
    price_id: data?.id,
    currency: 'usd',
    card_number: '',
    year: '',
    month: '',
    cvc: '',
  });
  useEffect(() => {
   console.log("payment",data)
  }, [])
  
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
      return response.data;
    } catch (error) {
      console.error('Error', error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.address == ""|| formData.card_number == "" || formData.cvc == "" || formData.email == "" || formData.month == "" || formData.name == "" || formData.phone == "" || formData.year == ""){
      toast.error("Please fill all the fields")
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
            onChange={handleInputChange}
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
          Next
        </Button>
        {/* </Link> */}
      </div>
    </form>
   
   </div> <Footer/>
   </> 
  );
};

export default PaymentForm;
