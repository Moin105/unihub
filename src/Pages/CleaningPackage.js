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
import { useLocation ,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MdArrowForward } from "react-icons/md";
import ChakraDatePicker from '../Components/ChakraDatePicker'
import DateTimePicker from 'react-datetime-picker';
import ChakraDateTimePicker from '../Components/ChakraDatePicker'
function CleaningPackage() {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [value, setValue] = useState(new Date());
    const navigate = useNavigate();
    const handleRouteChange = (url, datas) => {
      navigate(url, { state: { data: datas } });
    };
    const BookRequest = async (token, service_id, price_id, date_time, currency) => {
        const url = 'https://admin.myuni-hub.com/api/book_services'; // Replace this with your API URL
        let date = new Date(date_time);

        let yearMonthDay = date.toISOString().slice(0,10); // Gets "2023-05-22"
        let hoursMinutes = date.toISOString().slice(11,16); // Gets "10:40"
        
        let formattedDate = `${yearMonthDay} ${hoursMinutes}`; // Combine date and time
        
        console.log(formattedDate); // Prints: "2023-05-22 10:40"
        
        const formData = new FormData();
        formData.append('service_id', service_id);
        formData.append('price_id', price_id);
        formData.append('date_time', formattedDate);
        formData.append('currency', currency);
      
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data'
          },
        };
      
        try {
          const response = await axios.post(url, formData, config);
          if(response.status == 200){
            alert("Booked Successfully")
            handleRouteChange('/booking',response.data)
          }
          return response;
        } catch (error) {
          console.error(error);
        }
      };
    // const obj = JSON.parse(decodeURIComponent(encodedObj));
  useEffect(() => {
  console.log("qwertyu",data)
  }, [])
  const token = useSelector((state) => state.auth.token);;
  return (
    <div className='bookcleaner'>
    <Header/>
         <div className='wrapper'>
            <h2>
            Book A Cleaner
            </h2>

            <h4>{data.title}</h4>
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
      onClick={()=>{BookRequest(token,data.service_id,data.id,value,'usd')}}
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

export default CleaningPackage