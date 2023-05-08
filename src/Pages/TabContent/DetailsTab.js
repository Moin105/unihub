import React,{useState} from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,Button
} from "@chakra-ui/react";
import "./details.css";
import { useDispatch, useSelector } from "react-redux";
import {MdArrowForward} from 'react-icons/md'
function DetailsTab() {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(true)
  const userProfileData = useSelector((state) => state.userProfile.data);
  return (
    <div className="tab-details">
      <h2>My Details</h2>
      <span className="upper">View and edit your personal info below.</span>
      <p>Login email : {userProfileData?.profile.email}</p>
      <span className="lower">Your Login email can’t be changed</span>
      <FormControl className="form-control">
        <Box className="input-container" border="1px solid #7BB564" borderRadius={30} marginTop="103px">
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
            type="email"
            value={userProfileData?.profile?.name} disabled={!isEditable}
            fontSize="41px"
          />
        </Box>
        <Box className="input-container" border="1px solid #7BB564" borderRadius={30} marginTop="103px">
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
            type="email"
            value={userProfileData?.profile?.email} disabled={!isEditable}
            fontSize="41px"
          />
        </Box>
        <Box className="input-container" border="1px solid #7BB564" borderRadius={30} marginTop="103px">
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
            value={userProfileData?.profile?.address|| ""} disabled={!isEditable}
            type="email"
            fontSize="41px"
          />
        </Box>
        <Box className="input-container" border="1px solid #7BB564" borderRadius={30} marginTop="103px">
          <FormLabel
            padding="20px 0px 0px 20px"
            fontSize="37px"
            fontWeight={300}
          >
            Phone
          </FormLabel>
          <Input variant="unstyled"value={userProfileData?.profile?.phone|| ""} disabled={!isEditable} border="none" type="tel" fontSize="41px" />
        </Box>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <div className="details-btn">
      <Button rightIcon={<MdArrowForward />} bg='#7BB564'color={"white"} variant='solid' width={"100%"}>
      Update Info
  </Button>
      </div>
    </div>
  );
}

export default DetailsTab;
