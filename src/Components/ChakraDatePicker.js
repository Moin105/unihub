// ChakraDateTimePicker.js
import React,{useState} from "react";
import DateTimePicker from "react-datetime-picker";
import { Box, Input,Heading } from "@chakra-ui/react";
// import './datepicker.css'
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
/* index.css */
// import "react-datepicker/dist/react-datepicker.css";


const ChakraDateTimePicker = ({ dateTime, setDateTime }) => {
    const [value, setValue] = useState(new Date());
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Input
      ref={ref}
      onClick={onClick}
      value={value}
      variant="unstyled"
      placeholder="Select date and time"
      readOnly
    />
  ));

  return (
    <Box m={0} className='outline-box' borderWidth="1px" borderRadius="lg" p={4}>
    <Heading as="h3" size="md" mb={2}>
      Selected Date
    </Heading>
    <DateTime
        value={value}
        onChange={setValue}
      />
      {/* <DateTimePicker
        onChange={setDateTime}
        value={dateTime}
        calendarIcon={null}
        clearIcon={null}
        format="y-MM-dd h:mm a"
        disableClock={true}
        returnValue="end"
        closeWidgets={true}
        customInput={<CustomInput />}
      /> */}
    </Box>
  );
};

export default ChakraDateTimePicker;
