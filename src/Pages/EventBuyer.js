import React, { useEffect, useState, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./bookcleaner.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  Radio,
  Input,
  Box,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import cleaner from "./../Images/cleaners.png";
import { MdArrowForward } from "react-icons/md";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

function EventBuyer() {
  const [data, setData] = useState(null);
  const [detailedData, setDetailedData] = useState([]);
  const navigate = useNavigate();
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  useEffect(() => {
    fetchData();
    console.log("ghariya", memoizedData);
  }, []);

  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  const fetchData = async () => {
    try {
      const response = await axios.get("https://admin.myuni-hub.com/api/api/events", {
        headers,
      });
      setData(response.data.events);
      console.log("biloll", response.data.events);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const memoizedData = useMemo(() => data, [data]);
  const [selectedOption, setSelectedOption] = useState(null);

  const encodedObj = encodeURIComponent(JSON.stringify(selectedOption));
  useEffect(() => {
    console.log("fatiha", data);
  }, [selectedOption]);

  const handleRadioChange = (event) => {
    const id = event.target.value;
    console.log(id);
    const option = data.find((item) => item.id === parseInt(id));
    setSelectedOption(option);
    console.log("option");
  };
  return (
    <div className="bookcleaner">
      <Header />
      <div className="wrapper">
        <h2>Book An Event</h2>
        <figure>
          <img src={cleaner} />
        </figure>
        {data == null ? (
          <h2> No Events yet</h2>
        ) : (
          <>
            {memoizedData?.map((item, index) => {
              return (
                <div key={index} className="card-cleaner">
                  <h4>{item.title}</h4>
                  <ul>
                    <p>{item.descreption}</p>
                  </ul>
                  <h4>Select Package</h4>
                  {/* <div className='package-box'> */}
                  <RadioGroup className="package-box">
                    {item.prices.map((price, _index) => (
                      <Radio
                        onChange={(event) => {
                          const id = event.target.value;
                          console.log(id);
                          const option = item.prices.find(
                            (item) => item.id === parseInt(id)
                          );
                          return setSelectedOption(option);
                        }}
                        style={{ border: "1px solid #7BB564" }}
                        key={price.id}
                        value={price.id.toString()}
                      >
                        <p className="title">{price.title}</p>
                        <p> {price.price}</p>
                      </Radio>
                    ))}
                  </RadioGroup>
                  {item.prices.map((price, index) => {
                    <div className="price-box" key={index}>
                      <p className="title">{price.title}</p>
                      {/* <Checkbox onChange={(e) => console.log(e.target.checked)}>{price.price}
      </Checkbox>  */}
                    </div>;
                  })}
                  {/* </div> */}
                </div>
              );
            })}
             <div className="wallet-btn">
          <Button
            rightIcon={<MdArrowForward />}
            bg="#7BB564"
            color={"white"}
            variant="solid"
            width={"100%"}
            onClick={() =>
              handleRouteChange(
                `/events/:${selectedOption?.id}`,
                selectedOption
              )
            }
          >
            Next
          </Button>
        </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default EventBuyer;
