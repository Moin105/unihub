// import React, { useEffect, useState } from 'react';
// import { FormControl, Box, FormLabel, Input, Button } from '@chakra-ui/react';
// import Header from '../../Components/Header';
// import Footer from '../../Components/Footer'
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { MdArrowForward } from "react-icons/md";
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// const createStripe = () => {
//   return Promise.resolve(window.Stripe('pk_test_51Mjy4wGJcZyTragrfjTemq91P1GjQSHv0PY40nmeKI1X05Mvf2TVRQaTlFYgJsCHqQC0R7vvZVFKwSGOZiLi5gLU00Wis8v8Al'));
// };
// const ProductPayment = () => {
//   const location = useLocation();
//   const data = location.state ? location.state.data : null;
//   const token = useSelector((state) => state.auth.token);
//   const postData = async (url, data, token) => {
//     try {
//       const response = await axios.post(url, data, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error', error);
//     }
//   };
//   // const stripe = useStripe();
//   const elements = useElements();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     quantity: data?.quantity,
//     phone: '',
//     product_id: data?.data?.id,
//     price_id: data?.data?.price,
//     currency: data?.currency,
//     city:'',
//     zip:'',
//     card_number: '',
//     year: '',
//     month: '',
//     cvc: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const [stripe, setStripe] = useState(null);

//   useEffect(() => {
//     createStripe().then((stripe) => {
//       setStripe(stripe);
//     });
//   }, []);
//   const handleSubmit =async (e) => {
//     e.preventDefault();
//     console.log('formData', formData);
//     if(formData.address == ""|| formData.card_number == "" || formData.cvc == "" || formData.email == "" || formData.month == "" || formData.name == "" || formData.phone == "" || formData.year == "" || formData.city == "" || formData.zip == ""){
//       toast.error("Please fill all the fields")
//     }
//     if (!stripe) {
//       // Stripe.js has not yet loaded.
//       return;
//     }
//     try {
//       // Create a payment method using the card element
//       const cardElement = elements.getElement(CardElement);
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//       });

//       if (error) {
//         console.error('Error creating payment method:', error);
//         // Handle error and show an error toast or message
//         toast.error('Error creating payment method. Please try again.');
//       } else {
//         // Send the paymentMethod.id to your backend using an API call
//         // Example using axios:
//         const response = await axios.post(
//           'YOUR_BACKEND_ENDPOINT_TO_CHARGE_PAYMENT',
//           {
//             paymentMethodId: paymentMethod.id,
//             name: formData.name,
//             email: formData.email,
//             address: formData.address,
//             quantity: data?.quantity,
//           phone: formData.phone,
//             product_id: data?.data?.id,
//             price_id: data?.data?.price,
//             currency: data?.currency,
//             city:formData.city,
//             zip:'',
//             // card_number: '',
//             // year: '',
//             // month: '',
//             // cvc: '',
//             // Add other form data as needed
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log(response.data);
//         // Handle successful payment and show a success message
//         toast.success('Payment successful!');

//         // Redirect to a success page or perform other actions
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       // Handle error and show an error toast or message
//       toast.error('Error processing payment. Please try again.');
    
//   };
//     // else{
//     //   postData('https://admin.myuni-hub.com/api/guest_book_product', formData, token);
//     // }
//     // dispatch(createPayment(formData));
//   };
//   useEffect(() => {
//     console.log(data)
//   }, [])
  

//   return (
//    <>  <Header/>
//    <div className='tab-wallet'>
//      <h2>Checkout Form</h2>
//      <h3>Product Checkout Form</h3>
//     <form onSubmit={handleSubmit}>
//       <FormControl className="form-control">
//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             Name
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
//             name="name"
//             type="text"
//             value={formData.name}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             Email address
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
      
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             Address
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
//             name="address"
//             type="text"
//             value={formData.address}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//         <Box className="input-container" border="1px solid #7BB564" borderRadius={30} marginTop="103px">
//   <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//     Card Number
//   </FormLabel>
//   <CardElement options={{ style: { fontSize: "41px" } }} />
// </Box>

