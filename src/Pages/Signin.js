// screen 1
import React,{useEffect, useState} from 'react'
import './signin.css'
import "../responsive.css";
import logo from '../Images/logo.png'
import apple from '../Images/apple.png'
import facebook from '../Images/facebook.png'
import { setToken } from '../features/UserSlice'
import { Link } from 'react-router-dom'
import google from '../Images/google.svg'
import { useDispatch,useSelector   } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
const baseUrl = process.env.BASE_URL;

function Signin() {
  ;
  const navigate = useNavigate();
  const handleRouteChange = (url,datas) => {
    navigate(url, { state: { data: datas } });
  };
  const token = useSelector((state) => state.auth.token);;
   const logins = (credentials) => async (dispatch) => {
    const { email, password } = credentials;
      try {
        const response = await fetch('https://admin.myuni-hub.com/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        // console.log()
        console.log("",data)
        if(data.message == 'User does not exist!'){
          toast.error(data.message)
        }
        if(data.message == "Check your email for otp!"){
          handleRouteChange("/otp",credentials)
        // dispatch(setToken(data.token));
        }else{
          handleRouteChange("/login",)
        }
      } catch (error) {
        // console.error(error);
        // toast.error(error.message)
      }
    };
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
const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const check =  pattern.test(formData.email);
if(formData.email == "" || formData.password == ""){
  toast.error("Please fill all the fields")
}else if(check !==  true){
  toast.error("Please enter valid email")
}
else{

  dispatch(logins(data))
  if (data) {
    console.log("data",data)
  }
}
console.log("data",formData)  

};

const user = useSelector((state) => state);
useEffect(() => {
console.log(user)
}, [])

  return (
    <div className="signin-page">
      <div className="container">
        <div className="headu">
        <Link to="/">
          <figure className="logo">
            <img src={logo} alt="unihub-logo" />
          </figure>
          </Link>
          <h2>Sign in to Continue</h2>
        </div>
        <form>
          <div className="input-container">
            <input onChange={(e)=>{handleInputChange(e)}} name='email' type="text" placeholder="Email Address" />
            {/* icon */}
          </div>
          <div className="input-container">
            <input onChange={(e)=>{handleInputChange(e)}} name='password' type="password" placeholder="Password" />
            {/* icon */}
          </div>
          <span className="forgetti-password">
            <Link to="/forgetpassword">Forgot Password?</Link>
          </span>
         <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>

            <button onClick={handleSubmit}  className="btn">Sign in</button>
            or
            <Link to="/signupseller"><button  className="btn">List a Service</button></Link>
         </div>
        
        </form>
        <div className="media-newhub">
          <span className="continue">Or continue with</span>
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
