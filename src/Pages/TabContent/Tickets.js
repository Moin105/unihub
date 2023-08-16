
import React,{useEffect,useState} from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import "./ticket.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'
import "../../responsive.css";

import { MdArrowForward } from "react-icons/md";
function Order() {
  const token = useSelector((state)=> state.auth.token)
  const [ticket,setTicket] = useState([])
  const [form,setForm] = useState({booking_id:"" ,price:"",quantity:"",email:'',currency:"EUR"})
  const [ticketData,setTicketData] = useState([])
  const [hide,setHide] = useState(false)
  const getData = async () => {
    try {
      const response = await axios.get("https://admin.myuni-hub.com/api/book_event", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("ticketa",response.data.events);
      setTicket(response.data.events);
      // setCards(response.data.cards);
      
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  useEffect(() => {
    getData();
  // if(cards.length > 0){
  //   setHide(false)
  // }
  }, [])
  const url = 'https://admin.myuni-hub.com/api/book_event/generate_selling_qr';
 useEffect(() => {
   if(ticketData){
      setForm({...form,booking_id:ticketData.id,quantity:ticketData.quantity,})
   }
 }, [ticketData])
  
 
  const generateQR = async (data) => {
    if(data.email == ''){
      toast.error("Please enter email")
      return
    }
    if (data.email === 'email' && !/\S+@\S+\.\S+/.test(data.email)) {
      toast.error('Invalid email address');
    }
    if(data.price == ''){
      toast.error("Please enter price")
      return
    }
    try {
      const response = await axios.post(url, data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
   if(response.data.status == 200){
    setHide(false)
   }
      // Assuming the response contains the link to be used in QR code
     
    } catch (error) {
      console.error('There was an error generating the QR code:', error);
    }
  };
  const navigate = useNavigate();
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  function getDate(datetimeString) {
    const date = datetimeString.split(' ')[0];
    return date;
  }
  function getTime(datetimeString) {
    const time = datetimeString.split(' ')[1];
    return time;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation example for email
  

    // Add more validation logic for other fields if needed

    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <div className="tab-tickets">
      <h2>MyTickets</h2>
   { ticket && ticket.length <0 ?  <>
     
      <span className="lower">You haven’t placed any orders yet.</span>
      <div className="primary-btn">
        <Button
          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
          onClick={()=>{handleRouteChange("/events")}}
        >
          Start browsing
        </Button>
      </div></> : <>
      <div className="my-products">

        <p>
          Checkout our products provided by one expert vendors and select the
          needed one
        </p>
     {hide == false ?    <> 
        <div className="product-heading">
          <h3>Tickets List</h3>
          <button onClick={()=> handleRouteChange("/events")}>Browse Events</button>
        </div>
      <div className="product-listing">
   <>   {ticket ?   <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        {ticket?.map((item, index) => (
          <tr key={index}>
            <td>{item.event.title}</td>
           <td>{getDate(item.event.date_time)}</td>
           <td style={{color:"#7BB564"}}>{getTime(item.event.date_time)}</td>
           <td style={{display:"flex",flexDirection:"column" ,color:"#7BB564"}}  ><span style={{cursor:"pointer"}} onClick={()=>{handleRouteChange('/qrcode',item.qr_code)}}>Generate QR</span>
           <span style={{cursor:"pointer"}} onClick={()=>{setHide(true);setTicketData(item)}}>Transfer</span></td>
        </tr>
        ))}
      </tbody>
        </table> : 
       <p>You Donot Have Any Product Yet!</p> 
        }</>  
      </div>   
      </>: <>
        <div className="transfer">
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" />
     
              <button onClick={()=>{generateQR(form)}}>Send Request</button>
      
        </div>
        </>}
      </div>
      </>}
    </div>
  );
}

export default Order;
