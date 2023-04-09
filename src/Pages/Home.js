// page 6
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../Theme/theme"
import { Tabs, TabList, TabPanels, Tab,Text, TabPanel ,Image} from "@chakra-ui/react";
import './home.css'
import heart from '../Images/Heart.png'
import order from '../Images/order.png'

import wallet from '../Images/wallet.png'
import Header from "../Components/Header";
import DetailsTab from "./TabContent/DetailsTab";
import Footer from "../Components/Footer";
import Order from "./TabContent/Order";
import Wallet from "./TabContent/Wallet";
import Tickets from './TabContent/Tickets'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <React.Fragment>
      <div className="home-page">
        <Header/>
        <div className="wrapper"> 
      {/* <ChakraProvider theme={theme}> */}
        <Tabs  w="100%"  mt="10"  isFitted>
          <TabList  display="flex" >
            <Tab style={{width:"348px",height:"328px",border:"none",fontSize:"41px",fontWeight:"300",display:"flex",flexDirection:"column",gap:"20px"}} ><Image src={heart} boxSize="84"/><Text>My Details</Text></Tab>
            <Tab style={{width:"348px",height:"328px",border:"none",fontSize:"41px",fontWeight:"300",display:"flex",flexDirection:"column",gap:"20px"}} ><Image src={order} boxSize="84"/><Text>My Orders</Text></Tab>
            <Tab style={{width:"348px",height:"328px",border:"none",fontSize:"41px",fontWeight:"300",display:"flex",flexDirection:"column",gap:"20px"}} ><Image src={wallet} boxSize="84"/><Text>My Wallets</Text></Tab>
            <Tab style={{width:"348px",height:"328px",border:"none",fontSize:"41px",fontWeight:"300",display:"flex",flexDirection:"column",gap:"20px"}} ><Image src={heart} boxSize="84"/><Text>Appointments</Text></Tab>
            <Tab style={{width:"348px",height:"328px",border:"none",fontSize:"41px",fontWeight:"300",display:"flex",flexDirection:"column",gap:"20px"}} ><Image src={heart} boxSize="84"/><Text>My Tickets</Text></Tab>
          </TabList>
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
              <p>Appointments</p>
            </TabPanel>
            <TabPanel justifyContent={"center"} display="flex" alignItems="center">
              <Tickets/>
            </TabPanel>

          </TabPanels>
        </Tabs>
        {/* </ChakraProvider> */}
        </div>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default Home;

// 5 tabs
{
  // my details  6
  // my orders  7 10 11 12
  // my wallets 8 9 13 14
  // appointments
  // my tickets 15
  // 16
}
