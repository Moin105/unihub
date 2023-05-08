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
import { BrowserRouter as Router, Routes, Route,Navigate, Outlet } from "react-router-dom";
import BookCleaner from "./Pages/BookCleaner";
import BookStorage from "./Pages/BookStorage";
import BookMoveout from "./Pages/BookMoveout";
import ServiceHub from "./Pages/ServiceHub";
import MarketPlace from "./Pages/MarketPlace";
import ItemPage from "./Pages/ItemPage";
import SellerDetails from "./Pages/SellerDetails";
import SellerPage from "./Pages/SellerPage";
import SellService from "./Pages/SignUpSeller/SellService";
import Event from "./Pages/Event";
import Messages from "./Pages/Messages";
import { set } from "date-fns";
import SignUpSeller from "./Pages/SignUpSeller/SignUpSeller";

function App() {
  const  token  = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(1);
  useEffect(() => {
  if(token){
    setIsAuthenticated(true)
  }else{
    setIsAuthenticated(false)
  }
  }, [])
  
  const buyerRoutes = [
    { path: "/buyer", element: <Outlet />, name: "Buyer" }
    // other buyer-only routes here
  ];

  const sellerRoutes = [
    { path: "/", element: <Details />, name: "Seller" },

    {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/marketplace" ,element:<MarketPlace />,name:"MarketPlace"},
    {path:"/itemdetail" ,element:<ItemPage />,name:"BookServices"},
    {path:"details",element:<Home />,name:"Home"},
    { path: "/signupseller", element: <SignUpSeller />, name: "SignupSeller" },
    {path:"/bookservices" ,element:<BookServices />,name:"BookServices"},
    {path:"/sellerdetails" ,element:<SellerDetails />,name:"SellerDetails"},
     {path:"/sellService" ,element:<SellService/> , name:"SellService" },
    {path:"/Home",element:<Details />,name:"Details"},
    // other seller-only routes here
  ];

  const guestRoutes = [
    { path: "/", element: <Home />, name: "Guest" },
    { path: "/login", element: <Signin />, name: "Login" },
    { path: "/signupseller", element: <SignUpSeller />, name: "SignupSeller" },
    {path:"/signup" ,element:<Signup />,name:"Signup"},
    // other guest-only routes here
  ];
  const authenticatedRoutes = isSeller == 1 ? sellerRoutes : buyerRoutes;

  return (
    <div className="App">
      {/* <Switch>
        <Route exact path="/">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/qrpage">
          <Qrpage />
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/details">
          <Details />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/orderplaced">
          <OrderPlaced />
        </Route>
        <Route path="/bookservices">
          <BookServices />
        </Route>
      </Switch> */}
      {/* <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/qrpage" element={<Qrpage />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/details" element={<Details />} />
          <Route path="/orderplaced" element={<OrderPlaced />} />
          <Route path="/bookservices" element={<BookServices />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/bookcleaner" element={<BookCleaner />} />
          <Route path="/bookstorage" element={<BookStorage />} />
          <Route path="/bookmoveout" element={<BookMoveout />} />
          <Route path="/servicehub" element={<ServiceHub />} />
          <Route path="/event" element={<Event />} />
          / <Route path="/messages" element={<Messages />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/itemdetail" element={<ItemPage />} />
          <Route path="/sellerdetails" element={<SellerDetails />} />
          <Route path="/sellerpage" element={<SellerPage />} />
        </Routes>
      </Router> */}
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
