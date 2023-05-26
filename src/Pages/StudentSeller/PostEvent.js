import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { MdArrowForward } from "react-icons/md";
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify'
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import DateTime from 'react-datetime';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Heading,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
// import { postEvent } from '../api/EventApi';

const EventForm = () => {
    const [value, setValue] = useState(new Date());

    const [formData, setFormData] = useState({
        title: '',
        descreption: '',
        date_time: new Date() ,
        address: '',
        lat: '',
        lng: '',
        packages: [],
        image: null,
        seat_limit: null,
        each_person_buying_capacity: null,
      });
      const token = useSelector((state) => state.auth.token);
      const handleInputChange = (event, fieldName) => {
        setFormData({ ...formData, [fieldName]: event.target.value });
      };
    
      const handlePackageChange = (event, index, field) => {
        const newPackages = JSON.parse(JSON.stringify(formData.packages));
        newPackages[index][field] = event.target.value;
        setFormData({ ...formData, packages: newPackages });
      };
    
      const removePackage = (index) => {
        const newPackages = JSON.parse(JSON.stringify(formData.packages));
        newPackages.splice(index, 1);
        setFormData({ ...formData, packages: newPackages });
      };
    
      const addPackage = () => {
        setFormData({
          ...formData,
          packages: [...formData.packages, { title: '', descreption: '', price: '' }],
        });
      };
    
      const handleImageChange = (event) => {
        setFormData({ ...formData, image: event.target.files[0] });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
      
        // Prepare form data for submission
        const data = new FormData();
        // for (const key in formData) {
        //   data.append(key, formData[key]);
        // }
        for (const key in formData) {
            if (key === 'packages') {
              formData[key].forEach((pkg, index) => {
                for (const pkgKey in pkg) {
                  data.append(`packages[${index}][${pkgKey}]`, pkg[pkgKey]);
                }
              });
            } else if (key === 'image') {
              data.append('image', formData[key], formData[key].name);
            } else {
              data.append(key, formData[key]);
            }
          }
        let date = new Date(value);

        let yearMonthDay = date.toISOString().slice(0,10); // Gets "2023-05-22"
        let hoursMinutes = date.toISOString().slice(11,16); // Gets "10:40"
        
        let formattedDate = `${yearMonthDay} ${hoursMinutes}`; // Combine date and time
        
        console.log(formattedDate); // Prints: "2
         data.append('date_time', formattedDate);
        // Setup axios config with Bearer token
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
          },
        };
      
        // Send the request
        try {
          const response = await axios.post('https://admin.myuni-hub.com/api/events', data, config);
          // Handle success response here
          toast.success('Form submitted successfully!', {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log('API response:', response);
        } catch (error) {
          // Handle error response here
          toast.error('An error occurred while submitting the form. Please try again.');
          console.error('API error:', error);
        }
      };

  return (
    <div className='servicehub'>
  <Header/>
  <div className='wrapper'>
    <h2>Create Event</h2>
    <form className='values-container' onSubmit={handleSubmit}>
      <div className='values'>
        <Box
          className="outline-box"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
        >
          <Heading as="h3" size="md" mb={2}>
            Title
          </Heading>
          <Input
            variant="unstyled"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange(e, 'title')}
          />
        </Box>

        <Box
          className="outline-box"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
        >
          <Heading as="h3" size="md" mb={2}>
            Description
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
            Date & Time
          </Heading>
          <DateTime
        value={value}
        onChange={setValue}
      />
        </Box>

     
        <Box
          className="outline-box"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
        >
          <Heading as="h3" size="md" mb={2}>
            Address
          </Heading>
          <Input
            variant="unstyled"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange(e, 'address')}
          />
        </Box>
        <Box
          className="outline-box"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
        >
          <Heading as="h3" size="md" mb={2}>
            Seat Limit
          </Heading>
          <Input
            variant="unstyled"
            type="number"
            value={formData.seat_limit}
            onChange={(e) => handleInputChange(e, 'seat_limit')}
          />
        </Box>   
        <Box
          className="outline-box"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
        >
          <Heading as="h3" size="md" mb={2}>
            Each Person Buying Capacity
          </Heading>
          <Input
            variant="unstyled"
            type="number"
            value={formData.each_person_buying_capacity}
            onChange={(e) => handleInputChange(e, 'each_person_buying_capacity')}
          />
        </Box>
        <Box
          className="outline-box"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
        >
          <Heading as="h3" size="md" mb={2}>
            Latitude
          </Heading>
          <Input
            variant="unstyled"
            type="text"
            value={formData.lat}
            onChange={(e) => handleInputChange(e, 'lat')}
          />
        </Box>

        <Box
          className="outline-box"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
        >
          <Heading as="h3" size="md" mb={2}>
            Longitude
          </Heading>
          <Input
            variant="unstyled"
            type="text"
            value={formData.lng}
            onChange={(e) => handleInputChange(e, 'lng')}
          />
        </Box>

        <h5>Packages</h5>
        {formData?.packages.map((packageItem, index) => (
          <div className='package-container' key={index}>
            <Box
              className='outline-box'
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Heading as="h3" size="md" mb={2}>
                Package {index + 1}
              </Heading>
              <Input
                variant="unstyled"
                type="text"
                placeholder="Title"
                value={packageItem.title}
                onChange={(e) => handlePackageChange(e, index, 'title')}
              />
              <Input
                variant="unstyled"
                type="text"
                placeholder="Description"
                value={packageItem.description}
                onChange={(e) => handlePackageChange(e, index, 'description')}
              />
              <Input
                variant="unstyled"
                type="text"
                placeholder="Price"
                value={packageItem.price}
                onChange={(e) => handlePackageChange(e, index, 'price')}
              />
              <Button onClick={() => removePackage(index)}>Remove this package</Button>
            </Box>
          </div>
        ))}
        <Button onClick={addPackage}>Add new package</Button>

        <div className='image-container'>
          <figure>
            {/* Add camera icon here */}
          </figure>
          <p>
            <input
              type="file"
              name='cover_img'
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
            Create Event
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

export default EventForm;

