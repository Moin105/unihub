import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { Button } from "@chakra-ui/react";
import "./checkout.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Select,
  Button,
  Flex,useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from "@chakra-ui/react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { setService } from "../features/serviceSlice";
import { setProduct } from "../features/paymentSlice";
import { fetchCart } from "../thunks/cartThunk";
import visa from '../Images/003-visa.png'
import google from '../Images/google pay.png'
import apple from '../Images/Path 7173.png'
import { setEvent } from "../features/eventSlice";
import { toast } from "react-toastify";
import {BiPlus} from 'react-icons/bi'
// import Modal from "./Modal";

const fetchData = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
};

function CheckOutPage() {
  const productData = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const location = useLocation();
  const [cardData, setCardData] = useState({
    number:"",
    exp_month:"",
    exp_year:"",
    cvc:"",
  });
  
  const url = "https://admin.myuni-hub.com/api/get_cards";
  const token = useSelector((state) => state.auth.token);
  const eventData = useSelector((state)=> state.event)
  const serviceData = useSelector((state)=> state.service)
  const [status,setStatus] = useState(null);
  const [show,setShow] = useState(false)
  const data = location.state ? location.state.data : null;
  const navigate = useNavigate();
  const [checkout,setCheckout] = useState(null)
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  const months = [
    "01", "02", "03", "04", "05", "06", "07",
    "08", "09", "10", "11", "12"
  ];
  
  // Generate years array from current year to 10 years in the past
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear + i - 10);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const addToWishlist = async (productId, quantity, token) => {
    const url = "https://admin.myuni-hub.com/api/wishlist";
    const headers = { Authorization: `Bearer ${token}` };
    const data = { id: productId, quantity: quantity };

    try {
      const response = await axios.post(url, data, { headers });
      toast.success(response.data.message);
      dispatch(fetchCart(token));
    } catch (error) {
      toast.error("Error adding product to wishlist: " + error);
    }
  };
  const handlecheckout =async () => {
    const response =  await postData("https://admin.myuni-hub.com/api/confirm_payment", token,payment);
      console.log("dasasdasd",response)
      if(response.status == 200 && response.message === 'created successfully!'){
         setShow(true)
          onOpen()
        if(status== 1){
          console.log("checkout",status,response.payment.next_action.use_stripe_sdk.stripe_js)
        return  setCheckout(response.payment.next_action.use_stripe_sdk.stripe_js)
            // service/
        } else if(status == 2){
          console.log("checkout",status,response)
          console.log("product",response,response.product)
          addToWishlist(productData.product[0].id,productData.product[1].quantity,token)
          return  setCheckout(response.payment.next_action.use_stripe_sdk.stripe_js)
          //  product
        } else if(status == 3){
          console.log("checkout",status,response)
          return  setCheckout(response.payment.next_action.use_stripe_sdk.stripe_js)
          // event
        }
      }else if(response.status == 500){
        toast.error(response.message)
      }
  };
  const [payment,setPayment] = useState({
    payment_intent:'',
    address: '',
    phone: '',
  })
  const [card, setCard] = useState(null);
  const fetchDatass = async () => {
    try {
      const response = await axios.get(
        "https://admin.myuni-hub.com/api/get_cards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCard(response.data.cards);

      if (response.data.cards.length === 0) {
        setShow(true);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  useEffect(() => {
    console.log("payment details", data?.type);
    if(data.type == "service"){
      // console.log(data.type,serviceData.product[0].id,serviceData.product[1].quantity)
      setPayment({
        payment_intent: serviceData?.data?.intent,
        address:data.address,
        phone:data.phone
      })
      setStatus(1)
    }else if(data.type == "product"){
      console.log(data.type,productData)
      console.log("product",productData.product[0].id,productData.product[1].quantity)
      setStatus(2)
      setPayment({
        payment_intent: productData?.response,
        address:data.address,
        phone:data.phone

      })
    }else if(data.type == "event"){
      console.log(data.type,eventData) 
      setStatus(3)
      setPayment({...payment,
        payment_intent:  eventData?.response?.data?.intent,
        address: data.address,
        phone:data.phone
      })
    }
    fetchData(url, token).then((data) => {
      setCard((prevState) => {
        prevState = data?.cards;
        return prevState;
      });
      console.log(data);
    });
    
  }, []);
  const sendCardData = async () => {
    try {
      const response = await axios.post('https://admin.myuni-hub.com/api/create_payment_method', cardData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      if(response.data.status == 200 && response.data.message === ""){
        fetchData(url, token).then((data) => {
          setCard((prevState) => {
            prevState = data?.cards;
            return prevState;
          });
          console.log(data);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleSelectChange = (event) => {
    setCardData({
      ...cardData,
      exp_year: event.target.value
    });
  };
  const handleSelectChanges = (event) => {
    setCardData({
      ...cardData,
      exp_month: event.target.value
    });
  };
  const makePaymentMethodPrimary = async (paymentId) => {
    try {
      const formData = new FormData();
      formData.append('payment_id', paymentId);
  
      const response = await axios.post(
        'https://admin.myuni-hub.com/api/make_payment_method_primary',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Make sure the token is available in this scope
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Payment method set as primary successfully', response.data);
        toast.success(response.data.message)
        fetchData()
        fetchDatass()
        // You can update state or navigate as needed here
      }
    } catch (error) {
      console.error('Error setting payment method as primary:', error);
      // Handle error appropriately
    }
  };
  
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  
    if(status == 1){
         dispatch(setService({}))
         setCheckout(null)
    }else if(status == 2){
      dispatch(setProduct({}))
    }else if(status == 3){
      dispatch(setEvent({}))
    }  
    onClose()
    handleRouteChange("/")
}
const [showform ,setShowForm] = useState(false)
  return (
    <>
      <div className="bookingsummary">
        <Header />
        <div className="wrapper">
          <h2>Checkout</h2>
          {/* <p>Confirm your booking details</p> */}
          <div className="summary">
            <h2>Payment</h2>
          {status == 1 && productData && <>
          <>service</>
            {/* <h3>{productData?.product[0]?.name}</h3>
            <h3>Quantity {productData?.product[1]?.quantity}</h3>
            <p>{` ${productData?.product[0]?.price}  ${productData?.product[1]?.currency}`}</p> */}
          </>}
          {
            status == 2 && serviceData && <>
            <>product</>
            {/* <h3>{productData?.product[0]?.name}</h3>
            <h3>Quantity {productData?.product[1]?.quantity}</h3>
            <p>{` ${productData?.product[0]?.price}  ${productData?.product[1]?.currency}`}</p> */}
          </>
          }
          {
            status == 3 && eventData   && <>
            <>event</>
            {/* <p>{` ${productData.product[0].price}  ${productData.product[1]?.currency}`}</p> */}
          </>
          }
          </div>
          <div className="summarys">
            <p style={{display:"flex",justifyContent:"space-between"}}>Payment Details <p onClick={()=>setShowForm(!showform)}><BiPlus/></p></p>
            <div className="cards-container">
              {card !== null && showform == false ? (
                card?.map((item) => {
                  return (
                    <div className="card-row" onClick={()=>{makePaymentMethodPrimary(item.id)}}>
                      <div className="card">
                      {item.brand === 'visa'  &&   <img src={visa}/>}
                   {item.brand.includes("google") &&  <img src={google}/>}
                   {item.brand.includes("apple") &&  <img src={apple}/>}
                   
                      </div>
                      <div className="card-text">
                        <h3>{item.brand}</h3>
                        <p> &#8226;&#8226;&#8226;&#8226;{item.last_digit}</p>
                      </div>
                   {item.is_primary == 1 &&  <div className="check"></div>}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              <>
                {showform == true  && (
                  <>
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
                          Number
                        </FormLabel>
                        <Input
                          variant="unstyled"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
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
                          Cvc
                        </FormLabel>
                        <Input
                          variant="unstyled"
                          value={cardData.cvc}
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                          border="none"
                          type="text"
                          fontSize="41px"
                        />
                      </Box>
                      {/* <Flex width="100%" gap="10">     <Box
                        className="input-container"
                        flex="1"
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
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          border="none"
                          type="text"
                          fontSize="41px"
                        />
                      </Box>
                      <Box
                        className="input-container"
                        border="1px solid #7BB564"
                        borderRadius={30}
                        flex="1"
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
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          border="none"
                          type="text"
                          fontSize="41px"
                        />
                      </Box>
                      </Flex> */}
                        <Flex width="100%" gap="10">
      <Box
        className="input-container"
        border="1px solid #7BB564"
        borderRadius={30}
        marginTop="103px"
        flex={1}
        padding="0px"
      >
        <FormLabel
          fontSize="37px"
          fontWeight={300}
          padding={0}
        >
          Month
        </FormLabel>
        <Select variant="unstyled" placeholder="00" onChange={handleSelectChanges}  padding={" 7px 0px 0px 20px"} fontSize="18px">
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </Select>
      </Box>

      <Box
        className="input-container"
        border="1px solid #7BB564"
        borderRadius={30}
        marginTop="103px"
        flex={1}
        padding="0px"
      >
        <FormLabel
          fontSize="37px"
          fontWeight={300}
        >
          Year
        </FormLabel>
        <Select variant="unstyled" placeholder="2000" padding={" 7px 0px 0px 20px"} onChange={handleSelectChange} fontSize="18px">
          {years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </Select>
      </Box>
    </Flex>
                    </FormControl>
                  </>
                )}
              </>
              <>
                {card == null  && (
                  <>
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
                          Number
                        </FormLabel>
                        <Input
                          variant="unstyled"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
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
                          Cvc
                        </FormLabel>
                        <Input
                          variant="unstyled"
                          value={cardData.cvc}
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                          border="none"
                          type="text"
                          fontSize="41px"
                        />
                      </Box>
                    
                        <Flex width="100%" gap="10">
      <Box
        className="input-container"
        border="1px solid #7BB564"
        borderRadius={30}
        marginTop="103px"
        flex={1}
        padding="0px"
      >
        <FormLabel
          fontSize="37px"
          fontWeight={300}
          padding={0}
        >
          Month
        </FormLabel>
        <Select variant="unstyled" placeholder="00" onChange={handleSelectChanges}  padding={" 7px 0px 0px 20px"} fontSize="18px">
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </Select>
      </Box>

      <Box
        className="input-container"
        border="1px solid #7BB564"
        borderRadius={30}
        marginTop="103px"
        flex={1}
        padding="0px"
      >
        <FormLabel
          fontSize="37px"
          fontWeight={300}
        >
          Year
        </FormLabel>
        <Select variant="unstyled" placeholder="2000" padding={" 7px 0px 0px 20px"} onChange={handleSelectChange} fontSize="18px">
          {years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </Select>
      </Box>
    </Flex>
                    </FormControl>
                  </>
                )}
              </>
            </div>
          </div>
          <div className="primary-btn">
            {" "}
            {card == null  ? (
              <Button
                onClick={() => {
                  
                  sendCardData();
                }}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
              >
                Add Card
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if(showform == true){
                    sendCardData();
                  }else{
                      handlecheckout();
                  }
                
                }}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
              >
                Pay
              </Button>
            )}
          </div>
        </div>{" "}
    {/* {show &&    */}
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
        <Button colorScheme="#7BB564"  onClick={() => {openInNewTab(checkout)}} style={{border:"1px solid #7BB564"}} variant="ghost">Submit</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
    {/* } */}

        <Footer/>
      </div>

    </>
  );
}

export default CheckOutPage;

{/* <button onClick={() => openInNewTab('http://www.yoursite.com')}>
            Click me!
        </button> */}