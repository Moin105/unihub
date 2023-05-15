// page 6
import React,{useEffect} from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../Theme/theme";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Text,
  TabPanel,
  Image,
} from "@chakra-ui/react";
import "./home.css";
import "../responsive.css";
import heart from "../Images/Heart.png";
import order from "../Images/order.png";

import wallet from "../Images/wallet.png";
import Header from "../Components/Header";
import DetailsTab from "./TabContent/DetailsTab";
import Footer from "../Components/Footer";
import Order from "./TabContent/Order";
import Wallet from "./TabContent/Wallet";
import { fetchUserProfile } from "../thunks/profileThunk";
import Tickets from './TabContent/Tickets'
import { useDispatch,useSelector } from "react-redux";
import { Link } from 'react-router-dom'
// import Tickets from "./TabContent/Tickets";
// import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userProfile.data);

  useEffect(() => {
    console.log("hwlllooo",userProfileData)
    // console.log("hwlllooo",userProfileData.profile.email)
    dispatch(fetchUserProfile());
  }, [dispatch]);
  return (
    <React.Fragment>
      <div className="home-page">
        <Header />
        <div className="wrapper">
          {/* <ChakraProvider theme={theme}> */}
          <Tabs w="100%" mt="10" isFitted>
            <TabList display="flex" paddingInline={5}>
              <Tab className="tab-content">
                <Image src={heart} boxSize="50" />
                <Text>My Details</Text>
              </Tab>
              <Tab className="tab-content">
                <Image src={order} boxSize="50" />
                <Text>My Orders</Text>
              </Tab>
              <Tab className="tab-content">
                <Image src={wallet} boxSize="50" />
                <Text>My Wallets</Text>
              </Tab>
              <Tab className="tab-content">
                <Image src={heart} boxSize="50" />
                <Text>Appointments</Text>
              </Tab>
              <Tab className="tab-content">
                <Image src={heart} boxSize="50" />
                <Text>My Tickets</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                <DetailsTab />
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                <Order />
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                <Wallet />
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                <p>Appointments</p>
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                <Tickets />
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* </ChakraProvider> */}
        </div>
        <Footer />
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
