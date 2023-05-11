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
import { useLocation } from 'react-router-dom'
import { MdArrowForward } from "react-icons/md";
import ChakraDatePicker from '../Components/ChakraDatePicker'
import DateTimePicker from 'react-datetime-picker';
import ChakraDateTimePicker from '../Components/ChakraDatePicker'
function    EventPackage() {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [value, setValue] = useState(new Date());
    const BookRequest = async (token, event_id, price_id, currency) => {
        const url = 'http://34.233.35.208/api/book_event'; // Replace this with your API URL

        
        const formData = new FormData();
        formData.append('event_id', event_id);
        formData.append('price_id', price_id);
        formData.append('currency', currency);
      
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data'
          },
        };
      
        try {
          const response = await axios.post(url, formData, config);
          return response.data;
        } catch (error) {
          console.error(error);
        }
      };
    // const obj = JSON.parse(decodeURIComponent(encodedObj));
  useEffect(() => {
  console.log("qwertyu",data)
  }, [])
  const token = localStorage.getItem("token");
  return (
    <div className='bookcleaner'>
    <Header/>
         <div className='wrapper'>
            <h2>
            Book An Event
            </h2>

            <h4>{data.title}</h4>
            <p className='ouper'>Check out our availability and book<br></br> the date and time that works for you</p>
            {/* <pre>{JSON.stringify(obj.id, null, 2)}</pre> */}
            
          <Box m={0} className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
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
      
                <div className="wallet-btn">
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