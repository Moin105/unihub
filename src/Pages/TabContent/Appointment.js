import React, { useEffect, useState } from "react";
import "./order.css";
import "../../responsive.css";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Select,Textarea,
  Button,
  Flex,useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from "@chakra-ui/react";
import filter from "../../Images/filter.png";
import ordei from '../../Images/ordei.png'
import { useSelector } from "react-redux";
import { MdArrowForward } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarRating from "./Rating";
import {toast} from 'react-toastify'

function Appointment() {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(true);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);
  const [showData ,setShowData] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productData,setProductData] = useState({})
    const [text, setText] = useState('');
    function getTimeInAMPM(dateTimeString) {
      const date = new Date(dateTimeString);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 || 12; 
      return `${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
    }

function submitOrderRating(token, order_id, order_type, rating, message) {
  const url = 'https://admin.myuni-hub.com/api/order_review';
  const data = {
    order_id,
    order_type,
    rating,
    message,
  };

  // Include the Bearer token and any other headers, if required
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
if(rating == null){
  toast.error('Please select Rating')
  return 
}else if(message == ''){
  toast.error('Please Type Feedback')
  return
}
  return axios
    .post(url, data, { headers })
    .then((response) => {
      // Handle success
      toast.success(response.data.message)
      return response.data;
    })
    .catch((error) => {
      // Handle error
      console.error(error);
      throw error;
    });
}


    // Handle changes to the textarea value
    const handleChange = (e) => {
      setText(e.target.value);
    };
  const token = useSelector((state) => state.auth.token);
  let data = [];
  const getServices = async () => {
        try {
          const response = await axios.get(
            "https://admin.myuni-hub.com/api/book_services",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data.services; // return data instead of console.log
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };
      const fetchData = async () => {
        try {
            const [services, products] = await Promise.all([
                getServices(),
          ]);
    
          data = [ ...services];
          setOrders(data);
          console.log("hor disda", data);
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };
      const navigate = useNavigate();
       const handleRouteChange = (url, datas) => {
         navigate(url, { state: { data: datas } });
       };
    
       useEffect(() => {
         fetchData();
       }, []);
    function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };
  function getDateOnly(dateTimeString) {
    return dateTimeString.split(' ')[0];
  }
  const cancelBooking = async (payment_intent, bearerToken) => {
    const url = 'https://admin.myuni-hub.com/api/book_services/cancel';
    const headers = { 'Authorization': `Bearer ${bearerToken}` };
    const data = { payment_intent };
  
    try {
      const response = await axios.post(url, data, { headers });
      return response.data; // You can return the response or handle it as needed
    } catch (error) {
      console.error('There was an error cancelling the booking:', error);
      throw error; // Rethrow the error so you can handle it in the calling code
    }
  };

  const cancelOrder = async (intent)=>{

    cancelBooking(intent, token)
  .then(response => {
    console.log('Booking canceled successfully:', response);
    fetchData()
    onClose()
  })
  .catch(error => {
    console.error('Failed to cancel booking:', error);
  });
  console.log("cancel",intent)
  }
  return (
    <React.Fragment>
      {show ? (
        <div className="tab-order">
          <h2>My Appointments</h2>
          <span className="upper">
            View your order history or check the status of a recent order.
          </span>
          {/* <p>Login email : Malik.h123@gmail.com</p> */}
          {orders.length <= 0 ? (
            <React.Fragment>
              <span className="lower">You haven’t placed any appointment yet.</span>
              <div className="primary-btn">
                <Button
                  onClick={() => {
                    handleRouteChange("/");
                  }}
                  rightIcon={<MdArrowForward />}
                  bg="#7BB564"
                  color={"white"}
                  variant="solid"
                  width={"100%"}
                >
                  Start browsing
                </Button>
              </div>
            </React.Fragment>
          ) : (
       !showData ?     <React.Fragment>
              <div className="row">
                <p>All Sales</p>
                <figure>
                  <img src={filter} />
                </figure>
              </div>
              <div className="order-list">
              {
                orders.map((order,index)=>{
                  return   <div key={index} className="appointment-row" onClick={()=>{setProductData(order);console.log(productData);onOpen()}}>
               
                  <div className="order-details">
                    <div className="ordername">
                      <h3 style={{textTransform:'capitalize'}}>{order.service.title} { getTimeInAMPM(order.date_time)}</h3> <p>{getDateOnly(order.date_time)}</p>
                    </div>
                    <p>Cancel Booking</p>
                  </div>
                </div>
                })
              }
              
              </div>
              <div className="primary-btn">
                {/* <Button
                  onClick={() => {
                    setHide(false);
                  }}
                  rightIcon={<MdArrowForward />}
                  bg="#7BB564"
                  color={"white"}
                  variant="solid"
                  width={"100%"}
                >
                  Start browsing
                </Button> */}
              </div>
            </React.Fragment>:<>
            <div className="summary" style={{textAlign:"left"}}>
              <h2>Order Summary</h2>
               <p style={{margin:"5px 0px",textTransform:"capitalize"}}>{ productData?.service.title}</p>
               <p style={{margin:"5px 0px"}}> { productData.price.title}</p>
               <h3 style={{color:"#7BB564",margin:"5px 0px"}}>{`£ ${productData.price.price}  `}</h3>
               <div className="primary-btn">
                <Button
                  onClick={() => {
                    console.log("assadasd")
                    setShow(false)
                  }}
                  rightIcon={<MdArrowForward />}
                  bg="#7BB564"
                  color={"white"}
                  variant="solid"
                  width={"100%"}
                >
                  Rate your order
                </Button>
          </div> 
          </div>
            
            </>
          )}
        </div>
      ) : (
        <React.Fragment>
          <div className="tab-order">
            <h2>Order Summery</h2>
            <h4 className="heading">{ productData?.service.title}</h4>
            <h4 className="heading"> { productData.price.title}</h4>
            <p className="price"> {`£ ${productData.price.price}  `} </p>
            <React.Fragment>
              <h4 className="heading">Rating</h4>
              <StarRating rating={rating} onRatingChange={handleRatingChange}/>
              <h4 className="heading">Feedback</h4>
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
                   <h4 className="heading">Feedback</h4>
                  </FormLabel>
                  <Textarea   placeholder="Enter text here" 
        value={text} 
        onChange={handleChange}  />
                </Box>
              </FormControl>
            </React.Fragment>
            <div className="primary-btn">
          {hide ?    <Button
                onClick={() => {
                  setHide(false);
                }}
                rightIcon={<MdArrowForward />}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
              >
                Rate your order
              </Button>:  <Button
                onClick={() => {
                  submitOrderRating(token,productData.id,'cleaning_service',rating,text)
                }}
                rightIcon={<MdArrowForward />}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
              >
              submitOrderRating
                </Button>}
              <h4 className="support">
                Having issue with the order
                <span className="price"> Contact Support?</span>
              </h4>
            </div>
          </div>
        </React.Fragment>
      )}
       <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent style={{alignItems:"center"}}>
      <ModalHeader>Cancel Appointment</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <p>Thank you for your purchase!</p>
    <p>Are you ready to checkout?</p>
      </ModalBody>

      <ModalFooter>
        <Button  style={{background:"#7BB564",color:"white"}} mr={3} onClick={onClose}>
          Close
        </Button>
        <Button colorScheme="#7BB564"  onClick={() => {cancelOrder(productData.stripe_payment_intent)}} style={{border:"1px solid #7BB564"}} variant="ghost">Submit</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
    </React.Fragment>
  );
}

export default Appointment;
