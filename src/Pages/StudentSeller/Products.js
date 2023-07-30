import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../Pages/servicehub.css";
import { useNavigate } from "react-router-dom";
import './products.css'
import { ToastContainer,toast } from "react-toastify";
import { Box, Heading, Input, Button } from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import {AiOutlineCamera} from 'react-icons/ai'
function Products() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  // all products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 1,
    name: "",
    descreption: "",
    price: '',
    stock: '',
    image: null,
  });
  
const handleRouteChange = (url,datas) => {
  navigate(url, { state: { data: datas } });
};
  const handleInputChange = (event, fieldName) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      setFormData(
        {
            category_id: 1,
            name: "",
            descreption: "",
            price: '',
            stock: '',
            image: null,
          }
      )
      toast.success("Form submitted successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("product added");
    } catch (error) {
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://admin.myuni-hub.com/api/products",
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
      console.log("lugwig", error.response.data.message)
    }
  };
  const productStatus = async(id)=>{
    try {
        const response = await axios.get(
          `https://admin.myuni-hub.com/api/product_active_deactive/${id}`,
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
        console.log("lugwig", error.response.data.message)
      }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      <div className="my-products">
        <h2>Your Products</h2>
        <p>
          Checkout our products provided by one expert vendors and select the
          needed one
        </p>
        <div className="product-heading">
          <h3>Product List</h3>
          <button>Add New Product</button>
        </div>
      <div className="product-listing">
         {products ?   <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        {products?.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.category.title}</td>
            <td>{item.stock}</td>
            <td style={{color: item.status_id == 1 ? ` rgb(152, 178, 123)`:"black"}} onClick={()=> productStatus(item.id)} >{item.status_id  == '1' ? 'Activated' : 'Deactivated' }</td>
            <td style={{color:"#98b27b"}} onClick={()=>{handleRouteChange(`/product/:${item.id}`,item.id)}}>Edit</td>
          </tr>
        ))}
      </tbody>
        </table> : 
       <p>You Donot Have Any Product Yet!</p> 
        }
      </div>  
      <div className="servicehub">
        
    
      <div className="wrapper">
        <h2>Sell Products</h2>
        <form className="values-container" onSubmit={handleSubmit}>
          <div className="values">
            {/* <Box
              className="outline-box"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Heading as="h3" size="md" mb={2}>
                Category ID
              </Heading>
              <Input
                variant="unstyled"
                type="number"
                value={formData.category_id}
                onChange={(e) => handleInputChange(e, "category_id")}
              />
            </Box> */}

            <Box
              className="outline-box"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Heading as="h3" size="md" mb={2}>
                Name
              </Heading>
              <Input
                variant="unstyled"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </Box>

            <Box
              className="outline-box"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Heading as="h3" size="md" mb={2}>
                Descreption
              </Heading>
              <Input
                variant="unstyled"
                type="text"
                value={formData.descreption}
                onChange={(e) => handleInputChange(e, "descreption")}
              />
            </Box>

            <Box
              className="outline-box"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Heading as="h3" size="md" mb={2}>
                Price
              </Heading>
              <Input
                variant="unstyled"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange(e, "price")}
              />
            </Box>

            <Box
              className="outline-box"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Heading as="h3" size="md" mb={2}>
                Stock
              </Heading>
              <Input
                variant="unstyled"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange(e, "stock")}
              />
            </Box>

            <div className="image-container">
              <figure style={{fontSize:"32px",color:"#rgb(170 163 163)"}}>
                <AiOutlineCamera/>
              </figure>
              <p>
                <input type="file" name="image" onChange={handleImageChange} />
              </p>
            </div>

            <div className="primary-btn">
              <Button
                rightIcon={<MdArrowForward />}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
              >
                Add Product
              </Button>
            </div>
          </div>
        </form>
      </div>
  </div> 
      </div>
    </div>
  );
}

export default Products;
