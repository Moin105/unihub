import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdArrowForward } from "react-icons/md";
function Wallet() {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(true);
  const [cards, setCards] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  });
  const [showForm, setShowForm] = useState(false);
  const makePaymentMethodPrimary = async (paymentId) => {
    try {
      const formData = new FormData();
      formData.append("payment_id", paymentId);

      const response = await axios.post(
        "https://admin.myuni-hub.com/api/make_payment_method_primary",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Make sure the token is available in this scope
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(
          "Payment method set as primary successfully",
          response.data
        );
        toast.success(response.data.message);
        fetchData();
        // You can update state or navigate as needed here
      }
    } catch (error) {
      console.error("Error setting payment method as primary:", error);
      // Handle error appropriately
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://admin.myuni-hub.com/api/get_cards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCards(response.data.cards);

      if (response.data.cards.length === 0) {
        setShow(true);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    if (name === "number") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    const value = formData.number.replace(/[^\d]/g, "").slice(0, 16); // remove non-digits and limit length
    const formatted = value.replace(/(\d{4})/g, "$1 ").trim(); // insert spaces every 4 digits
    // setCardNumber(formatted);
    setFormData((prevState) => ({
      ...prevState,
      number: formatted,
    }));
  }, [formData.number]);
  const handleInputChangecvc = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;

    // Validate cvc input
    if (name === "cvc" && value.length > 3) {
      validatedValue = value.slice(0, 3); // keep only the first 3 digits
      toast.error("CVC cannot be more than 3 digits");
    }

    setFormData({ ...formData, [name]: validatedValue });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate month
    if (name === "exp_month") {
      if (value > 12 || value < 1) {
        toast.error("Enter Valid Month");
        return;
      }
      if (value.length === 1 && value < 10) {
        setFormData({ ...formData, [name]: `0${value}` });
        return;
      }
    }

    // Validate year
    if (name === "exp_year") {
      const currentYearLastTwoDigits = new Date().getFullYear() % 100;
      if (
        value.length > 2 ||
        (value.length === 2 && value < currentYearLastTwoDigits)
      ) {
        toast.error("Enter Valid Year");
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const url = "https://admin.myuni-hub.com/api/get_cards";
  const sendCardData = async () => {
    if (formData.number === "") {
      toast.error("Enter Card Number");
      return;
    } else if (formData.exp_month === "") {
      toast.error("Enter Expiry Month");
      return;
    } else if (formData.exp_year === "") {
      toast.error("Enter Expiry Year");
      return;
    } else if (formData.cvc === "") {
      toast.error("Enter CVC");
      return;
    }
    try {
      const response = await axios.post(
        "https://admin.myuni-hub.com/api/create_payment_method",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.status == 200 && response.data.message === "") {
        fetchData();
        setShowForm(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="tab-wallet">
      {showForm ? (
        <React.Fragment>
          <h2 style={{ textAlign: "center" }}>Add Card</h2>
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
                Card Number
              </FormLabel>
              <Input
                variant="unstyled"
                border="none"
                name="number"
                type="text"
                value={formData.number}
                onChange={handleInputChanges}
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
                  Year
                </FormLabel>
                <Input
                  variant="unstyled"
                  border="none"
                  name="exp_year"
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
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
                  Month
                </FormLabel>
                <Input
                  variant="unstyled"
                  border="none"
                  name="exp_month"
                  type="number"
                  value={formData.month}
                  onChange={handleInputChange}
                  fontSize="41px"
                />
              </Box>
            </SimpleGrid>
            <Box
              className="input-container"
              border="1px solid #7BB564"
              borderRadius={30}
              marginTop="103px"
              marginBottom="103px"
            >
              <FormLabel
                padding="20px 0px 0px 20px"
                fontSize="37px"
                fontWeight={300}
              >
                CVC
              </FormLabel>
              <Input
                variant="unstyled"
                border="none"
                name="cvc"
                type="text"
                value={formData.cvc}
                onChange={handleInputChangecvc}
                fontSize="41px"
              />
            </Box>
          </FormControl>
        </React.Fragment>
      ) : (
        <>
          <div className="summarys">
            <div className="cards-container">
              {cards !== null ? (
                cards?.map((item, index) => {
                  return (
                    <div
                      className="card-row"
                      style={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => {
                        makePaymentMethodPrimary(item.id);
                      }}
                    >
                      <div className="card"></div>
                      <div className="card-text">
                        <h3>{item.brand}</h3>
                        <p> &#8226;&#8226;&#8226;&#8226;{item.last_digit}</p>
                      </div>
                      {item.is_primary == 1 && <div className="check"></div>}
                    </div>
                  );
                })
              ) : (
                <>
                  <React.Fragment>
                    <h2>My Wallet</h2>
                    <span className="upper">
                      Save your credit and debit card details for <br></br>{" "}
                      faster checkout.
                    </span>
                    <p>You Haven’t Saved Any Cards Yet</p>
                    <span className="lower">
                      Securely save your payment details when you place an order{" "}
                      <br></br>
                      at checkout.
                    </span>
                  </React.Fragment>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <div className="primary-btn">
        {showForm ? (
          <Button
            rightIcon={<MdArrowForward />}
            bg="#7BB564"
            color={"white"}
            variant="solid"
            width={"100%"}
            onClick={() => {
              sendCardData();
            }}
          >
            Add New Card
          </Button>
        ) : (
          <Button
            rightIcon={<MdArrowForward />}
            bg="#7BB564"
            color={"white"}
            variant="solid"
            width={"100%"}
            onClick={() => {
              setShowForm(true);
            }}
          >
            Add New Card
          </Button>
        )}
      </div>
    </div>
  );
}

export default Wallet;
