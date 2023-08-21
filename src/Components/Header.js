import React, { useState } from "react";
import "./styles.css";
import "../App.css";
import logo from "../Images/logo.png";
import cart from "../Images/cart.png";
import user from "../Images/user.png";
import dropdown from "../Images/dropdown.png";
import marketa from "../Images/marketa.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../features/UserSlice";
import { IoMdLogOut } from "react-icons/io";
import { BsFillChatLeftFill } from "react-icons/bs";
function Header() {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state)=>state.auth.role)
  const cartItems = useSelector((state) => state.cart.items.products);
  const [show, setShow] = useState(false);
  console.log("role",role)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <figure className="logo">
            <img src={logo} />
          </figure>
        </Link>
        <div className="nav">
          {" "}
      {role !== "seller"   ?  <figure
            style={{ position: "relative" }}
            className="media-icon"
            onClick={() => {
              setShow(!show);
            }}
          >
            <img src={dropdown} />
            {show && (
              <div
                style={{
                  position: "absolute",
                  background: "#91B375",
                  padding: "20px",
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                  borderRadius: "0px 0px 50px 50px",
                  left: "-20px",
                  zIndex:"1000000",
                  top: "40px",
                }}
                className="dropdown"
              >
                {" "}
             {token &&   <Link to="/messages">
                <figure className="media-icon">
                  <BsFillChatLeftFill />
                </figure>
                </Link>}
            {role !== 'seller' &&   <Link to="/marketplace">
                <figure className="media-icon">
                  <img src={marketa} />
                </figure>
                </Link>}
                <Link to={token ? "/sellerdetails" : "/login"}>
                <figure className="media-icon">
                  <img src={user} />
                </figure>
                </Link>
              </div>
            )}
          </figure> : <Link to="/messages">
                <figure className="media-icon">
                  <BsFillChatLeftFill />
                </figure>
                </Link>}
      {role !== "seller" ?   <Link to="/cart">
            <figure className="media-icon">
              <img src={cart} />
              {cartItems && cartItems?.length >= 1 ? (
                <span className="count">{cartItems.length}</span>
              ) : null}
            </figure>
          </Link>:
           <Link to={token ? "/seller-details" : "/login"}>
           <figure className="media-icon">
             <img src={user} />
           </figure>
           </Link>
          }

          {token && (
            <>
              <figure
                className="media-icon"
                onClick={() => {
                  dispatch(clearToken());
                  handleRouteChange("/");
                }}
              >
                <IoMdLogOut />
              </figure>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
