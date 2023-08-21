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
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmRkNWI4MDYwZTcyNzM5MjlhNWZlNTY4OGUwMTA3NzJhZDA0OTFmZmFmYzAzOTBmN2EyNmU2Njc3MjkzODZhOWQ5MGI3ZTUyNzk2Y2VhNWEiLCJpYXQiOjE2OTA0NDMxNjkuMjY5NjE3LCJuYmYiOjE2OTA0NDMxNjkuMjY5NjIsImV4cCI6MTcyMjA2NTU2OS4yNjM2ODYsInN1YiI6IjczIiwic2NvcGVzIjpbXX0.hHRkYWoLDaE14aAb7K8hiI3iCvbKzcbunAvgbHMeoQltw2Gwb19ylJqzwpsT4cVmICssCFKuMANMwO1fjFdyhJf4yXTTUmAgL-Am8CUT2NMeOfN-H_uuvS4akgo7zC445Q0HbWi5k4qrb-_lQf4tM6XCr8FZgbvVSgkImxVISPslfOmqwrE8246V4isbJU3hPYrvt0o9y0u7UJl8e1SVs4V2N9O8BMEmls_8we99PHcy-0d-Rk4vi-YAtBPC6E9f37Zbo3kECwr_Cx-h8FiJVyWZREf4vbL2SeegnLRLEj4yF0QmdY20Bn4cYrHOAnGYfimpYbfEgCMPTWy5z9jifIK0-odfJGGaex900EL1zqeAW8Es5RfVqf57V_kGMP62-MFQOLn2ESERBkRNYQs9jTL1jmMMYvzyD4y135Q-QOn0g_hAY-LFRnd2bPA1wclOMGEPB7v6VR3-gxF3i90TAbAz3u8tHkq6F45o1Kt8bekjMD8CjSxd_g9Scu9yf0qqZfkrVNs7FoieZoVX8q9v6dm9bUfCnVUPk1GkcPlnQO4OyLltyflyMR_D1dMgf3sdXhdpU_IF452ZNauQaPo1baLLdQIPcbTRmhkN1edXupi4rm5-zSliyPebC6aAvP3LswFt7_pOTGb6rJA_8qg18V7vd5yobyeiUhdARemQ2tE'
 
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
