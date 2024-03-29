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
} from "@chakra-ui/react";
import cleaner from "./../Images/cleaners.png";
import { MdArrowForward } from "react-icons/md";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function EventBuyer() {
  const [data, setData] = useState(null);
  const [detailedData, setDetailedData] = useState([]);
  const navigate = useNavigate();
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
 const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    fetchData();
    console.log("ghariya", memoizedData);
  }, []);

  const headers = { Authorization: `Bearer ${token}` };
  const fetchData = async () => {
    try {
      // const response = await axios.get("https://admin.myuni-hub.com/api/events", {
         const response = await axios.post("https://admin.myuni-hub.com/api/all_events", {
          filter:"uni_id_match"
        },{

        headers,
      });
      setData(response.data.events);
      console.log("biloll", response.data.events);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const memoizedData = useMemo(() => data, [data]);
  const [selectedOption, setSelectedOption] = useState(null);

  const encodedObj = encodeURIComponent(JSON.stringify(selectedOption));
  useEffect(() => {
    console.log("fatiha", data);
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
        <h2>Book An Event</h2>
    
        {data == null ? (
          <h2> No Events yet</h2>
        ) : (
          <>
            {memoizedData?.map((item, index) => {
              return (
                <>
                <figure>
                <img src={item?.cover_img ?  `https://admin.myuni-hub.com/${item.cover_img}` :cleaner} />
              </figure>
                <div key={index} className="card-cleaner">
                  <h4>{item.title}</h4>
                  <ul>
                    <p>{item.descreption}</p>
                  </ul>
                  <h4>Select Package</h4>
                  {/* <div className='package-box'> */}
                  <RadioGroup  className='package-box'>
                    
        {item.prices.map((price,_index) => (
    
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
            onClick={() =>
              handleRouteChange(
                `/events/:${selectedOption?.id}`,
               { selectedOption,detailedData}
              )
            }
          >
            Next
          </Button>
        </div>
                </div>
              </>);
            })}
          
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default EventBuyer;
