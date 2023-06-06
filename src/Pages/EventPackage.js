import React, { useEffect,useState,useMemo } from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import { Checkbox } from '@chakra-ui/react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './bookcleaner.css'
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,RadioGroup,Radio,
  Input,Heading,
  Box,
  Button,SimpleGrid
} from "@chakra-ui/react";
import DateTime from 'react-datetime';
import cleaner from './../Images/cleaners.png'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { MdArrowForward } from "react-icons/md";
import ChakraDatePicker from '../Components/ChakraDatePicker'
import DateTimePicker from 'react-datetime-picker';
import ChakraDateTimePicker from '../Components/ChakraDatePicker'
function    EventPackage() {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [value, setValue] = useState(new Date());
    // const token = useSelector((state) => state.auth.token);
    const token = useSelector((state) => state.auth.token);;
    const BookRequest = async (token, event_id, price_id, currency) => {
   if(token) {    const url = 'https://admin.myuni-hub.com/api/book_event';
        const formData = new FormData();
        formData.append('event_id', event_id);
        formData.append('price_id', price_id);
        formData.append('currency', currency);
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.post(url, formData, config);
          return response.data;
        } catch (error) {
          console.error(error);
        }}else{
          console.log("brother")
        }
      };
    // const obj = JSON.parse(decodeURIComponent(encodedObj));
  useEffect(() => {
  console.log("qwertyu",data)
  }, [])
  return (
    <div className='bookcleaner'>
    <Header/>
         <div className='wrapper'>
            <h2>
            Book An Event
            </h2>

            <h4>{data?.title}</h4>
            <p className='ouper'>Check out our availability and book<br></br> the date and time that works for you</p>
            {/* <pre>{JSON.stringify(obj.id, null, 2)}</pre> */}
            
          <Box m={0} className='outline-box date-wrapper' borderWidth="1px" borderRadius="lg" p={4}>
          <Heading as="h3" size="md" mb={2}>
            Selected Date
          </Heading> 
          <DateTime
        value={value}
        onChange={setValue}
      />
           {/* <DateTimePicker
        value={value}
        onChange={setValue}
        disableClock={false}
        calendarIcon={null}
        clearIcon={null}
        format="y-MM-dd h:mm a"
      />  */}
          {/* <Input value={date} variant="unstyled"/> */}
        </Box> 
        {/* <ChakraDatePicker date={date} setDate={setDate} /> */}
      
                <div className="primary-btn">
      <Button 
      onClick={()=>{BookRequest(token,data.event_id,data.id,'usd')}}
        rightIcon={<MdArrowForward />}
        bg="#7BB564"
        color={"white"}
        variant="solid"
        width={"100%"}

      >
        Next
      </Button>
    </div>
         </div>
        <Footer/> 
  </div>
  )
}

export default EventPackage