import React, { useState } from 'react';
import { Box, Heading, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../../Components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../Components/Header';
import "../../Pages/servicehub.css";
import { ToastContainer } from 'react-toastify';
import { useSelector } from "react-redux";
import { MdArrowForward } from "react-icons/md";

const PostProduct = () => {
  const [formData, setFormData] = useState({
    category_id: 1,
    name: '',
    descreption: '',
    price: 40,
    stock: 200,
    image: null,
  });

  const token = useSelector((state) => state.auth.token);

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
      if (key === 'image') {
        data.append('image', formData[key], formData[key].name);
      } else {
        data.append(key, formData[key]);
      }
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      },
    };

    try {
      const response = await axios.post('https://admin.myuni-hub.com/api/products', data, config);
      toast.success('Form submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("product added")
    } catch (error) {
      toast.error('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
//     <div className='servicehub'>
//     <Header/>
//     <div className='wrapper'>
//       <h2>Add Product </h2>
//     <form onSubmit={handleSubmit}>
//     <Box
//           className="outline-box"
//           borderWidth="1px"
//           borderRadius="lg"
//           p={4}
//         >
//           <Heading as="h3" size="md" mb={2}>
//           Category ID
//           </Heading>
//           <Input
//             variant="unstyled"
//           type="number"
//           value={formData.category_id}
//           onChange={(e) => handleInputChange(e, 'category_id')}
//         />
//       </Box>

//       <Box borderWidth="1px" borderRadius="lg" p={4}>
//         <Heading as="h3" size="md" mb={2}>
//           Name
//         </Heading>
//         <Input
//           type="text"
          
//           value={formData.name}
//           onChange={(e) => handleInputChange(e, 'name')}
//         />
//       </Box>

//       <Box borderWidth="1px" borderRadius="lg" p={4}>
//         <Heading as="h3" size="md" mb={2}>
//           Descreption
//         </Heading>
//         <Input
//           type="text"
//           value={formData.descreption}
//           onChange={(e) => handleInputChange(e, 'descreption')}
//         />
//       </Box>

//       <Box borderWidth="1px" borderRadius="lg" p={4}>
//         <Heading as="h3" size="md" mb={2}>
//           Price
//         </Heading>
//         <Input
//           type="number"
//           value={formData.price}
//           onChange={(e) => handleInputChange(e, 'price')}
//         />
//       </Box>

//       <Box borderWidth="1px" borderRadius="lg" p={4}>
//         <Heading as="h3" size="md" mb={2}>
//           Stock
//         </Heading>
//         <Input
//           type="number"
//           value={formData.stock}
//           onChange={(e) => handleInputChange(e, 'stock')}
//         />
//       </Box>

//       <Box borderWidth="1px" borderRadius="lg" p={4}>
//         <Heading as="h3" size="md" mb={2}>
//           Image
//         </Heading>
//         <Input
//           type="file"
//           onChange={handleImageChange}
//         />
//       </Box>

//       <Button type="submit">
//         Submit
//       </Button>
//     </form>
//     </div>
//   <ToastContainer/>

//   <Footer/>
// </div>
<div className='servicehub'>
  <Header/>
  <div className='wrapper'>
    <h2>Add Product</h2>
    <form className='values-container' onSubmit={handleSubmit}>
      <div className='values'>
        <Box
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
            onChange={(e) => handleInputChange(e, 'category_id')}
          />
        </Box>

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
            onChange={(e) => handleInputChange(e, 'name')}
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
            onChange={(e) => handleInputChange(e, 'descreption')}
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
            onChange={(e) => handleInputChange(e, 'price')}
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
            onChange={(e) => handleInputChange(e, 'stock')}
          />
        </Box>

        <div className='image-container'>
          <figure>
            {/* Add camera icon here */}
          </figure>
          <p>
            <input
              type="file"
              name='image'
              onChange={handleImageChange}
            />
          </p>
        </div>

        <div className="primary-btn">
          <Button
            rightIcon={<MdArrowForward />}
            bg="#7BB564"
            color={"white"}
            variant="solid"
            width={"100%"}
            onClick={(e)=>{handleSubmit(e)}}
            type="submit"
          >
            Add Product
          </Button>
        </div>
      </div>
    </form>
  </div>
  <ToastContainer/>

  <Footer/>
</div>

  );
};

export default PostProduct;
