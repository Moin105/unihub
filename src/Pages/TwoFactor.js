// screen 1
import React,{useEffect, useState} from 'react'
import './signin.css'
import "../responsive.css";
import logo from '../Images/logo.png'
import apple from '../Images/apple.png'
import facebook from '../Images/facebook.png'
import { setToken,setName } from '../features/UserSlice'
import { Link } from 'react-router-dom'
import google from '../Images/google.png'
import { useDispatch,useSelector   } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
function TwoFactor() {
    const navigate = useNavigate();
    const location = useLocation()
    const handleRouteChange = (url,datas) => {
      navigate(url, { state: { data: datas } });
    };
    useEffect(() => {
     console.log("location",location.state.data)
    }, [])
    
    const token = useSelector((state) => state.auth.token);;
     const logins = (credentials) => async (dispatch) => {
      const { otp } = credentials;

        try {
          const response = await fetch('https://admin.myuni-hub.com/api/match_otp', {
            method: 'POST',
            body: JSON.stringify({otp:credentials.otp,email:location.state.data.email}),
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          // console.log()
          console.log("barka",data)
          if(data.status == 200 ){
            dispatch(setToken(data.token));
            dispatch(setName(data))
            handleRouteChange("/",)
          }else{
            // try again 
          }
        //   if(data.message == "Check your email for otp!"){
        //     handleRouteChange("/otp",data)
        //   // dispatch(setToken(data.token));
        //   }else{
        //     handleRouteChange("/login",)
        //   }
        } catch (error) {
          console.error(error);
        }
      };
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      otp:""
  
    });
    const dispatch = useDispatch();
    const handleInputChange = (event) => {
      setFormData({ [event.target.name]: event.target.value });
      console.log("formdata",formData)
    };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
  const data = {
    password: formData.password,
    email: formData.email,
    otp:formData.otp
  };
  
  console.log("data",formData)  
    dispatch(logins(data))
    if (data) {
      console.log("data",data)
      // history.push('/dashboard');
    }
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
        <figure className="logo">
          <img src={logo} alt="unihub-logo" />
        </figure>
        <h2>2 Step Verification</h2>
      </div>
      <form>
        <div className="input-container">
          <input onChange={(e)=>{handleInputChange(e)}} name='otp' type="text" placeholder="Enter Otp" />
          {/* icon */}
        </div>
        <span className="forgetti-password">
          <Link to="/forgetpassword">Forgot Password?</Link>
        </span>
       <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>

          <button onClick={handleSubmit}  className="btn">Submit</button>
        </div>
      
      </form>
      <div className="media-newhub">
      
      </div>
    </div>
  </div>
  )
}

export default TwoFactor