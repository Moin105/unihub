import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Box,
    Button,SimpleGrid
  } from "@chakra-ui/react";
  import './servicehub.css'
  import {BsCheckLg} from 'react-icons/bs'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import camera from './../Images/camera.png'
import { Link } from 'react-router-dom';
import {MdArrowForward} from 'react-icons/md'
// import {MdArrowDropDown} from 'react-icons/md'
// import camera from './../Images/'
function Event() {
  return (
    <div className='servicehub'>
        <Header/>
        <div className='wrapper'>
            <h2>Post Event</h2>
            {/* <h4>Sell Service</h4> */}
            <p>Sell your services and get the customers to <br></br> get benefits of services.</p>
            <div className='values-container'>
                <div className='outline-box'>
                      <h3>Select Service</h3>
                      <p>Express Cleaning</p>
                </div>
                <div className='outline-boxs' >
                      <h3>Service Description</h3>
                      <p>- Hoovering and Sweeping </p>
                      <p>- Dust, Wipe & Disinfect All Surfaces</p>
                </div>
               <h5>Package 1</h5>
               <div className='values-container'>
               {/* <Select icon={<MdArrowDropDown />} placeholder='Woohoo! A new icon' /> */}
                <div className='outline-box'>
                      <h3>Package Name</h3>
                      <p>Non-Ensuit</p>
                </div>
                <div className='outline-box'>
                      <h3>Price</h3>
                      <p>£25</p>
                </div>
               </div>
               <h5>Package 2</h5>
               <div className='values-container'>
                <div className='outline-box'>
                      <h3>Package Name</h3>
                      <p>Ensuit / Studio</p>
                </div>
                <div className='outline-box'>
                      <h3>Price</h3>
                      <p>£25</p>
                </div>
               </div>
               select university
            <div className='image-container'>
                   <figure>
                    <img src={camera}/>
                   </figure>
                   <p>
                   Upload Service Image
                   </p>
            </div>
            <h5>Uploaded Files</h5>
               <div className='values-container'>
                <div className='outline-box'>
                      <h3>ServiceImage.jpge/.png</h3>
                      {/* <p>Ensuit / Studio</p> */}
                </div>
                {/* <div className='outline-box'>
                      <h3>Price</h3>
                      <p>£25</p>
                </div> */}
               </div>
          
        <div className='confirm-notification'>
             <span>
<BsCheckLg/>
             </span>
             <p>
             You have uploaded product image
             </p>
            </div>      </div>
            <div className="wallet-btn">
     <Link to="/messages">   <Button
          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
          // onClick={()=>{setShow(false)}}
        >
          Post Service
        </Button></Link>
      </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Event