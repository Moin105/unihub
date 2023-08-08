import React, { useEffect,useState } from 'react'
import { Button } from '@chakra-ui/react'
import axios from 'axios';
import { MdArrowForward } from "react-icons/md";
import { useSelector } from 'react-redux';
import './userid.css'
import {MdVerifiedUser} from 'react-icons/md'
function MyUserId() {
    
  const user = useSelector((state) => state.user.user);
  const token =useSelector((state) => state.auth.token);  
  const [universities, setUniversities] = useState([]);
  const [univeristy,setUniversity] = useState('')
  const fetchUniversit = async (token) => {
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

useEffect(() => {
    // fetchUniversities(token).then((data) => console.log(data));
    fetchUniversit(token).then((data) => setUniversities(data.data));
    console.log("universities", universities)
}, [])
const findById = (array, targetId) => {
    console.log(array.find((item) => item.id === targetId))
    const foundItem =  array.find((item) => item.id === targetId);
    if(foundItem){
   return foundItem?.name}
   else{
    return 'University of United Kingdom'
   }
  };
  useEffect(() => {
    findById(universities,user.university_id)
  }, [universities])
  

  return (
    <div className="tab-order">
    <h2>My ID</h2>
    <span className="upper">
      See Your Verified University ID Card
    </span>
     
      <React.Fragment>
        <div className='namebox'>
             <h3>{user.name}</h3>


        </div>
        <div className='namebox'>
             <h3>{findById(universities,user.univeristy_id)} <span><MdVerifiedUser/></span></h3>
        </div>
        <div className='namebox'>
             <h3>ID#{user.id}</h3>
        </div>
      <div className='idcard'>
           <div className='details'>

           <div className='nameboxs'>
           <label>Name</label>
             <h3>{user.name} </h3>
        </div>
        <div className='nameboxs'>
        <label>Univeristy</label>
             <h3>{findById(universities,user.univeristy_id)} <span><MdVerifiedUser/></span></h3>
        </div>
        <div className='nameboxs'>
            <label>ID Status</label>
             <h3>ID#{user.id}</h3>
        </div>
           </div>
           <img src={`https://admin.myuni-hub.com/${user.profile_img}`}   className='image'/>
      </div>
      </React.Fragment>
    
  </div>
  )
}

export default MyUserId