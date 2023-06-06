import React, { useState,useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import "./wallet.css";
import "../../responsive.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdArrowForward } from "react-icons/md";
function Wallet() {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(true);
  const [cards,setCards] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const getData = async () => {
    try {
      const response = await axios.get("https://admin.myuni-hub.com/api/get_cards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("ma belle",response.data.cards);
      setCards(response.data.cards);
      
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  useEffect(() => {
    getData();
  if(cards.length >= 0){
    setShow(false);
  }
  }, [])
  return (
    <div className="tab-wallet">
      {show ? (
        <React.Fragment>
          <h2>My Wallet</h2>
          <span className="upper">
            Save your credit and debit card details for <br></br> faster
            checkout.
          </span>
          <p>You Haven’t Saved Any Cards Yet</p>
          <span className="lower">
            Securely save your payment details when you place an order <br></br>
            at checkout.
          </span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2>Add Card</h2>
          <h3>Add New Card</h3>
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
                Name of Card Holder
              </FormLabel>
              <Input
                variant="unstyled"
                border="none"
                type="email"
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
                Card Number
              </FormLabel>
              <Input
                variant="unstyled"
                border="none"
                type="email"
                fontSize="41px"
              />
            </Box>
            <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
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
                  Expiry Date
                </FormLabel>
                <Input
                  variant="unstyled"
                  border="none"
                  placeholder="mm/yy"
                  type="email"
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
                  CVV
                </FormLabel>
                <Input
                  variant="unstyled"
                  border="none"
                  type="tel"
                  fontSize="41px"
                />
              </Box>
            </SimpleGrid>
          </FormControl>
        </React.Fragment>
      )}
      <div className="primary-btn">
        <Button
          rightIcon={<MdArrowForward />}
          bg="#7BB564"
          color={"white"}
          variant="solid"
          width={"100%"}
          onClick={() => {
            setShow(false);
          }}
        >
          Add New Card
        </Button>
      </div>
    </div>
  );
}

export default Wallet;
