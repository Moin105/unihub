import React, { useEffect ,useState,useMemo} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Box,Heading,
    VStack,HStack,Text,
    Button,SimpleGrid,Textarea
  } from "@chakra-ui/react";
  import '../../Pages/servicehub.css'
  import {BsCheckLg} from 'react-icons/bs'
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
// import camera from './../Images/camera.png'
import camera from './../../Images/camera.png'
import { Link } from 'react-router-dom';
import {MdArrowForward} from 'react-icons/md'
// import {MdArrowDropDown} from 'react-icons/md'
// import camera from './../Images/'
function SellService() {
    const token = localStorage.getItem('token')
    const [serviceCategories, setServiceCategories] = useState([]);
    const [universities, setUniversities] = useState([]);
    const  fetchServiceCategories= async(token)=> {
        return await fetch('http://34.233.35.208/api/service_category', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            return data;
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }
      const  fetchUniversities= async(token)=> {
        return  await fetch('http://34.233.35.208/api/universities', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            return data;
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }
      const [formData, setFormData] = useState({
        category_id: "",
        title: "",
        description: "",
        university_id: "",
        image: "",
        slot_ids: "",
      });
      
      const [packages, setPackages] = useState([]);
    
    //   const handleInputChange = (event) => {
    //     setFormData({ ...formData, [event.target.name]: event.target.value });
    //   };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // dispatch(signUpUser(formData))
        
    
      };
      const handleInputChange = (event) => {
        if (event.target.name.startsWith("package")) {
          const packageIndex = parseInt(event.target.dataset.index);
          const packageKey = event.target.name.split("_")[1];
      
          setPackages((prevPackages) => {
            const updatedPackages = [...prevPackages];
            updatedPackages[packageIndex] = {
              ...updatedPackages[packageIndex],
              [packageKey]: event.target.value,
            };
            return updatedPackages;
          });
        } else {
          setFormData({ ...formData, [event.target.name]: event.target.value });
        }
      };
      
      const mappedServiceCategories = useMemo(() => {
        return serviceCategories?.data?.map((set,key) => {
          return (
            <option key={key} value={set.id}>{set.title}</option>
          );
        });
      }, [serviceCategories]);
      const mappedUniversities = useMemo(() => {
        return universities?.data?.map((set,key) => {
          return (
            <option key={key} value={set.id}>{set.name}</option>
          );
        });
      }, [universities]);
    
      useEffect(() => {
        fetchServiceCategories(token).then(data => {
          setServiceCategories(prevData=>{prevData =  data;return prevData});
        });
        fetchUniversities(token).then(data => {
            setUniversities(prevData=>{prevData =  data;return prevData})
          });
        console.log("qwe",serviceCategories,universities)
      }, [token]);
      
  return (
    <div className='servicehub'>
        <Header/>
        <div className='wrapper'>
            <h2>Post Event</h2>
            {/* <h4>Sell Service</h4> */}
            <p>Sell your services and get the customers to <br></br> get benefits of services.</p>
            <form className='values-container' onSubmit={handleSubmit}>
                {/* <div className='outline-box'>
                      <h3>Select Service</h3>
                      <p>Express Cleaning</p>
                </div> */}
                 <Box className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h3" size="md" mb={2}>
        Select Service
      </Heading>
      <Select placeholder="Select a service" variant="unstyled">
       {/* {serviceCategories.length > 0 && serviceCategories?.data?.map((set)=>{
              return(
                <option value={set.id}>{set.title}</option>
              )
       })} */}
       {mappedServiceCategories}
        {/* Add more options here */}
      </Select>
    </Box>
 
      <Box className='outline-boxs' borderWidth="1px" borderRadius="lg" p={4}>
        <Heading as="h3" size="md" mb={2}>
          Service Description
        </Heading>
        <Textarea
        variant={'unstyled'}
          defaultValue="- Hoovering and Sweeping&#13;&#10;- Dust, Wipe & Disinfect All Surfaces"
          resize="none"
          rows={4}
        />
      </Box>

      <Heading as="h5" size="sm">
        Package 1
      </Heading>
      <div spacing={4} className='values-container'>
        <Box className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
          <Heading as="h3" size="md" mb={2}>
            Package Name
          </Heading>
          <Input onChange={(e)=>{handleInputChange(e)}} variant="unstyled"/>
        </Box>
        <Box m={0} className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
          <Heading as="h3" size="md" mb={2}>
            Price
          </Heading>
          <Input onChange={(e)=>{handleInputChange(e)} }variant="unstyled"/>
        </Box>
      </div>

      <Heading as="h5" size="sm">
        Package 2
      </Heading>
      <div spacing={4} className='values-container'>
        <Box className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
          <Heading as="h3" size="md" >
            Package Name
          </Heading>
          <Input onChange={(e)=>{handleInputChange(e)}} variant="unstyled"/>
        </Box>
        <Box className='outline-box'  borderWidth="1px" borderRadius="lg" m="0px" p={4}>
          <Heading as="h3" size="md" >
            Price
          </Heading>
          <Input onChange={(e)=>{handleInputChange(e)} } variant="unstyled" />
        </Box>
      </div>
               <Box className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
      <Select placeholder="Select University" variant={'unstyled'}>
      
       {mappedUniversities}
        {/* Add more options here */}
      </Select>
    </Box>
            <div className='image-container'>
                   <figure>
                    <img src={camera}/>
                   </figure>
                   <p>
                   Upload Service Image
                   </p>
            </div>
            <h5>Uploaded Files</h5>
               <div className='values-container'>
                <div className='outline-box'>
                      <h3>ServiceImage.jpge/.png</h3>
                      {/* <p>Ensuit / Studio</p> */}
                </div>
                {/* <div className='outline-box'>
                      <h3>Price</h3>
                      <p>£25</p>
                </div> */}
               </div>
          
        <div className='confirm-notification'>
             <span>
<BsCheckLg/>
             </span>
             <p>
             You have uploaded product image
             </p>
            </div>      
            </form>
            <div className="wallet-btn">
    <Button

          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
          onClick={handleSubmit}
        >
          Post Service
        </Button>
      </div>
        </div>
        <Footer/>
    </div>
  )
}

export default SellService