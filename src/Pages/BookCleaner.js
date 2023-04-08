import React from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import { Checkbox } from '@chakra-ui/react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './bookcleaner.css'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,SimpleGrid
} from "@chakra-ui/react";
import cleaner from './../Images/cleaners.png'
import { MdArrowForward } from "react-icons/md";
function BookCleaner() {
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
                  <div className='card-cleaner'>
                       <h4>Express</h4>
                        <ul>
                            <li>- Hoovering and Sweeping </li>
                            <li>- Dust, Wipe & Disinfect All Surfaces</li>
                        </ul>
                        <h4>Select Package</h4>
                     
                  </div>
                  <div className="wallet-btn">
        <Button
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

export default BookCleaner