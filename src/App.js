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
import BankPage from "./Pages/BankPage";
import { BrowserRouter as Router, Routes, Route,Navigate, Outlet,useLocation } from "react-router-dom";
import BookCleaner from "./Pages/BookCleaner";
import ProductPayment from "./Pages/Guest/ProductPayment";
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
import Cart from "./Pages/TabContent/Cart";
import SignUpSeller from "./Pages/SignUpSeller/SignUpSeller";
import EventBuyer from "./Pages/EventBuyer";
import EventPackage from "./Pages/EventPackage";
import GuestEvent from "./Pages/Guest/GuestEvent";
import GuestMarketPlace from "./Pages/Guest/GuestMarketPlace";
import { useSelector,useDispatch } from "react-redux";
import TwoFactor from "./Pages/TwoFactor";
import NormalSellerDetails from "./Pages/SignUpSeller/SellerDetails";
import PostCleaner from "./Pages/StudentSeller/PostCleaner";
import PostEvent from "./Pages/StudentSeller/PostEvent";
import PostProduct from "./Pages/StudentSeller/PostProduct";
import PaymentForm from "./Pages/Guest/PaymentForm";
import CleanerPayment from "./Pages/Guest/CleanerPayment";
import BookingSummary from "./Pages/BookingSummary";
import CheckOutPage from "./Pages/Checkout";
import Loading from "./Pages/Spinner";
import { ToastContainer } from "react-toastify";
// import EventSummaryPage from "./Pages/EventSummaryPage"
import EventSummaryPage from "./Pages/EventSummary";
import { fetchUserProfile } from "./thunks/profileThunk";
import ServiceSummary from "./Pages/ServiceSummary";
import EventSummury from "./Pages/EventSummury";
import Products from "./Pages/StudentSeller/Products";
import Chat from "./Pages/Chat";
function App() {
  // const  token  = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const role  = useSelector((state) => state.auth.role);
  const seller = useSelector((state) => state.auth.user?.is_seller);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userProfile);

  useEffect(() => {
    console.log("start 1",userProfileData)
    // console.log("hwlllooo",userProfileData.profile.email)
    dispatch(fetchUserProfile());
  }, [dispatch]);
  useEffect(() => {
    console.log(auth)
  if(token !== null){
    console.log("treu")
 return   setIsAuthenticated(true)
  }else if (token == null){
    setIsAuthenticated(false)
  }
  }, [token])
  useEffect(() => {
  
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
  const dynamicProducts = {
    path: "/product/:dynamicId",
    element: <PostProduct />,
    name: "Products",
  }
  const dynamicServices = {
    path: "/service/:dynamicId",
    element: <PostCleaner />,
    name: "Cleaner",
  }
  const dynamicEvents = {
    path: "/event/:dynamicId",
    element: <PostEvent />,
    name: "Events",
  }
  const dynamicChats = {
    path:"/chat-with-seller",
    element: <Chat/>,
    name:"chat-with-seller"
  }
  const buyerRoutes = [
    { path: "/noprobs", element: <Details />, name: "Details" },
    { path: "/", element: <Details />, name: "Details" },
    {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/marketplace" ,element:<MarketPlace />,name:"MarketPlace"},
    // {path:"/itemdetail" ,element:<ItemPage />,name:"BookServices"},
    {path:"/details",element:<Home />,name:"Home"},
    {path:"/bookcleaner" ,element:<BookCleaner /> ,name:"BookCleaner"},
    {path:"/event-booking",element:<EventSummury/> , name:"EventBooking"},
    {path:"/bookstorage" ,element:<BookStorage /> , name:"BookStorage" } ,
  {path:"/eventsummary",element:<EventSummaryPage/> , name:"EventSummaryPage" } ,
    {path:"/bankdetails",element:<BankPage/>,name:"BankPage"},
    { path: "/signupseller", element: <SignUpSeller />, name: "SignupSeller" },
    {path:'/cart',element:<Cart/>,name:"Cart"},
    {path:"/qrcode",element:<Qrpage />,name:"Qrpage"},
    {path:"/booking" ,element:<OrderPlaced />,name:"OrderPlaced"},
    {path:"/order-booking",element:<BookingSummary/>,name:"BookingSummary"},
    {path:"/addevent",element:<PostEvent/>,name:"PostCleaner"},
    {path:"/service-booking",element:<ServiceSummary/>,name:"ServiceSummary"},
    {path:"/sellerpage", element:<SellerPage/>,name:"SellerPage"},
    {path:"/home" ,element:<Home />,name:"OrderPlaced"},
    dynamicRoute,dynamicChats,
    ,dynamicProducts,dynamicServices,
    {path:"/cleanerpayment",element:<CleanerPayment/>,name:"CleanerPayment"},
    {path:"/checkout",element:<CheckOutPage/>,name:"CheckOutPage"},
    dynamicEventRoute,dynamicItemRoute,dynamicEvents,
    
    {path:"/addservice", element:<PostCleaner/>,name:"PostCleaner"},
    // {path:'/event',element:<Event/>,name:"Event"},
    {path:'/events' ,element:<EventBuyer/>,name:"BookEvent"},
    {path:'/messages',element:<Messages/>,name:"Messages"},
    {path:"/addProduct",element:<PostProduct/>,name:"PostProduct"},
    // {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/sellerdetails" ,element:<SellerDetails />,name:"SellerDetails"},
    // other buyer-only routes here
  ];

  // const sellerRoutes = [
  //   { path: "/", element: <Details />, name: "Seller" },
  //   {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
  //   {path:"/marketplace" ,element:<MarketPlace />,name:"MarketPlace"},
  //   {path:"/itemdetail" ,element:<ItemPage />,name:"BookServices"},
  //   {path:"/bankdetails",element:<BankPage/>,name:"BankPage"},
  //   {path:"/details",element:<Home />,name:"Home"},
  //   {path:"/addcleaner", element:<PostCleaner/>,name:"PostCleaner"},
  //   {path:"/addevent",element:<PostEvent/>,name:"PostCleaner"},
  //   {path:"/addproduct",element:<PostProduct/>,name:"PostCleaner"},
  //   { path: "/signupseller", element: <SignUpSeller />, name: "SignupSeller" },
  //   // {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
  //   {path:"/sellerdetails" ,element:<SellerDetails />,name:"SellerDetails"},
  //    {path:"/sellService" ,element:<SellService/> , name:"SellService" },
  //   {path:"/Home",element:<Details />,name:"Details"},
  //   // other seller-only routes here
  // ];
  const NormalSellerRoutes = [
    { path: "/", element: <NormalSellerDetails />, name: "Seller" },
    // {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/seller-details" ,element:<NormalSellerDetails />,name:"SellerDetails"},
     {path:"/sellService" ,element:<NormalSellerDetails/> , name:"SellService" },
    {path:"/Home",element:<Details />,name:"Details"},    
    {path:"/bankdetails",element:<BankPage/>,name:"BankPage"},
    {path:"/addevent",element:<PostEvent/>,name:"PostCleaner"},
    {path:'/messages',element:<Messages/>,name:"Messages"},
    {path:"/addProduct",element:<PostProduct/>,name:"PostProduct"},dynamicProducts,
    dynamicEvents,dynamicServices,dynamicChats,
    {path:"/addservice", element:<PostCleaner/>,name:"PostCleaner"},

    
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
    {path:"/paymentform" , element:<PaymentForm />,name:"PaymentForm"},
    {path:'/bookevent' ,element:<EventBuyer/>,name:"BookEvent"},
    {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/cleanerpayment" ,element:<CleanerPayment />,name:"payment cleaner"},
    {path:"/marketplace" ,element:<GuestMarketPlace />,name:"MarketPlace"},
    {path:"/itemdetail" ,element:<ItemPage />,name:"BookServices"},
    {path:"/productpayment" ,element:<ProductPayment />,name:"payment product"},
    {path:"/details",element:<Home />,name:"Home"},
    {path:"/bookcleaner" ,element:<BookCleaner /> ,name:"BookCleaner"},
    {path:"/bookstorage" ,element:<BookStorage /> , name:"BookStorage" } ,
    {path:"/forgetpassword" ,element:<ForgetPassword /> , name:"ForgetPassword" } ,
    { path: "/signupseller", element: <SignUpSeller />, name: "SignupSeller" },
    dynamicRoute,
    dynamicEventRoute,dynamicItemRoute,
    // {path:'/event',element:<Event/>,name:"Event"},
    {path:'/guest-event' ,element:<GuestEvent/>,name:"BookEvent"},
    {path:'/messages',element:<Messages/>,name:"Messages"},
    
    // {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    // {path:"/sellerdetails" ,element:<SellerDetails />,name:"SellerDetails"},
    dynamicRoute,
      ];
  return (
    <div className="App">
      <ToastContainer/>
    <Router>
      <Loading>
  <Routes>
        {isAuthenticated ? (<>
      {/* {role == "student" && seller == 0  &&  sellerRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))} */}
      {role == "student" && buyerRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
       {role == "seller" &&   NormalSellerRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}   
          
          </>
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
      </Loading>
    </Router>

    </div>
  );
}

export default App;
