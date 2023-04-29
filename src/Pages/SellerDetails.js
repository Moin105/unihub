import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Button,SimpleGrid, Tabs, TabList, TabPanels, Tab,Text, TabPanel ,Image
  } from "@chakra-ui/react";
  import heart from '../Images/Heart.png'
  import order from '../Images/order.png'
  import {MdArrowForward} from 'react-icons/md'
  import wallet from '../Images/wallet.png'
  import DetailsTab from "./TabContent/DetailsTab";
  import Order from "./TabContent/Order";
  import Wallet from "./TabContent/Wallet";
  import Tickets from './TabContent/Tickets'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import profile from '../Images/profile.png';
import './sellerdetails.css'
function SellerDetails() {
  return (
    <div className='sellerdetails'>
        <Header/>
        <div className='wrapper'>
              <div className='seller'>
                    <figure>
                        <img src={profile}/>
                    </figure>
                    <h3>Malik H.</h3>
                    <div><button> sell services</button></div>
              </div>
       <Tabs  w="100%"  mt="10"  isFitted>
          <TabList  display="flex" >
             <Tab className="tab-content"  ><Image src={heart} boxSize="50"/><Text>My Details</Text></Tab>
            <Tab className="tab-content"  ><Image src={order} boxSize="50"/><Text>My Orders</Text></Tab>
            <Tab className="tab-content"  ><Image src={wallet} boxSize="50"/><Text>My Wallets</Text></Tab>
            <Tab className="tab-content"  ><Image src={heart} boxSize="50"/><Text>My Tickets</Text></Tab> </TabList>
          <TabPanels>
            <TabPanel justifyContent={"center"} display="flex" alignItems="center">
               <DetailsTab/>
            </TabPanel>
            <TabPanel  justifyContent={"center"} display="flex" alignItems="center">
              <Order/>
            </TabPanel  >
            <TabPanel  justifyContent={"center"} display="flex" alignItems="center">
              <Wallet/>
            </TabPanel>
            <TabPanel justifyContent={"center"} display="flex" alignItems="center">
              <Tickets/>
            </TabPanel>

          </TabPanels>
        </Tabs>  
        {/* <div className='detailseller'>
            <h5>

            </h5>
            <span></span>
            <h6>

            </h6>
            <p></p>
            <FormControl>
          <p className='tag-label'>Enter your email here</p>      
        <Box border="1px solid #7BB564" borderRadius={30} marginTop="103px">
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Email Address*
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            type="email"
            fontSize="41px"
          />
        </Box>
      </FormControl>
                  <div className="wallet-btn">
        <Button
          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}

        >
          Subscribe
        </Button>
      </div>
        </div>   */}
        </div>
        <Footer/>
    </div>
  )
}

export default SellerDetails