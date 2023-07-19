import React, { useEffect,useState,useMemo } from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import { Checkbox } from '@chakra-ui/react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import './../bookcleaner.css'

import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,RadioGroup,Radio,
  Input,
  Box,
  Button,SimpleGrid
} from "@chakra-ui/react";
import cleaner from './../../Images/cleaners.png'
import { MdArrowForward } from "react-icons/md";
import { id } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'

function GuestEvent() {
const [data, setData] = useState([]);
const [detailedData, setDetailedData] = useState([]);
const navigate = useNavigate();
const handleRouteChange = (url,datas) => {
  navigate(url, { state: { data: datas } });
};
  useEffect(() => {
    fetchData();
    console.log(data.providers)
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://admin.myuni-hub.com/api/guest_all_events',);
      setData(response.data.events);
      console.log("biloll",response.data.events)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const memoizedData = useMemo(() => data, [data]);
  const [packages, setPackages]=useState([])
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
// useEffect(() => {
//   return encodedObj
// }, [selectedOption])
const encodedObj = encodeURIComponent(JSON.stringify(selectedOption));
useEffect(() => {
  console.log("fatiha",selectedOption)
  // return selectedOption
},[selectedOption])
  // useEffect(() => {
  //   // Function to fetch detailed data for an item using its ID
  //   const fetchDetailedData = async (id) => {
  //     try {
  //       const response = await axios.get(`http://34.233.35.208/api/all_services/${id}`,{
  //         headers
  //       });
  //       console.log("biloll",response.data)
  //       return response.data;
  //     } catch (error) {
  //       console.error('Error fetching detailed data:', error);
  //     }
  //   };
  
  //   // Iterate through the data and make API calls using their IDs
  //   const fetchDataForItems = async () => {
  //     const detailedDataArray = await Promise.all(memoizedData.map(item => fetchDetailedData(item.id)));
  //  return   setDetailedData(detailedDataArray);
  //   };
  
  //   if (data.length > 0) {
  //     fetchDataForItems();
  //   }
  //   console.log("detaileddata",detailedData)
  // }, [data]);
  
  const handleRadioChange = (event) => {
 const    id = event.target.value;
    console.log(id)
    const option = data.find((item) => item.id === parseInt(id));
    setSelectedOption(option);
    console.log("option",)
  };
  return (
    <div className='bookcleaner'>
      <Header/>
           <div className='wrapper'>
              <h2>
              Book An Event
              </h2>
              <figure>
                 <img src={cleaner}/>
              </figure>
              {memoizedData?.map((item,index)=>{
                // onClick={()=>{handleRouteChange(`/paymentform`)}}
                return (
                  <div key={index} className='card-cleaner' >
                  <h4>{item.title}</h4>
                   <ul>
                      <p>{item.descreption}</p>
                   </ul>
                   {/* <h4>Select Package</h4> */}
                   {/* <div className='package-box'> */}
                   <RadioGroup  className='package-box'>
                    
        {item.prices.map((price,_index) => (
    
          <Radio onChange={ (event) => {
            const    id = event.target.value;
               console.log(id)
               const option = item.prices.find((item) => item.id === parseInt(id));
         return      setSelectedOption(option);
              
             }} style={{border:"1px solid #7BB564",color:"#7BB564" }} key={price.id} value={price.id.toString()}>

            <p className='title'>{price.title}</p>
           <p> {price.price}</p>  
          </Radio>
     
        ))}
      </RadioGroup>
                   {item.prices.map((price,index)=>{
                    <div className='price-box' key={index} >
                      <p className='title'>{price.title}</p>
                    </div>
                   })
                   }
                   <div className="primary-btn">
                  {/* <Link to={{pathname:`/bookcleaner/:${selectedOption?.id}`,state: {selectedOption},}}> */}
                        <Button
          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
          onClick={() => handleRouteChange(`/paymentform`,selectedOption)}
        >
          Next
        </Button>
        {/* </Link> */}
      </div>
             </div>
                )
              })}
                  {/* <div className='card-cleaner'>
                       <h4>Express</h4>
                        <ul>
                            <li>- Hoovering and Sweeping </li>
                            <li>- Dust, Wipe & Disinfect All Surfaces</li>
                        </ul>
                        <h4>Select Package</h4>
                     
                  </div> */}
                  
           </div>
          <Footer/> 
    </div>
  )
}

export default GuestEvent;