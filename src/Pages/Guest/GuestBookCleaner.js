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
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import cleaner from "./../../Images/cleaners.png";
import { MdArrowForward } from "react-icons/md";
import { id } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function GuestBookCleaner() {
const [data, setData] = useState([]);
const [detailedData, setDetailedData] = useState([]);
const [availablity,setAvailablity ]=useState([])
const navigate = useNavigate();
const handleRouteChange = (url,datas)  => {
  navigate(url, { state: { data: datas } });
};
const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    fetchData();
    console.log(data.providers)
  }, []);

  const headers = { Authorization: `Bearer ${token}` };
  const fetchData = async () => {
    try {
      const response = await axios.get('https://admin.myuni-hub.com/api/guest_all_service_providers');
      setData(response.data.providers);
      console.log("guest",response.data.providers)
      
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
useEffect(() => {
    const fetchDetailedData = async (id) => {
      try {
        const response = await axios.get(`https://admin.myuni-hub.com/api/guest_all_services_of_provider/${id}`);
        console.log("biloll",response.data)
        return response.data.services;
      } catch (error) {
        console.error('Error fetching detailed data:', error);
      }
    };
  
    const fetchDataForItems = async () => {
      const detailedDataArray = [];
      console.log("hailer",memoizedData)
      const fetchedData = await Promise.all(memoizedData.map(item => fetchDetailedData(item.id)));
  console.log("mainu nae jeena",fetchedData)
    //   fetchedData.forEach(item => {
    //     if (!detailedDataArray.find(el => el.id === item.id)) { // replace 'id' with the actual unique identifier in your objects
    //       detailedDataArray.push(item);
    //     }
    //   });
  console.log("hails",)
      setDetailedData(fetchedData);
    };
  
    if (data.length >= 0) {
      fetchDataForItems();
    }
    console.log("detailedData", detailedData)
  }, [data]);
  
  const memoizedServices = useMemo(() => detailedData, [data]);
  useEffect(() => {
    console.log(memoizedData)
  }, [detailedData])
  
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
              Book A Cleaner
              </h2>
              <figure>
                 <img src={cleaner}/>
              </figure>
              {detailedData[0]?.map((item,index)=>{
                return (
                  <div key={index} className='card-cleaner'>
                  <h4>{item.title}</h4>
                   <ul>
                      <p>{item.descreption}</p>
                   </ul>32
                   <h4>Select Package</h4>
                   {/* <div className='package-box'> */}
                   <RadioGroup  className='package-box'>
                    
        {item.prices.map((price,_index) => (
    
          <Radio onChange={ (event) => {
            const    id = event.target.value;
               console.log(id)
               const option = item.prices.find((item) => item.id === parseInt(id));
               setSelectedOption(option);setAvailablity(item);
              
             }} style={{border:"1px solid #7BB564"}} key={price.id} value={price.id.toString()}>

            <p className='title'>{price.title}</p>
           <p> {price.price}</p>  
          </Radio>
     
        ))}
      </RadioGroup>
                   {item.prices.map((price,index)=>{
                    <div className='price-box' key={index}>
                      <p className='title'>{price.title}</p>
                      {/* <Checkbox onChange={(e) => console.log(e.target.checked)}>{price.price}
      </Checkbox>  */}
                    </div>
                   })
                   }
                   {/* </div> */}
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
                  <div className="primary-btn">
                  {/* <Link to={{pathname:`/bookcleaner/:${selectedOption?.id}`,state: {selectedOption},}}> */}
                        <Button
          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
          onClick={() => handleRouteChange(`/cleanerpayment`,{selectedOption,availablity})}
        >
          Next
        </Button>
        {/* </Link> */}
      </div>
           </div>
          <Footer/> 
    </div>
  );
}

export default GuestBookCleaner;
