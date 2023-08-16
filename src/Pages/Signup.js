// screen 5
import React, { useState, useEffect,useMemo } from "react";
import "./signup.css";
import "../responsive.css";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import apple from "../Images/apple.png";
import facebook from "../Images/facebook.png";
import google from "../Images/google.svg";
// import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { signUp } from "../apis/UserApi";
import { signUpUser } from "../thunks/userThunks";
import { toast } from "react-toastify";
function Signup() {
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "1",
  });
  const [universities, setUniversities] = useState(null);
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTc1YzljMGExODM0NzkyYjljZDNjOWE0NWUwYWVmZDgwOTkwYTcwMzIxYzEwZTQ4MmZlZDJkZjIwMDMyY2Y2NzUxOTcwMDc0NWRmMzAxMDkiLCJpYXQiOjE2OTA1NzUwODkuMTQ2NzA5LCJuYmYiOjE2OTA1NzUwODkuMTQ2NzExLCJleHAiOjE3MjIxOTc0ODkuMTQwNDE5LCJzdWIiOiI4NyIsInNjb3BlcyI6W119.I6zIZZO7_CXhP0uPkbYmK3Ta0rRxa_LEGqftluBtwbFct5NGIs6cvut_cFRBI8lZXDVAQg7TjEouoNA9HnEfEJFs5EKfHeio3LqrZg9l-dXI4HqefOVr8lNXqQpFuOGKBfsCMaB_zLViFoBfSF_Ew9kNRR92cAbuNtXGQ0BBDhuruuqa3iu2ns0TqXRD4ROEMXYCNA9jGYvY-0BDM2SJcKkjMi9RhAHBuVrBbxlyVc0HjnFIhZI1JyqMxfehLG3Xaq7aoHG7Mg_qTC4ge400r074yM5dPKqVRoCicryHObXbeAZK_GPuqeJozOJL1PgcwvyDbw-gX_jStzY9MXzMne9yha214aArjv519QhealRyOxbcAG5VaSiav7j7e_a_W9J7dc_l67A4vk_T1NCu8j9TFiDERIXAOlsBQ1j9VmMfaVTYbeuJxZ2ZaXyfXtZ9kl89_4vVHm8nM3x5gm-PjRxwKWAZ_hM_taTc-j7W8F5u9tzfC2VRDtY1P8YF9q9zd4xe_HoZzjqDD8CPO9sP6aIHnqikJGLRlQoUk_cdFeOWI_eQ5bDAoGQd46551iaXqqHlXhSb-SxAyAJMveUWRzlcqz4KOZ2dWF_ZVri4eeQ1soF0TmTrX_o7d1gkSbe_qF9PBEy2m3xfXF-wbS3zbdvxnBGg0Rese05E3qEbSm0'
 
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
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    fetchUniversities(token).then((data) => {
      setUniversities((prevData) => {
        prevData = data;
        return prevData;
      });
    });
    console.log("qwe", universities);
  }, [token]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password must be same");
    } else if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
    } else if (
      formData.confirmPassword == "" ||
      formData.password == "" ||
      formData.email == "" ||
      formData.name == ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      dispatch(signUpUser(formData));
    }
  };
  const mappedUniversities = useMemo(() => {
    return universities?.data?.map((set, key) => {
      return (
        <option key={key} value={set.id}>
          {set.name}
        </option>
      );
    });
  }, [universities]);
  return (
    <div className="signup-page">
      <div className="container">
        <div className="headu">
          <Link to="/">
            <figure className="logo">
              <img src={logo} alt="unihub-logo" />
            </figure>{" "}
          </Link>
          <h2>Create Your UNIHUB Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="name"
              type="text"
              placeholder="Name"
            />
            {/* icon */}
          </div>
          <div className="input-container">
            <input
              onChange={(e) => {
                handleInputChange(e);
              }}
              name="email"
              type="text"
              placeholder="Email Address"
            />
            {/* icon */}
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              onChange={(e) => {
                handleInputChange(e);
              }}
              placeholder="Password"
            />
            {/* icon */}
          </div>

          <div className="input-container">
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => {
                handleInputChange(e);
              }}
              placeholder="Confirm Password"
            />
            {/* icon */}
          </div>
          {/* <div className="input-container">
  */}
          <select  onChange={(e) => {
      handleInputChange(e);
    }}
     className="input-container"
    placeholder="Select University"
    name="university"
    variant={'unstyled'}>
      
       {mappedUniversities}
        {/* Add more options here */}
      </select>
          {/* </div> */}
          <span className="upspan">
            Password must be at least 8 characters long contain a number and an
            uppercase letter example
          </span>
          <button className="btn">Sign Up</button>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {user && <p>Welcome, {user.name}!</p>}
        </form>
        <div className="media-newhub">
          <span className="downspan">Or continue with</span>
          <div className="media-accounts">
            <figure className="media-icon">
              <img src={facebook} alt="facebook" />
            </figure>
            <figure className="media-icon">
              <img src={google} alt="google" />
            </figure>
            <figure className="media-icon">
              <img src={apple} alt="apple" />
            </figure>
          </div>
          <h3 className="new-to-unihub">
            Already Have an Account?
            <span>
              <Link to="/login">Sign In</Link>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Signup;
