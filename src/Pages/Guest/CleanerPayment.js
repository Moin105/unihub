import React, { useEffect, useState } from 'react';
import { FormControl, Box, FormLabel, Input, Button } from '@chakra-ui/react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer'
import { MdArrowForward } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import axios from 'axios';
import { toast } from 'react-toastify';
const CleanerPayment = () => {
  const location = useLocation();
  const receivedObject = location.state.data;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    date_time:'',
    service_id: receivedObject?.selectedOption?.service_id,
    price_id: receivedObject?.selectedOption?.id,
    currency: '',
    card_number: '',
    year: '',
    month: '',
    cvc: '',
  });
   const dateFormate=()=>{
    // const date = format(receivedObject.availablity.value, 'dd MMM yyyy')
    const date = new Date(receivedObject.availablity.value); // Yeh specific date dega
const formattedDate = date.toISOString().split('T')[0];
    const time = receivedObject.availablity.selectedOption.start_time
    // value
    console.log(receivedObject.availablity.value)
    setFormData({...formData,date_time:formattedDate + " " + time})
    // formData.date_time = date + " " + time
   }
  const token = useSelector((state) => state.auth.token);
  const postData = async (data) => {
    const url = 'https://admin.myuni-hub.com/api/guest_book_service'; // replace with your API endpoint
    
// replace with your bearer token
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  
    try {
      const response = await axios.post(url, data, { headers: headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData', formData);
    if(formData.address == "" || formData.card_number == "" || formData.cvc == "" || formData.email == "" || formData.month == "" || formData.name == "" || formData.phone == "" || formData.year == ""){
   toast.error("Please fill all the fields")
    }else {
      postData(formData);
    }
  };

useEffect(() => {
  console.log("fatiha",receivedObject)
  dateFormate()
}, [])

  return (
   <>  <Header/>
   <div className='tab-wallet'>
     <h2>Checkout Form</h2>
     <h3>Cleaner Service Checkout Form</h3>
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
        <Box
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
        </Box>
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
          Checkout
        </Button>
        {/* </Link> */}
      </div>
    </form>
   
   </div> <Footer/>
   </> 
  );
};

export default CleanerPayment;
