// import React, { useEffect, useState } from "react";
// import {
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   FormHelperText,
//   Input,
//   Textarea,
//   Box,
//   Button,
//   useEditable,
// } from "@chakra-ui/react";
// import "./order.css";
// import "../../responsive.css";
// import filter from "../../Images/filter.png";
// import ordei from '../../Images/ordei.png'
// import { useSelector } from "react-redux";
// import { MdArrowForward } from "react-icons/md";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { get } from "react-hook-form";
// // import Rating from "../../Components/Rating";
// // import { ThemeProvider, CSSReset } from "@chakra-ui/core";

// function Order() {
//   const [show, setShow] = useState(true);
//   const [hide, setHide] = useState(true);
//   const [orders, setOrders] = useState([]);
//   const [showData ,setShowData] = useState(false)
//   const [productData,setProductData] = useState({})
//   const token = useSelector((state) => state.auth.token);
//   let data = [];
//   const getServices = async () => {
//     try {
//       const response = await axios.get(
//         "https://admin.myuni-hub.com/api/book_services",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.services; // return data instead of console.log
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   };
//   const fetchData = async () => {
//     try {
//         const [services, products] = await Promise.all([
//             getServices(),
//       ]);

//       data = [ ...services];
//       setOrders(data);
//       console.log("hor disda", data);
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   };
//   const navigate = useNavigate();
//   const handleRouteChange = (url, datas) => {
//     navigate(url, { state: { data: datas } });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   function formatDate(dateStr) {
//     const date = new Date(dateStr);
//     const day = date.getDate();
//     const month = date.toLocaleString('default', { month: 'short' });
//     const year = date.getFullYear();
  
//     return `${day} ${month} ${year}`;
//   }
  
//   return (
//     <React.Fragment>
//       {show ? (
//         <div className="tab-order">
//           <h2>My Appointments</h2>
//           <span className="upper">
//             View your order history or check the status of a recent appointments.
//           </span>
//           {/* <p>Login email : Malik.h123@gmail.com</p> */}
//           {orders.length < 0 ? (
//             <React.Fragment>
//               <span className="lower">You haven’t placed any orders yet.</span>
//               <div className="primary-btn">
//                 <Button
//                   onClick={() => {
//                     handleRouteChange("/");
//                   }}
//                   rightIcon={<MdArrowForward />}
//                   bg="#7BB564"
//                   color={"white"}
//                   variant="solid"
//                   width={"100%"}
//                 >
//                   Start browsing
//                 </Button>
//               </div>
//             </React.Fragment>
//           ) : (
//        !showData ?     <React.Fragment>
//               <div className="row">
//                 <p>All Sales</p>
//                 <figure>
//                   <img src={filter} />
//                 </figure>
//               </div>
//               <div className="order-list">
//               {
//                 orders.map((order,index)=>{
//                   return   <div className="order-row" onClick={()=>{console.log("ewed",order)}}>
//                   <figure >
//                     <img src={ordei} />
//                   </figure>
//                   <div className="order-details">
//                     <div className="ordername">
//                       <h3>Order#{order.id}</h3>  <p>{order.price.price || order.price }EUR</p>
//                     </div>
//                     <p>{formatDate(order.created_at)}</p>
//                   </div>
//                 </div>
//                 })
//               }
              
//               </div>
//               <div className="primary-btn">
//                 {/* <Button
//                   onClick={() => {
//                     setHide(false);
//                   }}
//                   rightIcon={<MdArrowForward />}
//                   bg="#7BB564"
//                   color={"white"}
//                   variant="solid"
//                   width={"100%"}
//                 >
//                   Start browsing
//                 </Button> */}
//               </div>
//             </React.Fragment>:<>
//             <div className="summary" style={{textAlign:"left"}}>
//               <h2>Order Summary</h2>
//                <p style={{margin:"5px 0px",textTransform:"capitalize"}}>{ productData?.products[0]?.name}</p>
//                <p style={{margin:"5px 0px"}}>Quantity { productData.quantity}</p>
//                <h3 style={{color:"#7BB564",margin:"5px 0px"}}>{`£ ${productData.price}  `}</h3>
//                <div className="primary-btn">
//                 <Button
//                   onClick={() => {
//                     console.log("assadasd")
//                   }}
//                   rightIcon={<MdArrowForward />}
//                   bg="#7BB564"
//                   color={"white"}
//                   variant="solid"
//                   width={"100%"}
//                 >
//                   Rate your order
//                 </Button>
//           </div> 
//           </div>
            
