import React,{useEffect, useState,useMemo} from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import "./details.css";
import { useDispatch, useSelector } from "react-redux";
import "../../responsive.css";
import { MdArrowForward } from "react-icons/md";
import axios from "axios";
import { set } from "date-fns";
// import { useSelector } from "react-redux";
const postData = async (url, data,token) => {
  try {
    const response = await axios.post(url, data,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    console.log('API response:', response);
    // Handle success response here
  } catch (error) {
    console.error('API error:', error);
    // Handle error response here
  }
};
function DetailsTab() {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(true)
  // const userProfileData = useSelector((state) => state);
  const userProfileData = useSelector((state) => state.user?.data?.profile)
  console.log("userProfile",userProfileData)
  const [formData, setFormData] = useState(null);
  const token = useSelector((state) => state.auth.token); 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const memoizedUserProfileData = useMemo(() => userProfileData, [userProfileData]);
  const formDetails = useMemo(() => formData, [formData]);

  useEffect(() => {
    console.log("hwlllooo")
    // console.log("hwlllooo",userProfileData.profile.email)
    if(userProfileData){

    setFormData({
      name:memoizedUserProfileData?.name,
      email:memoizedUserProfileData?.email,
      address: memoizedUserProfileData?.address,
      phone:memoizedUserProfileData?.phone
    });}
  }, [])


  
  const updateProfile = () => {

    postData("https://admin.myuni-hub.com/api/update_profile?_method=PUT",formData,token)
  }
  return (
    <div className="tab-details">
      <h2>My Details</h2>
      <span className="upper">View and edit your personal info below.</span>
      <p>Login email : {userProfileData?.email}</p>
      <span className="lower">Your Login email can’t be changed</span>
      <FormControl className="form-control">
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Name
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            name="name"
            type="email"
            onChange={handleInputChange}
            value={formDetails?.name} disabled={!isEditable}
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Email address
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            readOnly
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formDetails?.email} 
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Address
          </FormLabel>
          <Input
            variant="unstyled"
            border="none"
            onChange={handleInputChange}
            value={formDetails?.address} 
            type="address"
            name="address"
            fontSize="41px"
          />
        </Box>
        <Box
          className="input-container"
          border="1px solid #7BB564"
          borderRadius={30}
          marginTop="103px"
        >
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Phone
          </FormLabel>
          <Input variant="unstyled"name="phone" value={formDetails?.phone}onChange={handleInputChange}  border="none" type="tel" fontSize="41px" />
        </Box>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <div className="primary-btn">
        <Button
          rightIcon={<MdArrowForward />} onClick={updateProfile}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
        >
          Update Info
        </Button>
      </div>
    </div>
  );
}

export default DetailsTab;
