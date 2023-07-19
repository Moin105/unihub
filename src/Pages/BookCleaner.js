import React, { useEffect, useState, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./bookcleaner.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  Radio,
  Input,
  Box,
  Button,
  SimpleGrid,
  extendTheme,
} from "@chakra-ui/react";
import cleaner from "./../Images/cleaners.png";
import { MdArrowForward } from "react-icons/md";
import { id } from "date-fns/locale";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BookCleaner() {
  const [data, setData] = useState([]);
  const [detailedData, setDetailedData] = useState([]);
  const [availablity,setAvailablity ]=useState([])
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  useEffect(() => {
    fetchData();
    console.log(data.providers);
  }, []);
  const customTheme = extendTheme({
    colors: {
      customGreen: "#7BB564",
    },
  });
  const headers = { Authorization: `Bearer ${token}` };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://admin.myuni-hub.com/api/all_services",
        {
          headers,
        }
      );
      setData(response.data.services);
      console.log("biloll", response.data.services);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const memoizedData = useMemo(() => data, [data]);
  const [packages, setPackages] = useState([]);
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  // useEffect(() => {
  //   return encodedObj
  // }, [selectedOption])
  const handelBooking = (selectedOption,availablity)=>{
    console.log("selectedOption",selectedOption,availablity)
    if(selectedOption && availablity){
      handleRouteChange(`/bookcleaner/:${selectedOption?.id}`,{selectedOption,availablity})
    }else{
      console.log("error")
      toast.error("Please Select Package")
    }
}
  const encodedObj = encodeURIComponent(JSON.stringify(selectedOption));
  useEffect(() => {
    console.log("fatiha", selectedOption);
    // return selectedOption
  }, [selectedOption]);

  const handleRadioChange = (event) => {
    const id = event.target.value;
    console.log(id);
    const option = data.find((item) => item.id === parseInt(id));
    setSelectedOption(option);
    console.log("option");
  };
  return (
    <div className="bookcleaner">
      <Header />
      <div className="wrapper">
        <h2>Book A Cleaner</h2>
      
        {memoizedData?.map((item, index) => {
          return (
            <div key={index} className="card-cleaner">
                <figure>
          <img src={item?.cover_img  ?`https://admin.myuni-hub.com/${item.cover_img}` :cleaner} />
        </figure>
              <h4>{item.title}</h4>
              <ul>
                <p>{item.descreption}</p>
              </ul>
              <h4>Select Package</h4>
              <RadioGroup colorScheme="customGreen" className="package-box">
                {item.prices.map((price, _index) => (
                   <Radio onChange={ (event) => {
                    const    id = event.target.value;
                       console.log(id)
                       const option = item.prices.find((item) => item.id === parseInt(id));
                       setSelectedOption(option);setAvailablity(item);
                      
                     }} style={{border:"1px solid #7BB564",color:"#7BB564" }} key={price.id} value={price.id.toString()}>
        
                    <p className='title'>{price.title}</p>
                   <p> {price.price}</p>  
                  </Radio>
                ))}
              </RadioGroup>
              {item.prices.map((price, index) => {
                <div className="price-box" key={index}>
                  <p className="title">{price.title}</p>
                </div>;
              })}
                  <div className="primary-btn">
          <Button
            rightIcon={<MdArrowForward />}
            bg="#7BB564"
            color={"white"}
            variant="solid"
            width={"100%"}
            onClick={() => handelBooking(selectedOption,availablity)
            }
          >
            Next
          </Button>
        </div>
            </div>
          );
        })}
    
      </div>
      <Footer />
    </div>
  );
}

export default BookCleaner;
