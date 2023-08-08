import React, { useEffect,useState,useMemo } from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import { Checkbox } from '@chakra-ui/react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './bookcleaner.css'
import DatePicker from "react-datepicker";
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,RadioGroup,Radio,
  Input,Heading,
  Label,
  Box,
  Button,SimpleGrid
} from "@chakra-ui/react";
import DateTime from 'react-datetime';
import cleaner from './../Images/cleaners.png'
import { useSelector,useDispatch } from 'react-redux'
import { useLocation,useNavigate } from 'react-router-dom'
import { setEvent } from '../features/eventSlice'
import { MdArrowForward } from "react-icons/md";
import ChakraDatePicker from '../Components/ChakraDatePicker'
import DateTimePicker from 'react-datetime-picker';
import ChakraDateTimePicker from '../Components/ChakraDatePicker'
function    EventPackage() {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const dispatch = useDispatch()
    const [value, setValue] = useState(new Date());
    const navigate = useNavigate();
    const handleRouteChange = (url, datas) => {
      navigate(url, { state: { data: datas } });
    };
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
          console.log("mjhgfcbfbgff",response.data)
          if(response.data.message === "Intent Generated Successfully!"){
            dispatch(setEvent({"response":response,"data":data}))
            handleRouteChange(`/eventsummary`)
          
          }
        
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
            <h2 style={{textTransform:"capitalize"}}>
           {data?.detailedData?.title}
            </h2>

            <h4>{data?.title}</h4>
          {data?.detailedData?.descreption  ? data?.detailedData?.descreption :<p className='ouper'>Check out our availability and book<br></br> the date and time that works for you</p>}
            {/* <pre>{JSON.stringify(obj.id, null, 2)}</pre> */}
            
          <Box m={0} border="none" display={"flex"} width={"70%"} alignItems={"center"} gap={"10"} borderWidth="1px" borderRadius="lg" p={4}>
          <FormLabel as="h3" size="md" mb={2}>
            Selected Date & Time
          </FormLabel> 
           <FormLabel as="h3" size="md" mb={2} style={{color:"#7BB564"}}>{data?.detailedData?.date_time}</FormLabel>
            </Box> 
            <Box m={0} flexDirection={"column"} width={"70%"} style={{width:"70%"}} border="none" display={"flex"} borderWidth="1px" borderRadius="lg" p={4}>
            <FormLabel as="h3" size="md" mb={2}>
            Timezone:
            </FormLabel>
            <FormLabel as="h3" size="md" mb={2} color={"#7BB564"}>
Greenwich Mean Time (GMT)
            </FormLabel>
           </Box>
           <Box m={0} border="none" display={"flex"} width={"70%"} alignItems={"center"} gap={"10"} borderWidth="1px" borderRadius="lg" p={4}>
          <FormLabel as="h3" size="md" mb={2}>
          Event Location: 
          </FormLabel> 
           <FormLabel as="h3" size="md" mb={2} style={{color:"#7BB564"}}>East University UK</FormLabel>
            </Box> 

            <div className="card-cleaner" style={{width:"65%",margin:"0 auto"}}>
               <div  className='package-box'>

               <Radio  style={{border:"1px solid #7BB564",color:"#7BB564" }} defaultChecked  >
            <p className='title'>{data?.selectedOption?.title}</p>
           <p> {data?.selectedOption?.price}</p>  
          </Radio>
        {/* {item.prices.map((price,_index) => (
    
          <Radio onChange={ (event) => {
            const    id = event.target.value;
               console.log(item)
               const option = item.prices.find((item) => item.id === parseInt(id));
               setDetailedData(item)
         return      setSelectedOption(option);
              
             }} style={{border:"1px solid #7BB564",color:"#7BB564" }} key={price.id} value={price.id.toString()}>

            <p className='title'>{price.title}</p>
           <p> {price.price}</p>  
          </Radio>
     
        ))} */}
      </div>
            </div>
                <div className="primary-btn">
      <Button 
      onClick={()=>{BookRequest(token,data.selectedOption.event_id,data.selectedOption.id,'EUR')}}
      // onClick={() =>
      //   handleRouteChange(
      //     `/eventsummary`,
      //   )
      // }
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