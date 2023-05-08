// screen 1
import React,{useEffect, useState} from 'react'
import './signin.css'
import logo from '../Images/logo.png'
import apple from '../Images/apple.png'
import facebook from '../Images/facebook.png'
import { setToken } from '../features/UserSlice'
import { Link } from 'react-router-dom'
import google from '../Images/google.png'
import { useDispatch,useSelector   } from 'react-redux'

import { useMutation } from 'react-query';
const baseUrl = process.env.BASE_URL;

export const login = (credentials) => async (dispatch) => {
const { email, password } = credentials;
  try {
    const response = await fetch('http://34.233.35.208/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    dispatch(setToken(data.token));
  } catch (error) {
    console.error(error);
  }
};

// export const login = async (formData) => {
//   console.log("firstttt",formData)
//   try {
//     console.log("firstttssst")
//     // Make a POST request to the login API endpoint with the form data
//     const response = await fetch('http://34.233.35.208/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       // Handle error response from the server
//       throw new Error('Failed to login');
//     }

//     // Parse the response as JSON and return it
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     // Handle any errors that occur during the request
//     throw new Error('Failed to login');
//   }
// };
function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


const handleSubmit = async (event) => {
  event.preventDefault();

const data = {
  password: formData.password,
  email: formData.email,
};

console.log("data",formData)  
  dispatch(login(data))
// fetch('http://192.168.19.25:8000/api/login', {
//   method: 'POST',
//   headers:{
//     'Content-Type': 'application/json',
//   },
//   body:JSON.stringify(data),
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error('There was a problem with the API call:', error);
//   });  
  // const response = await fetch('https://example.com/api/data', {
  //   method: 'POST',
  //   body: JSON.stringify({ name, email }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // ...
};

const user = useSelector((state) => state);
useEffect(() => {
console.log(user)
}, [])

  return (
    <div className="signin-page">
      <div className="container">
        <div className="headu">
          <figure>
            <img src={logo} alt="unihub-logo" />
          </figure>
          <h2>Sign in to Continue</h2>
        </div>
        <form>
          <div className="input-container">
            <input onChange={(e)=>{handleInputChange(e)}} name='email' type="text" placeholder="Email Address" />
            {/* icon */}
          </div>
          <div className="input-container">
            <input onChange={(e)=>{handleInputChange(e)}} name='password' type="text" placeholder="Password" />
            {/* icon */}
          </div>
          <span className="forgetti-password">
            <Link to="/forgetpassword">Forget Password?</Link>
          </span>
         
            <button onClick={handleSubmit}  className="btn">Sign in</button>
        
          <span className="continue">Or continue with</span>
        </form>
        <div className="media-newhub">
          <div className="media-accounts">
            <figure>
              <img src={facebook} alt="facebook" />
            </figure>
            <figure>
              <img src={google} alt="google" />
            </figure>
            <figure>
              <img src={apple} alt="apple" />
            </figure>
          </div>
          <h3 className="new-to-unihub">
            New to UNIHUB?{" "}
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Signin;
