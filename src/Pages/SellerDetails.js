import React,{useEffect} from 'react'
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
  import bookas from '../Images/bookas.png'
  import order from '../Images/order.png'
  import {MdArrowForward} from 'react-icons/md'
  import wallet from '../Images/wallet.png'
  import DetailsTab from "./TabContent/DetailsTab";
  import Order from "./TabContent/Order";
  import events from "../Images/events.png";
  import hub from "../Images/hub.png";

  import Wallet from "./TabContent/Wallet";
  import marketplace from '../Images/marketplace.png'
  import axios from 'axios';
  import Tickets from './TabContent/Tickets'
import Header from '../Components/Header';
import { openModal } from '../features/modalSlice';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';

import { setStudentRole } from '../features/UserSlice';
import { fetchUserProfile } from '../thunks/profileThunk';
import profile from '../Images/profile.png';
import './sellerdetails.css'
import { useNavigate } from 'react-router-dom';
import Event from './Event';
import PostProduct from './StudentSeller/PostProduct';
import Products from './StudentSeller/Products';
function SellerDetails() {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const handleRouteChange = (url,datas) => {
    navigate(url, { state: { data: datas } });
  };
  const postData = async (url, data,token) => {
    try {
      const response = await axios.put(url, data,{
        headers: {
          'Authorization': `Bearer ${token}`
        }});
      console.log('API response:', response.data.message);
      if (response.data.message === "unauthorize user, please add  your bank details first") {
        // dispatch(openModal(response.message));
        console.log("aa ki dewfgr")
        handleRouteChange('/bankdetails')
      }else if(response.data.message === "switched to seller successfully!"){
        const successMessage = response.data.message;
  
        console.log("younas")
        const payload = {
          message: successMessage,
        };
      
        dispatch(setStudentRole(payload));
      
      }
      // Handle success response here
    } catch (error) {
      console.error('API error:', error);
      // Handle error response here
    }
  };
const  token = useSelector((state) => state.auth.token);
  const switchUser = () => {

    postData('https://admin.myuni-hub.com/api/switch_profile',{is_seller:1},token)
  };
const switch_profile = useSelector((state) => state.auth.seller_switched);
  useEffect(() => {
    console.log("akbar",switch_profile)
    dispatch(fetchUserProfile());
    // if(switch_profile == true){
    //   handleRouteChange('/sellerpage')
    // } 
  }, [dispatch]);
  const userProfileData = useSelector((state) => state);

  return (
    <div className='sellerdetails'>
        <Header/>
        <div className='wrapper'>
              <div className='seller'>
                    <figure>
                        <img src={profile}/>
                    </figure>
                    <h3>{userProfileData?.profile?.name}.</h3>
                    <div><button onClick={switchUser}> sell services</button></div>
              </div>
    {switch_profile ?   <Tabs  w="100%"  mt="10"  isFitted>
          <TabList  display="flex" >
             <Tab className="tab-contents"  ><Image src={bookas} boxSize="90"/><Text>Book A Service</Text></Tab>
            <Tab className="tab-contents"  ><Image src={marketplace} boxSize="90"/><Text>Marketplace</Text></Tab>
            <Tab className="tab-contents"  ><Image src={events} boxSize="90"/><Text>Events</Text></Tab>
            <Tab className="tab-contents"  ><Image src={hub} boxSize="90"/><Text>Hub</Text></Tab> </TabList>
          <TabPanels>
            <TabPanel
              justifyContent={"center"}
              display="flex"
              alignItems="center"
            >
              <Event/>
              {/* <DetailsTab /> */}
            </TabPanel>
            <TabPanel
              justifyContent={"center"}
              display="flex"
              alignItems="center"
            >
              {/* <Order /> */}
              <Products/>
{/* <PostProduct/> */}
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
              <Tickets />
            </TabPanel>
          </TabPanels>
        </Tabs>:  
        <Tabs  w="100%"  mt="10"  isFitted>
          <TabList  display="flex" >
             <Tab className="tab-content"  ><Image src={heart} boxSize="50"/><Text>My Details</Text></Tab>
            <Tab className="tab-content"  ><Image src={order} boxSize="50"/><Text>My Orders</Text></Tab>
            <Tab className="tab-content"  ><Image src={wallet} boxSize="50"/><Text>My Wallets</Text></Tab>
            <Tab className="tab-content"  ><Image src={heart} boxSize="50"/><Text>My Tickets</Text></Tab> </TabList>
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
              <Tickets />
            </TabPanel>
          </TabPanels>
        </Tabs>}
            </div>
      <Footer />
    </div>
  );
}

export default SellerDetails;
