import React from "react";
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookCleaner from "./Pages/BookCleaner";
import BookStorage from "./Pages/BookStorage";
import BookMoveout from "./Pages/BookMoveout";
import ServiceHub from "./Pages/ServiceHub";
import MarketPlace from "./Pages/MarketPlace";
import ItemPage from "./Pages/ItemPage";
import SellerDetails from "./Pages/SellerDetails";
import SellerPage from "./Pages/SellerPage";
import Event from "./Pages/Event";
import Messages from "./Pages/Messages";
function App() {
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
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
