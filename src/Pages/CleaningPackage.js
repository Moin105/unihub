import React, { useEffect, useState, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./bookcleaner.css";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  Radio,
  Input,
  Heading,
  Box,
  Button,
  SimpleGrid,
  extendTheme
} from "@chakra-ui/react";
import DateTime from "react-datetime";
import cleaner from "./../Images/cleaners.png";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { useSelector,useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { MdArrowForward } from "react-icons/md";
import { setService } from "../features/serviceSlice";
import ChakraDatePicker from "../Components/ChakraDatePicker";
import DatePicker from "react-datepicker";
import DateTimePicker from "react-datetime-picker";
import ChakraDateTimePicker from "../Components/ChakraDatePicker";
import "react-datepicker/dist/react-datepicker.css";

function CleaningPackage() {
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const customTheme = extendTheme({
    colors: {
      customGreen: "#7BB564",
    },
  });
  const handelBooking = (selectedOption,availablity)=>{
    console.log("selectedOption",selectedOption,availablity)
    if(selectedOption !== null && availablity.selectedOption !== null){
      console.log("ssss",selectedOption,availablity.selectedOption)
      handleRouteChange(`/cleanerpayment`,{selectedOption,availablity})
    }else{
      console.log("error")
      toast.error("Please Select a time")
    }
}
  const [value, setValue] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };

  const BookRequest = async (
    token,
    service_id,
    price_id,
    date_time,
    currency
  ) => {

    if (token) {
      const url = "https://admin.myuni-hub.com/api/book_services"; 
      let date = new Date(date_time);
      let yearMonthDay = date.toISOString().slice(0, 10)
      let start_time = selectedOption?.start_time
      console.log("staert time",start_time)
      // let hoursMinutes = date.toISOString().slice(11, 16)
      if(start_time == (null || undefined)){
        toast.error("Please Select a time")
      }else{

        let formattedDate = `${yearMonthDay} ${start_time }` 
        console.log(formattedDate,service_id,price_id,currency,data.selectedOption.id,selectedOption); // Prints: "2023-05-22 10:40"
        const formData = new FormData()
        formData.append("service_id", data.selectedOption.service_id)
        formData.append("price_id", data.selectedOption.id)
        formData.append("date_time", formattedDate )
        formData.append("currency", currency)
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.post(url, formData, config);
          if (response.status == 200) {
            dispatch(setService({data:response.data,datas:data,value:value,currency:"EUR"}));
            handleRouteChange("/service-booking",data,value,"£");
            // handleRouteChange("/booking", response.data);
          }
          return response;
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      let date = new Date(date_time);
      let yearMonthDay = date.toISOString().slice(0, 10); // Gets "2023-05-22"
      let hoursMinutes = date.toISOString().slice(11, 16); // Gets "10:40"
      let formattedDate = `${yearMonthDay} ${hoursMinutes}`; // Combine date and time
      console.log(formattedDate); // Prints: "2023-05-22 10:40"
      const formData = new FormData();
      formData.append("service_id", service_id);
      formData.append("price_id", price_id);
      formData.append("date_time", formattedDate);
      formData.append("currency", currency);
      handelBooking(data.selectedOption,{selectedOption,value})
    }
  };

  const handleChange = (id) => {
    const option = data?.availablity?.availability.find((item) => item.id === Number(id));
    setSelectedOption(option);
    console.log(selectedOption);
  };
  useEffect(() => {
    console.log("qwertyu", data);
    const formattedDate = format(value, 'dd MMM yyyy');
    console.log('dd MMM yyyy',formattedDate)
  }, [value]);
  const token = useSelector((state) => state.auth.token);
  return (
    <div className="bookcleaner">
      <Header />
      <div className="wrapper">
        <h2>Book A Cleaner</h2>

        <h4>{data.title}</h4>
        <p className="ouper">
          Check out our availability and book<br></br>the date and time that
          works for you
        </p>
        <p>Select A Date and Time</p>
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
            Selected Date
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="name"
            type="email"
            value={format(value, 'dd MMM yyyy')}
            disabled={false}
          />
        </Box>
        </FormControl>
        <DatePicker
          selected={value}
          onChange={(date) => setValue(date)}
          inline
          minDate={new Date()}
        />
        <p>Select A Time</p>
     <div className="card-cleaner time-slot">
     <RadioGroup colorScheme="customGreen" className="package-box" value={selectedOption?.id.toString()} onChange={handleChange}>
      {data?.availablity?.availability?.map((price, _index) => (
        <Radio colorScheme="customGreen" className='radio-box' style={{ border: "1px solid #7BB564",color:"#7BB564" }} key={price.id} value={price.id.toString()}>
          <span>Time Slot {_index + 1}</span>
          <p className='title'>{price.start_time}</p>
          <p>{price.price}</p>  
        </Radio>
      ))}
    </RadioGroup>
            </div>
        <div className="primary-btn">
          <Button
            onClick={() => {
              BookRequest(token, data.service_id, data.id, value, "EUR");
            }}
            rightIcon={<MdArrowForward />}
            bg="#7BB564"
            color={"white"}
            variant={"solid"}
            width={"100%"}
          >
          Next
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CleaningPackage;
