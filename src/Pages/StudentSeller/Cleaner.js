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
function Cleaner() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  // all products
  const [cleaner, setCleaner] = useState([]);
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
const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://admin.myuni-hub.com/api/cleaning_services",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("services", response.data);
      setCleaner(response.data.data);
      console.log("ludwig", cleaner);
    } catch (error) {
      console.error(error);
      console.log("lugwig", error.response.data.message)
    }
  };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
// if(formData.name === '' || formData.descreption === '' || formData.price === '' || formData.stock === '' || formData.image === null) {
//   if(formData.name === ''){
//     toast.error("Please enter product name", {
//       position: toast.POSITION.TOP_CENTER,
//     });
//     return
//   }
//   if(formData.descreption === ''){
//     toast.error("Please enter product description", {
//       position: toast.POSITION.TOP_CENTER,
//     });
//     return
//   }
//   if(formData.price === ''){
//     toast.error("Please enter product price", {
//       position: toast.POSITION.TOP_CENTER,
//     });
//     return
//   }
//   if(formData.stock === ''){
//     toast.error("Please enter product stock", {
//       position: toast.POSITION.TOP_CENTER,
//     });
//     return
//   }
//   if(formData.image === null){
//     toast.error("Please upload product image", {
//       position: toast.POSITION.TOP_CENTER,
//     });
//     return
//   }
// }
// else{
//     const data = new FormData();
//     for (const key in formData) {
//       if (key === "image") {
//         data.append("image", formData[key], formData[key].name);
//       } else {
//         data.append(key, formData[key]);
//       }
//     }

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: "Bearer " + token,
//       },
//     };

//     try {
//       const response = await axios.post(
//         "https://admin.myuni-hub.com/api/products",
//         data,
//         config
//       );
//       setFormData(
//         {
//             category_id: 1,
//             name: "",
//             descreption: "",
//             price: '',
//             stock: '',
//             image: null,
//           }
//       )
//       toast.success("Form submitted successfully!", {
//         position: toast.POSITION.TOP_CENTER,
//       });
//       fetchProducts();
//       console.log("product added");
//     } catch (error) {
//       toast.error(
//         "An error occurred while submitting the form. Please try again."
//       );
//     }}
//   };
  

  const serviceStatus = async(id)=>{
    try {
        const response = await axios.get(
          `https://admin.myuni-hub.com/api/cleaning_service_active_deactive/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("ludwig", response.data);
        fetchServices();
        // setProducts(response.data.data);
        console.log("ludwig", cleaner);
      } catch (error) {
        console.error(error);
        console.log("lugwig", error.response.data.message)
      }
  }
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="product-container">
      <div className="my-products">
        <h2>Your Services</h2>
        <p>
          Checkout our products provided by one expert vendors and select the
          needed one
        </p>
        <div className="product-heading">
          <h3>Service List</h3>
          <button onClick={()=> handleRouteChange("/addservice")}>Add New Service</button>
        </div>
      <div className="product-listing">
         {cleaner.length > 0 ?   <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        {cleaner?.map((item, index) => (
          <tr key={index}>
            <td>{item.title}</td>
            <td>{item.category.title}</td>
            <td style={{color: item.status_id == 1 ? ` rgb(152, 178, 123)`:"black",cursor:"pointer"}} onClick={()=> serviceStatus(item.id)} >{item.status_id  == '1' ? 'Activated' : 'Deactivated' }</td>
            <td style={{color:"#98b27b",cursor:"pointer"}} onClick={()=>{handleRouteChange(`/service/${item.id}`,item.id)}}>Edit</td>
          </tr>
        ))}
      </tbody>
        </table> : 
       <p>You Donot Have Any Service Yet!</p> 
        }
      </div>  
      <div className="servicehub">
        
    
      {/* <div className="wrapper">
        <h2>Sell Products</h2>
        <form className="values-container" onSubmit={handleSubmit}>
          <div className="values">
   

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
      </div> */}
  </div> 
      </div>
    </div>
  );
}

export default Cleaner;
