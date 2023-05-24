
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
  import axios from 'axios';
  import {BsCheckLg} from 'react-icons/bs'
import Header from '../../Components/Header';
import imageCompression from 'browser-image-compression';
import Footer from '../../Components/Footer';
// import camera from './../Images/camera.png'
import camera from './../../Images/camera.png'
import { Link } from 'react-router-dom';
import {MdArrowForward} from 'react-icons/md'
import SellerHeader from './SellerHeader';
// import {MdArrowDropDown} from 'react-icons/md'
// import camera from './../Images/'
const postData = async (url,data,token,image,cover_img) => {
  const formData = new FormData();
  formData.append('category_id', data.category_id);
  formData.append('title', data.title);
  formData.append('descreption', data.descreption);
  formData.append('packages',JSON.stringify(data.packages));
  formData.append('university_id', data.university_id);
  formData.append('image', image);
  formData.append('cover_img', cover_img);
  formData.append('slot_ids', data.slot_ids);
  console.log(data,formData,image,cover_img)
    try {
     
      const response = await axios.post(url,formData,{
        headers: {
            "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${token}`
        }});
      console.log('API response:', response);
      // Handle success response heres
    } catch (error) {
      console.error('API error:', error);
      // Handle error response here
    }
  };
function SellService() {
    const token = localStorage.getItem('token')
    const [serviceCategories, setServiceCategories] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [image,setImage]=useState(null)
    const [cover_img,setCoverImg]=useState(null)
    const  fetchServiceCategories= async(token)=> {
        return await fetch('https://admin.myuni-hub.com/api/service_category', {
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
        return  await fetch('https://admin.myuni-hub.com/api/universities', {
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
        title: "cleaning service",
        descreption: "",
        packages: [],
        university_id: "",
        slot_ids: "1",
      });
      
      const [packages, setPackages] = useState([]);
    
    //   const handleInputChange = (event) => {
    //     setFormData({ ...formData, [event.target.name]: event.target.value });
    //   };
    
    const handleInputChange = (event, fieldName) => {
        setFormData({ ...formData, [fieldName]: event.target.value });
      };
      
      const handlePackageChange = (event, index, fieldName) => {
        const updatedPackages = [...formData.packages];
        if (!updatedPackages[index]) {
          updatedPackages[index] = {};
        }
        updatedPackages[index][fieldName] = fieldName === "price" ? parseInt(event.target.value) : event.target.value;
        setFormData({ ...formData, packages: updatedPackages });
      };
      
      const  handleImageChange =async (event, name) => {
      
          const imageFile = event.target.files[0];
  
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
        
          try {
            const compressedImage = await imageCompression(imageFile, options);
            console.log(`Compressed ${name} image:`, compressedImage);
            // setFormData((prevState) => {prevState  =  {
            //     ...prevState,
            //     [name]: event.target.files[0],
            //   }
            
            //    return prevState }
    
            //   );
            if(name==='cover_img'){
              setCoverImg(prevState =>{prevState =  compressedImage; return prevState})
            }else if(name==='image'){
              setImage(prevState =>{prevState =  compressedImage; return prevState})
            }
            // Upload the compressed image to the server or save it to the state
            // ...
          } catch (error) {
            console.error(`Error compressing ${name} image:`, error);
          }
        // if (event.target.files && event.target.files[0]) {
        //   const reader = new FileReader();
        // //   setFormData((prevState) => ({
        // //     ...prevState,
        // //     [name]: event.target.files[0],
        // //   }));
        //   console.log(event.target.files[0].name,formData)
        //   reader.onload = (e) => {
        //     compressImage(e.target.result, 300, 300).then((compressedImage) => {
             
        //     });
        //   };
      
        //   reader.readAsDataURL(event.target.files[0]);
        // }
      };
      
      
      const compressImage = (image, maxWidth, maxHeight, quality = 0.) => {
        return new Promise((resolve, reject) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
      
          const img = new Image();
          img.src = image;
      
          img.onload = () => {
            let width = img.width;
            let height = img.height;
      
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }
      
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
      
            const compressedImage = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedImage);
          };
      
          img.onerror = (error) => {
            reject(error);
          };
        });
      };
      
      
      const mappedServiceCategories = useMemo(() => {
        return serviceCategories?.data?.map((set,key) => {
          return (
            <option  key={key} value={set.id}>{set.title}</option>
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
      const handleSubmit = (event) => {
        event.preventDefault();
      
        const finalFormData = {
          ...formData,
          packages: { prices: formData.packages },
        };
        console.log("hail",finalFormData)
        // setFormData({ ...formData, image: event.target.files[0].name });
        //   setFormData({ ...formData, cover_img:event.target.files[0].name });
        // fetch('http://34.233.35.208/api/cleaning_services',{ 
        //     method: "POST",
        //     // mode: "no-cors",
        //     headers: {
        //       Authorization: `Bearer  ${token}`,
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(finalFormData),
        //   })
        postData("https://admin.myuni-hub.com/api/cleaning_services",finalFormData,token,image,cover_img)
        // Call the POST API with finalFormData heres
      };
      
  return (
    <div className='servicehub'>
        <SellerHeader/>
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
      <Select     onChange={(e) => {
      handleInputChange(e, "category_id");
    }} placeholder="Select a service" variant="unstyled">
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
          onChange={(e) => {
            handleInputChange(e, "descreption");
          }}
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
          <Input  onChange={(e) => {
      handlePackageChange(e, 0, "title");
    }} variant="unstyled"/>
        </Box>
        <Box m={0} className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
          <Heading as="h3" size="md" mb={2}>
            Price
          </Heading>
          <Input onChange={(e) => {
      handlePackageChange(e, 0, "price");
    }}variant="unstyled"/>
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
          <Input onChange={(e) => {
      handlePackageChange(e, 1, "title");
    }} variant="unstyled"/>
        </Box>
        <Box className='outline-box'  borderWidth="1px" borderRadius="lg" m="0px" p={4}>
          <Heading as="h3" size="md" >
            Price
          </Heading>
          <Input  onChange={(e) => {
      handlePackageChange(e, 1, "price");
    }} variant="unstyled" />
        </Box>
      </div>
      <Heading as="h5" size="sm">
        Package 3
      </Heading>
      <div spacing={4} className='values-container'>
        <Box className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
          <Heading as="h3" size="md" >
            Package Name
          </Heading>
          <Input onChange={(e) => {
      handlePackageChange(e, 2, "title");
    }} variant="unstyled"/>
        </Box>
        <Box className='outline-box'  borderWidth="1px" borderRadius="lg" m="0px" p={4}>
          <Heading as="h3" size="md" >
            Price
          </Heading>
          <Input  onChange={(e) => {
      handlePackageChange(e, 2, "price");
    }} variant="unstyled" />
        </Box>
      </div>

               <Box className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
      <Select  onChange={(e) => {
      handleInputChange(e, "university_id");
    }}
    placeholder="Select University"
    variant={'unstyled'}>
      
       {mappedUniversities}
        {/* Add more options here */}
      </Select>
    </Box>
            <div className='image-container'>
                   <figure>
                    <img src={camera}/>
                   </figure>
                   <p>
                   <input
    type="file"
    accept="image/*"
    name='cover_img'
    onChange={(e) => {
        handleImageChange(e, "cover_img");
    }}
  />
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
             <input
    type="file"
    accept="image/*"
    name='image'
    onChange={(e) => {
        handleImageChange(e, "image");
    }}
  />
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
          onClick={(e)=>{handleSubmit(e)}}
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