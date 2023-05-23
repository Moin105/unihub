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
  import order from '../Images/order.png'
  import {MdArrowForward} from 'react-icons/md'
  import wallet from '../Images/wallet.png'
  import DetailsTab from "./TabContent/DetailsTab";
  import Order from "./TabContent/Order";
  import Wallet from "./TabContent/Wallet";
  import axios from 'axios';
  import Tickets from './TabContent/Tickets'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../thunks/profileThunk';
import profile from '../Images/profile.png';
import './sellerdetails.css'
const postData = async (url, data,token) => {
  try {
    const response = await axios.put(url, data,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    console.log('API response:', response);
    // Handle success response here
  } catch (error) {
    console.error('API error:', error);
    // Handle error response here
  }
};
function SellerDetails() {
  const switchUser = () => {
    // fetch("http://34.233.35.208/api/switch_profile",{
    //   method:"PUT",
    //   body:JSON.stringify({is_seller:1}),
    //   headers:{
    //     "Content-Type":"application/json",
    //     "Authorization":localStorage.getItem("token")
    //   }
    // })
    // .then((res)=>res.json())
    postData('https://admin.myuni-hub.com/api/switch_profile',{is_seller:1},localStorage.getItem("token"))
  };
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hwlllooo")
    // console.log("hwlllooo",userProfileData.profile.email)
    dispatch(fetchUserProfile());
  }, [dispatch]);
  const userProfileData = useSelector((state) => state.userProfile.data);

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
                  <div className="primary-btn">
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
      <Footer />
    </div>
  );
}

export default SellerDetails;
