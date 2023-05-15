import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import drinks from "./../../Images/drinks.png";
import kitchen from "./../../Images/kitchen.png";
import stationary from "./../../Images/stationary.png";
import books from "./../../Images/books.png";
import item from "./../../Images/item.png";
import "./../marketplace.css";
import "../../responsive.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import servicetag from "./../../Images/servicetag.png";
import axios from "axios";

function GuestMarketPlace() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
const handleRouteChange = (url,datas) => {
  navigate(url, { state: { data: datas } });
};
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://34.233.35.208/api/guest_all_products",
      );
      return setData(response.data.products);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  useEffect(() => {
    getData();
    console.log("ap dhillon", data);
  }, []);

  return (
    <div className="marketplace">
      <Header />
      <div className="wrapper">
        <h2>Marketplace</h2>
        <div className="upper-container">
          <h5>Products</h5>
          <p>
            Checkout our products provided by one expert vendors and select{" "}
            <br></br> the needed one.
          </p>
        </div>
        <div className="middle-container">
          {/* <h5>Categories</h5>
          <div className="categories-container">
            <div className="category-box">
              <figure>
                <img src={drinks} />
              </figure>
              <p>Drinks</p>
            </div>
            <div className="category-box">
              <figure>
                <img src={books} />
              </figure>
              <p>Book Shop Supplies</p>
            </div>
            <div className="category-box">
              <figure>
                <img src={stationary} />
              </figure>
              <p>Stationery</p>
            </div>
            <div className="category-box">
              <figure>
                <img src={kitchen} />
              </figure>
              <p>Home & Kitchen</p>
            </div>
          </div> */}
        </div>

        <div className="item-container">
          <h4>Items</h4>
          <div className="items-wrapper">
            {data.map((item, index) => {
              return (
                // <Link to="/itemdetail">
                  <div className="item-box"           onClick={() => handleRouteChange(`/item/:${item?.id}`,item)}>
                    <figure>
                      <img src={`http://34.233.35.208/${item.cover_img}`} />
                    </figure>
                    <p>{item.name}</p>
                  </div>
                // </Link>
              );
            })}
            {/* <Link to="/itemdetail">
            <div className="item-box">
              <figure>
                <img src={item} />
              </figure>
              <p>Kirkland Still Water</p>
            </div>
          </Link> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GuestMarketPlace;
