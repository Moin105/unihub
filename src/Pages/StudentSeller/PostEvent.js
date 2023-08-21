import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { MdArrowForward } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import DateTime from "react-datetime";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Box, Heading, Button } from "@chakra-ui/react";

const EventForm = () => {
  const [value, setValue] = useState(new Date());

  const [productStatus, setProductStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state ? location.state.data : null;
  const [formData, setFormData] = useState({
    title: "",
    descreption: "",
    date_time: new Date(),
    address: "",
    lat: "",
    lng: "",
    packages: [],
    image: null,
    seat_limit: null,
    each_person_buying_capacity: null,
  });
  const token = useSelector((state) => state.auth.token);

  const updatedPackages = [...formData.packages];

  const handlePackageChange = (event, index, fieldName) => {
    if (!updatedPackages[index]) {
      updatedPackages[index] = {};
    }
    updatedPackages[index][fieldName] =
      fieldName === "price" ? parseInt(event.target.value) : event.target.value;
    setFormData({ ...formData, packages: updatedPackages });
  };
  const handleInputChange = (event, fieldName) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };
  const fetchData = async (data) => {
    const url = `https://admin.myuni-hub.com/api/events/${data}`;

    return axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // Handle the response here as needed
        console.log("sag",response.data.data);
        setValue(new Date(response.data.data.date_time));
        setFormData({
          title: response.data.data.title,
          descreption: response.data.data.descreption,
          date_time: response.data.data.date_time,
          address: response.data.data.address,
          lat: response.data.data.lat,
          lng: response.data.data.lng,
          packages: response.data.data.packages,
          seat_limit: response.data.data.seat_limit,
          each_person_buying_capacity: response.data.data.each_person_buying_capacity,
          packages: response.data.data.prices,
          _method:'PUT'
        })
      })
      .catch((error) => {
        // Handle the error here
        console.error("An error occurred:", error);
      });
  };
  useEffect(() => {
    if (data) {
      fetchData(data);
    }
  }, []);

  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  // const handlePackageChange = (event, index, field) => {
  //   const newPackages = JSON.parse(JSON.stringify(formData.packages));
  //   newPackages[index][field] = event.target.value;
  //   setFormData({ ...formData, packages: newPackages });
  // };

  const removePackage = (index) => {
    const newPackages = JSON.parse(JSON.stringify(formData.packages));
    newPackages.splice(index, 1);
    setFormData({ ...formData, packages: newPackages });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { title: "", descreption: "", price: "" },
      ],
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
      if (key === "packages") {
        formData[key].forEach((pkg, index) => {
          for (const pkgKey in pkg) {
            data.append(`packages[${index}][${pkgKey}]`, pkg[pkgKey]);
          }
        });
      } else if (key === "image") {
        data.append("image", formData[key], formData[key].name);
      } else if (key === "date_time") {
        let date = new Date(value);

        let yearMonthDay = date.toISOString().slice(0, 10); // Gets "2023-05-22"
        let hoursMinutes = date.toISOString().slice(11, 16); // Gets "10:40"

        let formattedDate = `${yearMonthDay} ${hoursMinutes}`; // Combine date and time

        console.log(formattedDate); // Prints: "2
        data.append("date_time", formattedDate);
      } else {
        data.append(key, formData[key]);
      }
    }

    // Setup axios config with Bearer token
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    // Send the request
    try {
      const response = await axios.post(
        "https://admin.myuni-hub.com/api/events",
        data,
        config
      );
      // Handle success response here
      toast.success("Form submitted successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("API response:", response);
    } catch (error) {
      // Handle error response here
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
      console.error("API error:", error);
    }
  };
  const handleSubmits = async (event) => {
    event.preventDefault();
    console.log("awari",formData);
   
    // Prepare form data for submission
    const datas = new FormData();
    datas.append('address',formData.address)
    datas.append('title',formData.title)
    datas.append('descreption',formData.descreption)
    datas.append('date_time',formData.date_time)
    datas.append('lat',formData.lat)
    datas.append('lng',formData.lng)
    datas.append('packages',JSON.stringify({"prices":formData.packages}))
    datas.append("_method", "PUT");
    // for (const key in formData) {
    //   data.append(key, formData[key]);
    // }
    // for (const key in formData) {
    //   if (key === "packages") {
    //     datas.append("packages", JSON.stringify(formData[key]));

    //     // formData[key].forEach((pkg, index) => {
    //     //   for (const pkgKey in pkg) {
    //     //     datas.append(`packages[${index}][${pkgKey}]`, pkg[pkgKey]);
    //     //   }
    //     // });
    //   } else if (key === "image") {
    //     // datas.append("image", formData[key], formData[key].name);
    //   } else if (key === "date_time") {
    //     let date = new Date(value);

    //     let yearMonthDay = date.toISOString().slice(0, 10); // Gets "2023-05-22"
    //     let hoursMinutes = date.toISOString().slice(11, 16); // Gets "10:40"

    //     let formattedDate = `${yearMonthDay} ${hoursMinutes}`; // Combine date and time

    //     console.log(formattedDate); // Prints: "2
    //     datas.append("date_time", formattedDate);
    //   } else {
    //     datas.append(key, formData[key]);
    //   }
    // }
    // console.log(formd)

    // Setup axios config with Bearer token
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    // Send the request
    try {
      const response = await axios.post(
        `https://admin.myuni-hub.com/api/events/${data}`,
        datas,
        config
      );
      // Handle success response here
      toast.success("Form submitted successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("API response:", response);
    } catch (error) {
      // Handle error response here
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
      console.error("API error:", error);
    }
  };
  const changeProductStatus = async (id) => {
    try {
      const response = await axios.get(
        `https://admin.myuni-hub.com/api/event_active_deactive/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ludwig", response.data);
    } catch (error) {
      console.error(error);
      console.log("lugwig", error.response.data.message);
    }
  };
  const deleteProduct = async () => {
    axios
      .delete(`https://admin.myuni-hub.com/api/events/${data}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Product deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        handleRouteChange("/sellerdetails");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  const handleActivate = async () => {
    if (productStatus === 1) {
      toast.error("Product is already active");
    } else {
      try {
        await changeProductStatus(data); // Change to your actual API call function
        setProductStatus(1);
        toast.success("Product activated successfully");
      } catch (err) {
        toast.error("Error activating the product");
      }
    }
  };

  const handleDeactivate = async () => {
    if (productStatus === 2) {
      toast.error("Product is already deactivated");
    } else {
      try {
        await changeProductStatus(data); // Change to your actual API call function
        setProductStatus(2);
        toast.success("Product deactivated successfully");
      } catch (err) {
        toast.error("Error deactivating the product");
      }
    }
  };
  return (
    <div className="servicehub">
      <Header />
      <div className="wrapper">
       {data ? <h2>Edit Event</h2>:<h2>Create Event</h2>}
        <form className="values-container" onSubmit={handleSubmit}>
          <div className="values">
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
                onChange={(e) => handleInputChange(e, "title")}
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
                onChange={(e) => handleInputChange(e, "descreption")}
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
              <DateTime value={value} onChange={setValue} />
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
                onChange={(e) => handleInputChange(e, "address")}
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
                onChange={(e) => handleInputChange(e, "seat_limit")}
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
                onChange={(e) =>
                  handleInputChange(e, "each_person_buying_capacity")
                }
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
                type="number"
                value={formData.lat}
                onChange={(e) => handleInputChange(e, "lat")}
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
                type="number"
                value={formData.lng}
                onChange={(e) => handleInputChange(e, "lng")}
              />
            </Box>

            <Heading as="h5" size="sm">
              Package 1
            </Heading>
            <div spacing={4} className="values-container">
              <div className="values">
                <Box
                  className="outline-box"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                >
                  <Heading as="h3" size="md" mb={2}>
                    Package Name
                  </Heading>
                  <Input
                    onChange={(e) => {
                      handlePackageChange(e, 0, "title");
                    }}
                    variant="unstyled"
                    value={formData.packages[0]?.title}
                  />
                </Box>
                <Box
                  m={0}
                  className="outline-box"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                >
                  <Heading as="h3" size="md" mb={2}>
                    Price
                  </Heading>
                  <Input
                    onChange={(e) => {
                      handlePackageChange(e, 0, "price");
                    }}
                    variant="unstyled"
                    value={
                      formData.packages[0]?.price
                        ? formData.packages[0]?.price
                        : 0
                    }
                  />
                </Box>
              </div>
            </div>

            <Heading as="h5" size="sm">
              Package 2
            </Heading>
            <div spacing={4} className="values-container">
              <div className="values">
                <Box
                  className="outline-box"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                >
                  <Heading as="h3" size="md">
                    Package Name
                  </Heading>
                  <Input
                    onChange={(e) => {
                      handlePackageChange(e, 1, "title");
                    }}
                    variant="unstyled"
                    value={formData.packages[1]?.title}
                  />
                </Box>
                <Box
                  className="outline-box"
                  borderWidth="1px"
                  borderRadius="lg"
                  m="0px"
                  p={4}
                >
                  <Heading as="h3" size="md">
                    Price
                  </Heading>
                  <Input
                    onChange={(e) => {
                      handlePackageChange(e, 1, "price");
                    }}
                    variant="unstyled"
                    value={
                      formData.packages[1]?.price
                        ? formData.packages[1]?.price
                        : 0
                    }
                  />
                </Box>
              </div>
            </div>
            <Heading as="h5" size="sm">
              Package 3
            </Heading>
            <div spacing={4} className="values-container">
              <div className="values">
                <Box
                  className="outline-box"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                >
                  <Heading as="h3" size="md">
                    Package Name
                  </Heading>
                  <Input
                    onChange={(e) => {
                      handlePackageChange(e, 2, "title");
                    }}
                    variant="unstyled"
                    value={formData.packages[2]?.title}
                  />
                </Box>
                <Box
                  className="outline-box"
                  borderWidth="1px"
                  borderRadius="lg"
                  m="0px"
                  p={4}
                >
                  <Heading as="h3" size="md">
                    Price
                  </Heading>
                  <Input
                    onChange={(e) => {
                      handlePackageChange(e, 2, "price");
                    }}
                    variant="unstyled"
                    value={
                      formData.packages[2]?.price
                        ? formData.packages[2]?.price
                        : 0
                    }
                  />
                </Box>
              </div>
            </div>
          {!data &&  <div className="image-container">
              <figure>{/* Add camera icon here */}</figure>
              <p>
                <input
                  type="file"
                  name="cover_img"
                  onChange={handleImageChange}
                />
              </p>
            </div>}

        {data  ?    <div className="primary-btn">
              <Button
                rightIcon={<MdArrowForward />}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
                onClick={(e) => {
                  handleSubmits(e);
                }}
                type="submit"
              >
                Edit Event
              </Button>
            </div> : <div className="primary-btn">
              <Button
                rightIcon={<MdArrowForward />}
                bg="#7BB564"
                color={"white"}
                variant="solid"
                width={"100%"}
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
              >
                Create Event
              </Button>
            </div> }
            {data && (
              <>
                {" "}
                <div className="primary-btn">
                  {" "}
                  <button
                    onClick={() => deleteProduct()}
                    style={{
                      color: "#BF1F1F",
                      textAlign: "center",
                      fontWeight: "400",
                      padding: "0px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Delete Product
                  </button>
                </div>
                <div className="primary-btn">
                  {" "}
                  <button
                    onClick={() => handleDeactivate()}
                    style={{
                      color: "#9D9D9D",
                      textAlign: "center",
                      fontWeight: "400",
                      padding: "0px",
                      padding: "0px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Deactivate Product
                  </button>
                </div>
                <div className="primary-btn">
                  {" "}
                  <button
                    onClick={() => handleActivate()}
                    style={{
                      color: "#7BB564",
                      textAlign: "center",
                      fontWeight: "400",
                      padding: "0px",
                      padding: "0px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Activate Product
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default EventForm;
