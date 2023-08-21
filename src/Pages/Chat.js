import React, { useEffect, useState } from "react";
import "./chat.css";
import {
  ref,
  onChildAdded,
  push,
  set,
  serverTimestamp,
  get,
  onValue,
} from "firebase/database";
import { database } from "../firebase";
import { useLoaderData, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
function Chat() {
  const [chat, setChat] = useState(null);
  const location = useLocation();
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user.user);
  const data = location.state ? location.state.data : null;
  function _get_chat_id(from, to) {
    // Ensure consistent ordering
    if (from < to) {
      return from + "_" + to;
    } else {
      return to + "_" + from;
    }
  }

  const _encode = (email) => {
    return email.replace(/\./g, ",");
  };

  const loadChat = async () => {
    let from = _encode(user.email);
    let to = _encode(data);
    const chatRef = ref(database, "one_to_messages/" + _get_chat_id(from, to));

    onValue(chatRef, (snapshot) => {
      let temp = [];
      snapshot.forEach((childSnapshot) => {
        var itemVal = childSnapshot.val();
        temp.push(itemVal);
      });
      console.log("==== collection =====", temp);

      setChat(temp);
    });
    // setLoadingChat(false);
  };

  useEffect(() => {
    loadChat();
  }, []);
  const send = () => {
    let from = _encode(user.email);
    let to = _encode(data);
    let id = _get_chat_id(from, to);
    let msg = message;

    setMessage("");

    if (msg !== "") {
      const timestamp = serverTimestamp();

      // Push a new message to the one-to-one messages
      const messagesRef = ref(database, "one_to_messages/" + id);
      push(messagesRef, {
        createdAt: timestamp,
        text: msg,
        type: "text",
        sender: from,
        receiver: to,
      }).then(() => console.log("added"));

      // Update the chatlist for both the sender and the receiver
      const chatlistSenderRef = ref(database, "chatlist/" + from + "/" + to);
      const chatlistReceiverRef = ref(database, "chatlist/" + to + "/" + from);

      set(chatlistSenderRef, {
        id: to,
        text: msg,
        type: "text",
        chatUser: user.id,
        createdAt: timestamp,
      });

      set(chatlistReceiverRef, {
        id: from,
        text: msg,
        type: "text",
        createdAt: timestamp,
      });
    }
  };

  const handleSendClick = () => {
    send(); // Call the send function
  };
  return (
    <div className="chat">
      <Header />
      <div>
        <div className="wrapper">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4>Messages</h4>
          </div>

      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendClick}>Send</button>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