//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             Phone
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
//             name="phone"
//             type="tel"
//             value={formData.phone}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             Zip
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
//             name="zip"
//             type="text"
//             value={formData.zip}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             City
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
//             name="city"
//             type="text"
//             value={formData.city}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             Card Number
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
//             name="card_number"
//             type="text"
//             value={formData.card_number}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             Year
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
//             name="year"
//             type="text"
//             value={formData.year}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             Month
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
//             name="month"
//             type="text"
//             value={formData.month}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//         <Box
//           className="input-container"
//           border="1px solid #7BB564"
//           borderRadius={30}
//           marginTop="103px"
//           marginBottom="103px"
//         >
//           <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
//             CVC
//           </FormLabel>
//           <Input
//             variant="unstyled"
//             border="none"
//             name="cvc"
//             type="text"
//             value={formData.cvc}
//             onChange={handleInputChange}
//             fontSize="41px"
//           />
//         </Box>
//       </FormControl>
//       <div className="primary-btn">
//                   {/* <Link to={{pathname:`/bookcleaner/:${selectedOption?.id}`,state: {selectedOption},}}> */}
//                         <Button
//           rightIcon={<MdArrowForward />}
//           bg="#7BB564"
//           color={"white"}
//           variant="solid"
//           width={"100%"}
//           onClick={handleSubmit}
//         >
//           Next
//         </Button>
//         {/* </Link> */}
//       </div>
//     </form>
   
//    </div> <Footer/>
//    </> 
//   );
// };

// export default ProductPayment;
import React, { useEffect, useState } from 'react';
import { FormControl, Box, FormLabel, Input, Button } from '@chakra-ui/react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const createStripe = () => {
  return Promise.resolve(window.Stripe('pk_test_51Mjy4wGJcZyTragrfjTemq91P1GjQSHv0PY40nmeKI1X05Mvf2TVRQaTlFYgJsCHqQC0R7vvZVFKwSGOZiLi5gLU00Wis8v8Al'));
};

const ProductPayment = () => {
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  const token = useSelector((state) => state.auth.token);
  const [stripe, setStripe] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    quantity: data?.quantity,
    phone: '',
    product_id: data?.data?.id,
    price_id: data?.data?.price,
    currency: data?.currency,
    city: '',
    zip: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const elements = useElements();

  useEffect(() => {
    createStripe().then((stripe) => {
      setStripe(stripe);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData', formData);
    if (formData.address === '' || formData.card_number === '' || formData.cvc === '' || formData.email === '' || formData.month === '' || formData.name === '' || formData.phone === '' || formData.year === '' || formData.city === '' || formData.zip === '') {
      toast.error('Please fill all the fields');
    } else {
      if (!stripe) {
        // Stripe.js has not yet loaded.
        return;
      }

      try {
        // Create a payment method using the card element
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          console.error('Error creating payment method:', error);
          // Handle error and show an error toast or message
          toast.error('Error creating payment method. Please try again.');
        } else {
          // Send the paymentMethod.id to your backend using an API call
          const response = await axios.post(
            'YOUR_BACKEND_ENDPOINT_TO_CHARGE_PAYMENT',
            {
              paymentMethodId: paymentMethod.id,
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
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response.data);
          // Handle successful payment and show a success message
          toast.success('Payment successful!');

          // Redirect to a success page or perform other actions
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        // Handle error and show an error toast or message
        toast.error('Error processing payment. Please try again.');
      }
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
        {/* <Box className="input-container" border="1px solid #7BB564" borderRadius={30} marginTop="103px">
  <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
    Card Deatails
  </FormLabel>
  <CardElement options={{ style: { fontSize: "41px" } }} />
</Box> */}

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
            Zip
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="zip"
            type="text"
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
            <Box className="input-container" border="1px solid #7BB564" borderRadius={30} marginTop="103px">
              <FormLabel padding="20px 0px 0px 20px" fontSize="37px" fontWeight={300}>
                Card Details
              </FormLabel>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '20px',
                      height: 'auto',
                      borderColor: 'none',
                      padding: '7px 0px 10px 20px',
                      fontWeight: '400',
                      color: '#000',
                      '::placeholder': {
                        color: '#A0AEC0',
                      },
                    },
                  },
                }}
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
              Next
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProductPayment;