//             </>
//           )}
//         </div>
//       ) : (
//         <React.Fragment>
//           <div className="tab-order">
//             <h2>Order Summery</h2>
//             <p className="order-details">wqd</p>
//             <h4 className="heading">qwdqw</h4>
//             <h4 className="heading">wqdqw</h4>
//             <p className="price"> qwdw </p>
//             <React.Fragment>
//               <h4 className="heading">Rating</h4>
//               {/* <Rating
//         size={48}
//         icon="star"
//         scale={5}
//         fillColor="#7BB564"
//         strokeColor="transparent"
//       />
//       <CSSReset/> */}
//               <h4 className="heading">Feedback</h4>
//               <FormControl className="form-control">
//                 <Box
//                   className="input-container"
//                   border="1px solid #7BB564"
//                   borderRadius={30}
//                   marginTop="103px"
//                 >
//                   <FormLabel
//                     padding="20px 0px 0px 20px"
//                     fontSize="37px"
//                     fontWeight={300}
//                   >
//                     Name
//                   </FormLabel>
//                   <Textarea placeholder="Enter text here" />
//                 </Box>
//               </FormControl>
//             </React.Fragment>
//             <div className="primary-btn">
//               <Button
//                 onClick={() => {
//                   setHide(false);
//                 }}
//                 rightIcon={<MdArrowForward />}
//                 bg="#7BB564"
//                 color={"white"}
//                 variant="solid"
//                 width={"100%"}
//               >
//                 Rate your order
//               </Button>
//               <h4 className="support">
//                 Having issue with the order
//                 <span className="price"> Contact Support?</span>
//               </h4>
//             </div>
//           </div>
//         </React.Fragment>
//       )}
//     </React.Fragment>
//   );
// }

// export default Order;
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Box,
  Button,
  useEditable,
} from "@chakra-ui/react";
import "./order.css";
import "../../responsive.css";
import filter from "../../Images/filter.png";
import ordei from '../../Images/ordei.png'
import { useSelector } from "react-redux";
import { MdArrowForward } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { get } from "react-hook-form";
import StarRating from "./Rating";
import {toast} from 'react-toastify'
// import Rating from "../../Components/Rating";
// import { ThemeProvider, CSSReset } from "@chakra-ui/core";

function Appointment() {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(true);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);
  const [showData ,setShowData] = useState(false)
  const [productData,setProductData] = useState({})
    // Define the state for the textarea value
    const [text, setText] = useState('');
   

function submitOrderRating(token, order_id, order_type, rating, message) {
  const url = 'https://admin.myuni-hub.com/api/order_review'; // Change to your API endpoint
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
  return (
    <React.Fragment>
      {show ? (
        <div className="tab-order">
          <h2>My Appointments</h2>
          <span className="upper">
            View your order history or check the status of a recent order.
          </span>
          {/* <p>Login email : Malik.h123@gmail.com</p> */}
          {orders.length < 0 ? (
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
                  return   <div className="order-row" onClick={()=>{setShowData(true);setProductData(order)}}>
                  <figure >
                    <img src={ordei} />
                  </figure>
                  <div className="order-details">
                    <div className="ordername">
                      <h3>Order#{order.id}</h3>  <p>{order.price.price || order.price }EUR</p>
                    </div>
                    <p>{formatDate(order.created_at)}</p>
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
    </React.Fragment>
  );
}

export default Appointment;
