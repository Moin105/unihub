import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../Pages/servicehub.css";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
function Event() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  // all products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 1,
    name: "",
    descreption: "",
    price: "",
    stock: "",
    image: null,
  });
  const location = useLocation();
  const data = location.state ? location.state.data : null;

  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  const handleInputChange = (event, fieldName) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://admin.myuni-hub.com/api/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ludwig", response.data);
      setProducts(response.data.data);
      console.log("ludwig", products);
    } catch (error) {
      console.error(error);
      console.log("lugwig", error.response.data.message);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.name === "" ||
      formData.descreption === "" ||
      formData.price === "" ||
      formData.stock === "" ||
      formData.image === null
    ) {
      if (formData.name === "") {
        toast.error("Please enter product name", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      if (formData.descreption === "") {
        toast.error("Please enter product description", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      if (formData.price === "") {
        toast.error("Please enter product price", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      if (formData.stock === "") {
        toast.error("Please enter product stock", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      if (formData.image === null) {
        toast.error("Please upload product image", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
    } else {
      const data = new FormData();
      for (const key in formData) {
        if (key === "image") {
          data.append("image", formData[key], formData[key].name);
        } else {
          data.append(key, formData[key]);
        }
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };

      try {
        const response = await axios.post(
          "https://admin.myuni-hub.com/api/products",
          data,
          config
        );
        setFormData({
          category_id: 1,
          name: "",
          descreption: "",
          price: "",
          stock: "",
          image: null,
        });
        toast.success("Form submitted successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchProducts();
        console.log("product added");
      } catch (error) {
        toast.error(
          "An error occurred while submitting the form. Please try again."
        );
      }
    }
  };

  const productStatus = async (id) => {
    try {
      const response = await axios.get(
        `https://admin.myuni-hub.com/api/event_active_deactive/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ludwig", response.data);
      fetchProducts();
      // setProducts(response.data.data);
      console.log("ludwig", products);
    } catch (error) {
      console.error(error);
      console.log("lugwig", error.response.data.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      <div className="my-products">
        <h2>Your Events</h2>
        <p>
          Checkout our products provided by one expert vendors and select the
          needed one
        </p>
        <div className="product-heading">
          <h3>Event List</h3>
          <button onClick={() => handleRouteChange("/addevent")}>
            Add New Event
          </button>
        </div>
        <div className="product-listing">
          {products ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Event Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    {/* <td>{item.category.title}</td> */}
                    <td>{item.date_time}</td>
                    <td
                      style={{
                        color:
                          item.status_id == 1 ? ` rgb(152, 178, 123)` : "black",
                        cursor: "pointer",
                      }}
                      onClick={() => productStatus(item.id)}
                    >
                      {item.status_id == "1" ? "Activated" : "Deactivated"}
                    </td>
                    <td
                      style={{ color: "#98b27b", cursor: "pointer" }}
                      onClick={() => {
                        handleRouteChange(`/event/${item.id}`, item.id);
                      }}
                    >
                      Edit
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>You Donot Have Any Product Yet!</p>
          )}
        </div>
        <div className="servicehub"></div>
      </div>
    </div>
  );
}

export default Event;
