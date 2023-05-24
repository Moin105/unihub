import React ,{useEffect, useState}from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";

import Signin from "./Pages/Signin";
import ForgetPassword from "./Pages/ForgetPassword";
import Details from "./Pages/Details";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import OrderPlaced from "./Pages/OrderPlaced";
import BookServices from "./Pages/BookServices";
import Qrpage from "./Pages/Qrpage";
import CleaningPackage from "./Pages/CleaningPackage";
import { BrowserRouter as Router, Routes, Route,Navigate, Outlet } from "react-router-dom";
import BookCleaner from "./Pages/BookCleaner";
import BookStorage from "./Pages/BookStorage";
import BookMoveout from "./Pages/BookMoveout";
import ServiceHub from "./Pages/ServiceHub";
import GuestBookCleaner from "./Pages/Guest/GuestBookCleaner";
import MarketPlace from "./Pages/MarketPlace";
import ItemPage from "./Pages/ItemPage";
import SellerDetails from "./Pages/SellerDetails";
import SellerPage from "./Pages/SellerPage";
import SellService from "./Pages/SignUpSeller/SellService";
import Event from "./Pages/Event";
import Messages from "./Pages/Messages";
import SignUpSeller from "./Pages/SignUpSeller/SignUpSeller";
import EventBuyer from "./Pages/EventBuyer";
import EventPackage from "./Pages/EventPackage";
import GuestEvent from "./Pages/Guest/GuestEvent";
import GuestMarketPlace from "./Pages/Guest/GuestMarketPlace";
import { useSelector } from "react-redux";
import TwoFactor from "./Pages/TwoFactor";
import NormalSellerDetails from "./Pages/SignUpSeller/SellerDetails";
function App() {
  const  token  = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  
  useEffect(() => {
  if(token){
    console.log("treu")
 return   setIsAuthenticated(true)
  }else{
    setIsAuthenticated(false)
  }
  }, [])
  const dynamicRoute = {
    path: "/bookcleaner/:dynamicId",
    element: <CleaningPackage />,
    name: "CleaningPackage  ",
  };
  const dynamicEventRoute = {
    path: "/events/:dynamicId",
    element: <EventPackage />,
    name: "EventPackage  ",
  };
  const dynamicItemRoute = {
    path: "/item/:dynamicId",
    element: <ItemPage />,
    name: "ItemPage  ",
  };
  const buyerRoutes = [
    { path: "/", element: <Details />, name: "Details" },
    {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/marketplace" ,element:<MarketPlace />,name:"MarketPlace"},
    // {path:"/itemdetail" ,element:<ItemPage />,name:"BookServices"},
    {path:"/details",element:<Home />,name:"Home"},
    {path:"/bookcleaner" ,element:<BookCleaner /> ,name:"BookCleaner"},
    {path:"/bookstorage" ,element:<BookStorage /> , name:"BookStorage" } ,
    { path: "/signupseller", element: <SignUpSeller />, name: "SignupSeller" },
    {path:"/booking" ,element:<OrderPlaced />,name:"OrderPlaced"},
    {path:"/home" ,element:<Home />,name:"OrderPlaced"},
    dynamicRoute,
    dynamicEventRoute,dynamicItemRoute,
    // {path:'/event',element:<Event/>,name:"Event"},
    {path:'/events' ,element:<EventBuyer/>,name:"BookEvent"},
    {path:'/messages',element:<Messages/>,name:"Messages"},
    // {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/sellerdetails" ,element:<SellerDetails />,name:"SellerDetails"},
    // other buyer-only routes here
  ];

  const sellerRoutes = [
    { path: "/", element: <Details />, name: "Seller" },
    {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/marketplace" ,element:<MarketPlace />,name:"MarketPlace"},
    {path:"/itemdetail" ,element:<ItemPage />,name:"BookServices"},
    {path:"/details",element:<Home />,name:"Home"},
    { path: "/signupseller", element: <SignUpSeller />, name: "SignupSeller" },
    // {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/sellerdetails" ,element:<SellerDetails />,name:"SellerDetails"},
     {path:"/sellService" ,element:<SellService/> , name:"SellService" },
    {path:"/Home",element:<Details />,name:"Details"},
    // other seller-only routes here
  ];
  const NormalSellerRoutes = [
    { path: "/", element: <Details />, name: "Seller" },
    // {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/seller-details" ,element:<NormalSellerDetails />,name:"SellerDetails"},
     {path:"/sellService" ,element:<SellService/> , name:"SellService" },
    {path:"/Home",element:<Details />,name:"Details"},
    // other seller-only routes here
  ];
  const guestRoutes = [
    { path: "/services", element:   <BookServices />, name: "Guest" },
    { path: "/login", element: <Signin />, name: "Login" },
    { path: "/otp", element: <TwoFactor />, name: "TwoFactor" },
    { path: "/signupseller", element: <SignUpSeller />, name: "SignupSeller" },
    {path:"/signup" ,element:<Signup />,name:"Signup"},
    {path:"/bookstorage" ,element:<BookStorage /> , name:"BookStorage" } ,
    {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/bookcleaner" ,element:<GuestBookCleaner/> ,name:"BookCleaner"},
    {path:"/bookmoveout" ,element:<BookMoveout /> ,name:"BookMoveout"},
    { path: "/", element: <Details />, name: "Details" },
    {path:'/bookevent' ,element:<EventBuyer/>,name:"BookEvent"},
    {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/marketplace" ,element:<GuestMarketPlace />,name:"MarketPlace"},
    {path:"/itemdetail" ,element:<ItemPage />,name:"BookServices"},
    {path:"/details",element:<Home />,name:"Home"},
    {path:"/bookcleaner" ,element:<BookCleaner /> ,name:"BookCleaner"},
    {path:"/bookstorage" ,element:<BookStorage /> , name:"BookStorage" } ,

    {path:"/forgetpassword" ,element:<ForgetPassword /> , name:"ForgetPassword" } ,
    { path: "/signupseller", element: <SignUpSeller />, name: "SignupSeller" },
    dynamicRoute,
    dynamicEventRoute,dynamicItemRoute,
    // {path:'/event',element:<Event/>,name:"Event"},
    {path:'/event' ,element:<GuestEvent/>,name:"BookEvent"},
    {path:'/messages',element:<Messages/>,name:"Messages"},
    // {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    // {path:"/sellerdetails" ,element:<SellerDetails />,name:"SellerDetails"},
    dynamicRoute,
    // other guest-only routes here
  ];
  // const authenticatedRoutes = isSeller == true ? sellerRoutes : buyerRoutes ;
  const authenticatedRoutes = NormalSellerRoutes;
  return (
    <div className="App">
    <Router>
  <Routes>
        {isAuthenticated ? (
          authenticatedRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))
        ) : (
          guestRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))
        )}
        <Route path="*" element={<>no page or page is restricted</>} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
