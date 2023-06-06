import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import profile from "../Images/profile.png";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Text,
  TabPanel,
  Image,
} from "@chakra-ui/react";
import "../responsive.css";
import heart from "../Images/Heart.png";
import order from "../Images/order.png";
import "./home.css";
// import "../responsive.css";
import wallet from "../Images/wallet.png";
import DetailsTab from "./TabContent/DetailsTab";
import Order from "./TabContent/Order";
import Wallet from "./TabContent/Wallet";
import ReviewCard from "../Components/ReviewCard";
import ServiceTag from "../Components/ServiceTag";
import Tickets from './TabContent/Tickets'

import hub from "../Images/hub.png";
import marketplace from "../Images/marketplace.png";
import bookas from "../Images/bookas.png";
import events from "../Images/events.png";
import event from "../Images/event.png";
import servicetag from "../Images/servicetag.png";
import rating from "../Images/rating.png";
// import './details.css'
import "./sellerpage.css";
// import './BookServices'
import { Link } from "react-router-dom";
function SellerPage() {
  return (
    <div className="sellerpage">
      <Header />
      <div className="wrapper">
        <div className="seller">
          <figure>
            <img src={profile} />
          </figure>
          <h3>Become a seller! </h3>
          <div>What do you need to sell?</div>
        </div>
        <div className="servicetags-container">
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
          {/* <Link to="/bookservices">
            <ServiceTag icon={bookas} name="Book a Service" />
          </Link>

          <Link to="/marketplace">
            {" "}
            <ServiceTag icon={marketplace} name="Marketplace" />
          </Link>
          <Link>
            <ServiceTag icon={events} name="Events" />
          </Link>
          <Link to="/servicehub">
            <ServiceTag icon={hub} name="HUB" />
          </Link> */}
        </div>
        <React.Fragment>
          {/*  */}
          <div className="review-card">
            <div className="circle">
              <figure>
                <img src={servicetag} />
              </figure>
            </div>
            <div className="rowta">
              <h5>Kevin Mark</h5>
              <figure>
                <img src={rating} />
              </figure>
              <p>Excellent Services, I’d Definitely Recommend Them</p>
              {/* <p>{comment}</p> */}
            </div>
          </div>
        </React.Fragment>
        <div className="event">
          <h4>Book An Event Ticket</h4>
          <img src={event} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SellerPage;
