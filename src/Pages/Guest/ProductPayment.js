
import React, { useEffect, useState } from 'react';
import { FormControl, Box, FormLabel, Input, Button } from '@chakra-ui/react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'react-hook-form';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {
useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from "@chakra-ui/react";

const ProductPayment = () => {
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  const token = useSelector((state) => state.auth.token);
  const [checkout,setCheckout] = useState(null)
 const [formData, setFormData] = useState({
    name: '',
    email: '',
    product_id: data?.data?.id,
    quantity: data?.quantity,
    currency: data?.currency,
    address: '',
    phone: '',
    city: '',
    zip: '',
    card_number:'',
    month:'',
    year:'',
    cvc:'',
    price_id: data?.data?.price,
  });
  useEffect(() => {
    const value = formData.card_number.replace(/[^\d]/g, "").slice(0, 16); // remove non-digits and limit length
    const formatted = value.replace(/(\d{4})/g, "$1 ").trim(); // insert spaces every 4 digits
    // setCardNumber(formatted);
    setFormData((prevState) => ({
      ...prevState,
      'card_number': formatted,
    }));
  }, [formData.card_number]);
  const navigate = useNavigate();
const handleRouteChange = (url,datas) => {
  navigate(url, { state: { data: datas } });
};
  const postData = async (url, token, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response",response)
      return response.data;
    } catch (error) {
      console.error(`Error: ${error}`);
      // return null;
    }
  };
  const handlecheckout =async () => {
    const response =  await postData("https://admin.myuni-hub.com/api/confirm_payment", token,payment);
      console.log("dasasdasd",response)
      if(response.status == 200 && response.message === 'created successfully!'){
        //  setShow(true)
          // onOpen()  
          console.log("checkout",response)
          return  setCheckout(response.payment.next_action.use_stripe_sdk.stripe_js)
          // event
      }else if(response.status == 500){
        toast.error(response.message)
      }
  };
  const [payment,setPayment] = useState({
    payment_intent:'',
    address: '',
    phone: '',
  })
 const { isOpen, onOpen, onClose } = useDisclosure();

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

    if (formData.zip.trim() === '') {
      toast.error('Zip is required');
      return false;
    }

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

    if (formData.city.trim() === '') {
      toast.error('City is required');
      return false;
    }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData', formData);
    if (!validateFields()) {
      return;
    } else {
         try {
            const response = await axios.post(
              'https://admin.myuni-hub.com/api/guest_book_product',
              {
                // paymentMethodId: paymentMethod.id,
                name: formData.name,
                email: formData.email,
                address: formData.address,
                quantity: data?.quantity,
                phone: formData.phone,
                product_id: data?.data?.id,
                price_id: data?.data?.price,
                currency: data?.currency,
                city: formData.city,
                zip: formData.zip,
                cvc: formData.cvc,
                month: formData.month,
                year: formData.year,
                card_number: formData.card_number,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          
            console.log(response.data.message);
            setPayment({
              payment_intent:response.data.payment.id,
              address: formData.address,
              phone: formData.phone,
            })
            // Handle successful payment and show a success message
            toast.success('Payment successful!');
            onOpen()
          } catch (error) {
            // log the error message
            console.log(error.message);
            toast.error(error.response.data.message);
            // Or if the error is from the API and has a specific structure
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          }
          

          // Redirect to a success page or perform other actions
        }
  };

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      <Header />
      <div className="tab-wallet">
        <h2>Checkout Form</h2>
        <h3>Product Checkout Form</h3>

     
        <form onSubmit={handleSubmit}>
        <FormControl className="form-control">
            {/* Rest of the input fields */}
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
            <PhoneInput
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
            Zip
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="zip"
            type="number"
            value={formData.zip}
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
            onChange={handleInputChanges}
  value={formData.card_number}
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
            Expiry Month
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="month"
            type="number"
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
        >
          <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
            Expiry Year
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="year"
            type="number"
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
           Cvc
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="cvc"
            type="number"
            value={formData.cvc}
            onChange={handleInputChangecvc}
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
            City
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            fontSize="41px"
          />
        </Box>
          

          </FormControl>
          <div className="primary-btn">
            <Button
              rightIcon={<MdArrowForward />}
              bg="#7BB564"
              color={'white'}
              variant="solid"
              width={'100%'}
              onClick={handleSubmit}
            >
              Buy
            </Button>
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
      <Footer />
    </>
  );
};

export default ProductPayment;
