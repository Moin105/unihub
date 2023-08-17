import React, { useEffect, useState, useMemo } from "react";
import {
  Input,
  Select,
  Box,
  Heading,
  Button,
  Textarea,
} from "@chakra-ui/react";
import "../../Pages/servicehub.css";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";
import Header from "../../Components/Header";
import imageCompression from "browser-image-compression";
import Footer from "../../Components/Footer";
import { useLocation } from "react-router-dom";
// import camera from './../Images/camera.png'
import camera from "./../../Images/camera.png";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
// import SellerHeader from "./SellerHeader";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// import {MdArrowDropDown} from 'react-icons/md'
// import camera from './../Images/'
const postData = async (url, data, token, image, cover_img) => {
  const formData = new FormData();
  formData.append("category_id", data.category_id);
  formData.append("title", data.title);
  formData.append("descreption", data.descreption);
  formData.append("packages", JSON.stringify(data.packages));
  formData.append("university_id", data.university_id);
  formData.append("image", image);
  formData.append("cover_img", cover_img);
  formData.append("slot_ids", data.slot_ids);
  console.log(data, formData, image, cover_img);
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response:", response);
    // Handle success response heres
  } catch (error) {
    console.error("API error:", error);
    // Handle error response here
  }
};
const postDatas = async (url, data, token, image, cover_img) => {
  const formData = new FormData();
  formData.append("category_id", data.category_id);
  formData.append("title", data.title);
  formData.append("descreption", data.descreption);
  formData.append("packages", data.packages);
  formData.append("university_id", data.university_id);
  formData.append("slot_ids", data.slot_ids);
  formData.append("_method", "PUT");
  console.log(data, formData, image, cover_img);
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API sgew:", response);
    if (response.data.message == "Service Updated successfully!") {
      toast.success("Service Updated successfully!");
    }

    // Handle success response heres
  } catch (error) {
    console.error("API error:", error);
    // Handle error response here
  }
};
function PostCleaner() {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  const [serviceCategories, setServiceCategories] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [image, setImage] = useState(null);
  const [cover_img, setCoverImg] = useState(null);
  const navigate = useNavigate();
  const [productStatus, setProductStatus] = useState(null);
  const fetchServiceCategories = async (token) => {
    return await fetch("https://admin.myuni-hub.com/api/service_category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  const fetchUniversities = async (token) => {
    return await fetch("https://admin.myuni-hub.com/api/universities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const [formData, setFormData] = useState({
    category_id: "",
    title: "cleaning service",
    descreption: "",
    packages: [],
    university_id: "",
    slot_ids: "1",
  });
  // comment
  const getServiceDetails = async (token) => {
    try {
      const response = await axios.get(
        `https://admin.myuni-hub.com/api/cleaning_services/${data}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
      console.log("ameer", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    console.log(data);
    getServiceDetails(token).then((serviceDetails) => {
      // Extracting the values you need from the response
      console.log(serviceDetails);
      const {
        category_id,
        title,
        descreption,
        university_id,
        prices,
        cover_img,
      } = serviceDetails.data.data;
      console.log(prices);
      // Setting the initial form data with the extracted values
      setFormData({
        category_id,
        title,
        descreption,
        university_id,
        packages: prices.map((price) => ({
          title: price.title,
          price: price.price,
        })),
        slot_ids: "1",
      });
      setCoverImg(cover_img);
      setCoverImageName(cover_img);
      console.log(formData);
    });
  }, []);
  const [imageName, setImageName] = useState("");
  const [coverImageName, setCoverImageName] = useState("");
  const handleInputChange = (event, fieldName) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };
  const updatedPackages = [...formData.packages];

  const handlePackageChange = (event, index, fieldName) => {
    if (!updatedPackages[index]) {
      updatedPackages[index] = {};
    }
    updatedPackages[index][fieldName] =
      fieldName === "price" ? parseInt(event.target.value) : event.target.value;
    setFormData({ ...formData, packages: updatedPackages });
  };
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const showUploadSuccess = () => {
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
    }, 2000); // 2000 milliseconds = 2 seconds
  };
  const handleImageChange = async (event, name) => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedImage = await imageCompression(imageFile, options);
      console.log(`Compressed ${name} image:`, compressedImage);
      if (name === "cover_img") {
        setCoverImg((prevState) => {
          prevState = compressedImage;
          return prevState;
        });
        setCoverImageName(imageFile.name);
      } else if (name === "image") {
        setImage((prevState) => {
          prevState = compressedImage;
          return prevState;
        });
        setImageName(imageFile.name);
      }
      showUploadSuccess(); // Show the success message
    } catch (error) {
      console.error(`Error compressing ${name} image:`, error);
    }
  };

  const mappedServiceCategories = useMemo(() => {
    return serviceCategories?.data?.map((set, key) => {
      return (
        <option key={key} value={set.id}>
          {set.title}
        </option>
      );
    });
  }, [serviceCategories]);
  const mappedUniversities = useMemo(() => {
    return universities?.data?.map((set, key) => {
      return (
        <option key={key} value={set.id}>
          {set.name}
        </option>
      );
    });
  }, [universities]);

  useEffect(() => {
    fetchServiceCategories(token).then((data) => {
      setServiceCategories((prevData) => {
        prevData = data;
        return prevData;
      });
    });
    fetchUniversities(token).then((data) => {
      setUniversities((prevData) => {
        prevData = data;
        return prevData;
      });
    });
    console.log("qwe", serviceCategories, universities);
  }, [token]);
  const handleSubmit = (event) => {
    event.preventDefault();

    const finalFormData = {
      ...formData,
      packages: { prices: formData.packages },
    };
    console.log("hail", finalFormData);

    postData(
      "https://admin.myuni-hub.com/api/cleaning_services",
      finalFormData,
      token,
      image,
      cover_img
    );
    // Call the POST API with finalFormData heres
  };
  const changeProductStatus = async (id) => {
    try {
      const response = await axios.get(
        `https://admin.myuni-hub.com/api/cleaning_service_active_deactive/${id}`,
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
      .delete(`https://admin.myuni-hub.com/api/cleaning_services/${data}`, {
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
  const handleSubmits = (event) => {
    event.preventDefault();

    const finalFormData = {
      ...formData,
      packages: { prices: formData.packages },
    };
    console.log("hail", finalFormData);

    postDatas(
      `https://admin.myuni-hub.com/api/cleaning_services/${data}`,
      finalFormData,
      token,
      cover_img
    );
    // Call the POST API with finalFormData heres
  };

  return (
    <div className="servicehub">
      <Header />
      <div className="wrapper">
        <h2>Post Cleaner</h2>
        <p>
          Sell your cleaning services and get the customers to <br></br> get
          benefits of services.
        </p>
        <form className="values-container" onSubmit={handleSubmit}>
          <div className="values">
            <Box
              className="outline-box"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Heading as="h3" size="md" mb={2}>
                Select Service
              </Heading>
              <Select
                onChange={(e) => {
                  handleInputChange(e, "category_id");
                }}
                placeholder="Select a service"
                value={formData.category_id}
                variant="unstyled"
              >
                {mappedServiceCategories}
              </Select>
            </Box>

            <Box
              className="outline-boxs"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Heading as="h3" size="md" mb={2}>
                Service Description
              </Heading>
              <Textarea
                variant={"unstyled"}
                defaultValue=""
                resize="none"
                placeholder="Enter description here"
                rows={4}
                value={formData.descreption}
                onChange={(e) => {
                  handleInputChange(e, "descreption");
                }}
              />
            </Box>
          </div>
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
                  value={formData.packages[0]?.price}
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
                  value={formData.packages[1]?.price}
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
                  value={formData.packages[2]?.price}
                />
              </Box>
            </div>
          </div>
          <div className="values">
            <Box
              className="outline-box"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
            >
              <Select
                onChange={(e) => {
                  handleInputChange(e, "university_id");
                }}
                placeholder="Select University"
                variant={"unstyled"}
                value={formData.university_id}
              >
                {mappedUniversities}
                {/* Add more options here */}
              </Select>
            </Box>
          </div>

          <div className="image-container">
            <figure>
              <img src={camera} />
            </figure>
            <p style={{ textAlign: "center" }}>
              Cover Image
              <input
                type="file"
                accept="image/*"
                name="cover_img"
                onChange={(e) => {
                  handleImageChange(e, "cover_img");
                }}
              />
            </p>
          </div>
          {/* <h5>Uploaded Files</h5> */}
          <div className="values-container">
            <div className="outline-box"></div>
          </div>

          <div className="image-container">
            <figure>
              <img src={camera} />
            </figure>
            <p style={{ textAlign: "center" }}>
              Image
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => {
                  handleImageChange(e, "image");
                }}
              />
            </p>
          </div>
          <h5>Uploaded Files</h5>
          <div className="values-container margin-class">
            <div className="outline-box">
              <h3>{imageName ? imageName : "No Image Selected"}</h3>
              <h3>
                {coverImageName ? coverImageName : "No Cover Image Selected"}
              </h3>
            </div>
          </div>

          {uploadSuccess && (
            <div className="confirm-notification">
              <span>
                <BsCheckLg />
              </span>
              Uploaded successfully
            </div>
          )}
        </form>
        <div className="primary-btn">
          {data ? (
            <Button
              rightIcon={<MdArrowForward />}
              bg="#7BB564"
              color={"white"}
              variant="solid"
              width={"100%"}
              onClick={(e) => {
                handleSubmits(e);
              }}
            >
              Post Service
            </Button>
          ) : (
            <Button
              rightIcon={<MdArrowForward />}
              bg="#7BB564"
              color={"white"}
              variant="solid"
              width={"100%"}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Post Service
            </Button>
          )}
        </div>
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
      <Footer />
    </div>
  );
}

export default PostCleaner;
