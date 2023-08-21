import React, { useEffect, useState } from "react";
import { Box, Heading, Input, Button } from "@chakra-ui/react";
import axios from "axios"; 
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Components/Header";
import "../../Pages/servicehub.css";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { MdArrowForward } from "react-icons/md";
import {AiOutlineCamera} from 
'react-icons/ai'
import { useLocation, useNavigate } from "react-router-dom";

const PostProduct = () => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate()
  const [productStatus, setProductStatus] = useState(null);
  const data = location.state ? location.state.data : null;
  const handleRouteChange = (url,datas) => {
    navigate(url, { state: { data: datas } });
  };
  
  const [formData, setFormData] = useState({
    category_id: 1,
    name: "",
    descreption: "",
    price: '',
    stock: '',
    image: null,
  });
  const fetchProductDetail = async (id) => {
    try {
      const response = await axios.get(
        `https://admin.myuni-hub.com/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ludwig", response.data.data);
      setProductStatus(response.data.data.status.id)
      setFormData({
         name: response.data.data.name,
         category_id: 1,
          descreption: response.data.data.descreption,
          price: response.data.data.price,
          stock: response.data.data.stock,
          image: response.data.data.image,
          _method:'PUT'
      })
      
    } catch (error) {
      console.error(error);
      console.log("lugwig", error.response.data.message)
    }
  };
  useEffect(() => {
     if (data){
      fetchProductDetail(data)
     }
  }, [])

  const handleInputChange = (event, fieldName) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };
 const deleteProduct = async ()=>{
    axios.delete(`https://admin.myuni-hub.com/api/products/${data}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res)
      toast.success("Product deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      handleRouteChange('/sellerdetails')
    }).catch((err)=>{
      console.log(err)
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
      });
    })
 }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(formData.name === '' || formData.descreption === '' || formData.price === '' || formData.stock === '' || formData.image === null) {
      if(formData.name === ''){
        toast.error("Please enter product name", {
          position: toast.POSITION.TOP_CENTER,
        });
        return
      }
      if(formData.descreption === ''){
        toast.error("Please enter product description", {
          position: toast.POSITION.TOP_CENTER,
        });
        return
      }
      if(formData.price === ''){
        toast.error("Please enter product price", {
          position: toast.POSITION.TOP_CENTER,
        });
        return
      }
      if(formData.stock === ''){
        toast.error("Please enter product stock", {
          position: toast.POSITION.TOP_CENTER,
        });
        return
      }
      if(formData.image === null){
        toast.error("Please upload product image", {
          position: toast.POSITION.TOP_CENTER,
        });
        return
      }
    }
  else if (!data)   {
    const datas = new FormData();
    for (const key in formData) {
      if (key === "image") {
        datas.append("image", formData[key], formData[key].name);
      } else {
        datas.append(key, formData[key]);
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
        datas,
        config
      );
      toast.success("Form submitted successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("product added");
    } catch (error) {
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
}else if (data){
  const datas = new FormData();
  for (const key in formData) {
    if (key === "image") {
      datas.append("image", formData[key], formData[key].name);
    } else {
      datas.append(key, formData[key]);
    }
  }
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };
  console.log("wfe",formData)
  try {
    const response = await axios.post(
      `https://admin.myuni-hub.com/api/products/${data}`,
      datas,
      config
    );
    toast.success("Form submitted successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
    handleRouteChange('/sellerdetails')
    console.log("product addedssss");
  } catch (error) {
    toast.error(
      "An error occurred while submitting the form. Please try again."
    );
  }
}

  };
  const changeProductStatus = async(id)=>{
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
      } catch (error) {
        console.error(error);
        console.log("lugwig", error.response.data.message)
      }
  }
  const handleActivate = async () => {
    if (productStatus === 1) {
        toast.error("Product is already active");
    } else {
        try {
            await changeProductStatus(data); // Change to your actual API call function
            setProductStatus(1);
            toast.success("Product activated successfully");
        } catch (err) {
            toast.error("Error activating the product");
        }
    }
};

const handleDeactivate = async () => {
    if (productStatus === 2) {
        toast.error("Product is already deactivated");
    } else {
        try {
            await changeProductStatus(data); // Change to your actual API call function
            setProductStatus(2);
            toast.success("Product deactivated successfully");
        } catch (err) {
            toast.error("Error deactivating the product");
        }
    }
};
  return (
    <div className="servicehub">
      <Header />
      <div className="wrapper">
        <h2>Sell Product</h2>
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
              <figure 
              style={{fontSize:"32px",color:"#rgb(170 163 163)"}}>  <AiOutlineCamera/></figure>
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
                Post Product
              </Button>
            </div>
    {data &&   <>     <div className="primary-btn"> <button onClick={()=>deleteProduct()} style={{color:"#BF1F1F",textAlign:"center",fontWeight:"400",padding:"0px",display:"flex",justifyContent:"center"}}>Delete Product</button></div>
    <div className="primary-btn">   <button onClick={()=>handleDeactivate()} style={{color:"#9D9D9D",textAlign:"center",fontWeight:"400",padding:"0px",padding:"0px",display:"flex",justifyContent:"center"}}>Deactivate Product</button></div>
    <div className="primary-btn">   <button onClick={()=>handleActivate()} style={{color:"#7BB564",textAlign:"center",fontWeight:"400",padding:"0px",padding:"0px",display:"flex",justifyContent:"center"}}>Activate Product</button></div>
            </>}
          </div>
        </form>
      </div>
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default PostProduct;
