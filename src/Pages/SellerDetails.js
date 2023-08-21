import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Text,
  TabPanel,
  Image,
  extendTheme,
} from "@chakra-ui/react";
import heart from "../Images/Heart.png";
import bookas from "../Images/bookas.png";
import order from "../Images/order.png";
import wallet from "../Images/wallet.png";
import DetailsTab from "./TabContent/DetailsTab";
import Order from "./TabContent/Order";
import events from "../Images/events.png";
import hub from "../Images/saless.png";
import imageCompression from "browser-image-compression";
import Sales from "./TabContent/Sales";
import ticket from "../Images/ticket.png";
import Event from "./StudentSeller/Event";
import Wallet from "./TabContent/Wallet";
import marketplace from "../Images/marketplace.png";
import MyUserId from "./TabContent/MyUserId";
import Appointment from "./TabContent/Appointment";
import axios from "axios";
import Tickets from "./TabContent/Tickets";
import appointment from "../Images/appointment.png";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@chakra-ui/react";
import { setStudentRole } from "../features/UserSlice";
import { fetchUserProfile } from "../thunks/profileThunk";
import profile from "../Images/profile.png";
import "./sellerdetails.css";
import { useNavigate } from "react-router-dom";
// import Event from "./Event";
import Products from "./StudentSeller/Products";
import users from "../Images/users.png";
import Cleaner from "./StudentSeller/Cleaner";
import UserProfile from "../features/UserProfile";
import { toast } from "react-toastify";
function SellerDetails() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const [localImage, setLocalImage] = useState(null);

  useEffect(() => {
    console.log("akbar", switch_profile);
    dispatch(fetchUserProfile());
  }, [dispatch]);
  const theme = extendTheme({
    colors: {
      customColor: {
        200: "#91B375",
      },
    },
  });

  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  const handleToggle = () => {
    // setIsChecked(!isChecked);
    return switchUser();
  };
  const postData = async (url, data, token) => {
    try {
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API response:", response.data.message);
      if (
        response.data.message ===
        "unauthorize user, please add  your bank details first"
      ) {
        handleRouteChange("/bankdetails");
      } else if (response.data.message === "switched to seller successfully!") {
        const successMessage = response.data.message;

        const payload = {
          message: successMessage,
        };
        console.log("payload", payload);
        dispatch(setStudentRole(payload));
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };
  const switch_profile = useSelector((state) => state.auth.seller_switched);
  const token = useSelector((state) => state.auth.token);

  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const switchUser = () => {
    if (!switch_profile) {
      postData(
        "https://admin.myuni-hub.com/api/switch_profile",
        { is_seller: 1 },
        token
      );
      setSelectedTab(1);
    } else {
      const payload = {
        message: "seller",
      };
      console.log("payload", payload);
      dispatch(setStudentRole(payload));
      setSelectedTab(1);
    }
  };

  const userProfileData = useSelector((state) => state);
  const updateUser = async (localImagea) => {
    if (localImagea === null) {
      return toast.error("Please Try Again");
    }
    const formData = new FormData();
    formData.append("profile_img", localImagea);

    try {
      const response = await axios.put(
        "https://admin.myuni-hub.com/api/update_profile?_method=PUT",
        { profile_img: localImagea },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedUser = response.data;
      dispatch(fetchUserProfile());
      console.log("updatedUser", updatedUser);
    } catch (error) {
      // Handle any errors
      console.log(error);
    }
  };

  const handleChangeTab = (index) => {
    setSelectedTab(index);
  };
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };
  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedImage = await imageCompression(imageFile, options);
      console.log("Compressed image:", compressedImage);

      setLocalImage(imageFile);

      updateUser(imageFile); 
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  return (
    <div className="sellerdetails">
      <Header />
      <div className="wrapper">
        <UserProfile />
        <div className="seller">
          <figure>
            <img
              style={{
                objectFit: "contain",
                border: "1px solid #cacaca",
                borderRadius: "1000px",
              }}
              src={
                user?.profile_img
                  ? `https://admin.myuni-hub.com/${user?.profile_img}`
                  : profile
              }
              onClick={handleImageClick}
            />
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }} 
              onChange={handleImageChange}
            />
          </figure>
          <h3>{user?.name}.</h3>
          <div style={{display:"flex",gap:"10px",margin:"20px 0px 0px 0px"}}>
            {" "}
            <p style={{fontWeight:"300"}}>Seller Option</p>
            <Switch
              id="email-alerts"
              isChecked={switch_profile}
              onChange={handleToggle}
              colorScheme="green"
              _checked={{ bg: "customColor.200" }}
              _track={{ bg: "gray.200" }}
            />
          </div>
        </div>
        {switch_profile ? (
          <Tabs
            w="100%"
            mt="10"
            isFitted
            index={selectedTab}
            onChange={handleChangeTab}
          >
            <TabList display="flex">
              <Tab className="tab-contents">
                <Image src={bookas} boxSize="90" />
                <Text>Post A Service</Text>
              </Tab>
              <Tab className="tab-contents">
                <Image src={marketplace} boxSize="90" />
                <Text>Marketplace</Text>
              </Tab>
              <Tab className="tab-contents">
                <Image src={events} boxSize="90" />
                <Text>Events</Text>
              </Tab>
              <Tab className="tab-contents">
                <Image src={hub} boxSize="90" />
                <Text>Sales</Text>
              </Tab>{" "}
            </TabList>
            <TabPanels>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 0 && <Cleaner />}
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 1 && <Products />}
       
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 2 && <Event />}
        
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 3 && <Sales />}
    
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Tabs
            w="100%"
            mt="10"
            isFitted
            index={selectedTab}
            onChange={handleChangeTab}
          >
            <TabList display="flex">
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
                <Image src={appointment} boxSize="50" />
                <Text> Appointments</Text>
              </Tab>
              <Tab className="tab-content">
                <Image src={ticket} boxSize="50" />
                <Text>My Tickets</Text>
              </Tab>
              <Tab className="tab-content">
                <Image src={users} boxSize="50" />
                <Text>My ID</Text>
              </Tab>{" "}
            </TabList>
            <TabPanels>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 0 && <DetailsTab />}
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 1 && <Order />}
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 2 && <Wallet />}
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 3 && <Appointment />}
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 4 && <Tickets />}
              </TabPanel>
              <TabPanel
                justifyContent={"center"}
                display="flex"
                alignItems="center"
              >
                {selectedTab === 5 && <MyUserId />}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SellerDetails;
