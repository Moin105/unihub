import React,{useEffect, useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import prolific from "../Images/prolific.png";
import { Switch,Button,Flex } from "@chakra-ui/react";
import Inquiry from "./Inquiry";
import { useNavigate } from "react-router-dom";
import "./../Components/message.css";
import { useSelector } from "react-redux";
import { ref, onChildAdded, get } from 'firebase/database';

// import {  ref, onValue, push, set } from 'firebase/database';
import axios from 'axios'
import {database} from '../firebase'
function Messages() {
  const user = useSelector((state) => state.user.user);
const [show,setShow] = useState(false)

const handleChange = () => {
  setShow(!show);
};
// const database = firebase.database();

const [activeButton, setActiveButton] = useState('button1');
const [UserChats,setUserChats] = useState([])
// function _encode(str) {
//   return encodeURIComponent(str);
// }
const _encode = (email) => {
  return email.replace(/\./g, ',');
};
const handleClick = (buttonId) => {
  setActiveButton(buttonId);
};
const navigate = useNavigate()
const Api = axios.create({
  baseURL: 'https://admin.myuni-hub.com/api',
});
const handleRouteChange = (url,datas)  => {
  navigate(url, { state: { data: datas } });
};

const loadUserChats = async () => {
  console.log("==== inside load user chats =======",user);
  setUserChats([]);
  // console.log()
  const chatlistRef = ref(database, "chatlist/" + _encode(user.email));
   console.log("sadsfdgghmj",chatlistRef)
  onChildAdded(chatlistRef, (snapshot) => {
    console.log("snapshot.val()", snapshot.val());
    let item1 = snapshot.val();
    const userRef = ref(database, "users/" + item1.id);
    
    get(userRef).then((snapshot) => {
      console.log("sadsfdgghmj")
      let new_ob = snapshot.val();
      let userChats = [
        ...UserChats, 
        {
          ...item1,
          name: user.name,
          email: user.email,
          avatar: user.profile_img,
          getChatid:user.id
        },
      ];
      
      let dd = userChats.sort((a, b) =>
        a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0
      );
      console.log("=== user chats ===", dd);
      setUserChats(dd);
      console.log("chats",userChats)
      // setLoadingChats(false)
    });
  });
  // setLoadingChats(false)
};
useEffect(() => {
   loadUserChats()
}, [])


  return (
    <div className="messages">
      <Header />
      <div className="wrapper">
        <div style={{display:"flex",flexDirection:"column"}}>
          <h4>Messages</h4>
          <p className="count-message">You have 2 new messages</p>
          {/* <Flex alignItems="center">
      <Text color={show ? 'black' :'white' } background={show? 'grey': '#88B46D' } padding={"5px 10px"} borderRadius={"4px"}>Off</Text>
      <Box mx={2}>
        <Switch
          id="email-alerts"
          isChecked={show}
          onChange={handleChange}
          colorScheme="green"
          _checked={{ bg: "customColor.200" }}
          _track={{ bg: "gray.200" }}
        />
      </Box>
      <Text color={!show ? 'black' :'white' } background={!show? 'grey': '#88B46D' } padding={"5px 10px"} borderRadius={"4px"}>On</Text>
    </Flex> */}
     <Flex>
      <Button
        color={activeButton === 'button2' ? 'black' : 'white'}
        background={activeButton === 'button2' ? '#DBDBDB' : '#88B46D'}
        onClick={() => handleClick('button1')}
      >
        Seller
      </Button>
      <Button
        color={activeButton === 'button1' ? 'black' : 'white'}
        background={activeButton === 'button1' ? '#DBDBDB' : '#88B46D'}
        
        onClick={() => handleClick('button2')}
      >
        Support
      </Button>
    </Flex>
        </div>
     {activeButton === 'button1' && <div style={{width:"100%"}}>
             {
              UserChats && UserChats.map((user,index)=>{
                return   <div className="messenger-container" key={index} onClick={()=>{handleRouteChange('/chat-with-seller',user.id)}}>
                <div className="messenger-box">
                  <div className="figure">
                    <figure>
                      <img src={user.avatar ?  `https://admin.myuni-hub.com/${user?.avatar}`  :  prolific} />
                    </figure>
                  </div>
                  <div className="name-message">
                    <div className="upper-row">
                      <h3>{user.name}</h3>
                      <span>Now</span>
                    </div>
                    <p>{user.text}</p>
                  </div>
                </div>
              </div>
              })
             }
        </div>}{activeButton === 'button2' && <><Inquiry/></>}
      </div>
      <Footer />
    </div>
  );
}

export default Messages;
