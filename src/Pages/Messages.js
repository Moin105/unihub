import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import prolific from "../Images/prolific.png";
import "./../Components/message.css";
function Messages() {
  const user_id = "current_user_id"; // Replace with actual current user ID
  // const query = collection(db, 'chats').where('participants', 'array-contains', user_id);
  // const [chatsSnapshot] = useCollection(query);

  return (
    <div className="messages">
      <Header />
      <div className="wrapper">
        <h4>Messages</h4>
        <p className="count-message">You have 2 new messages</p>
        <div className="messenger-container">
          <div className="messenger-box">
            <div className="figure">
              <figure>
                <img src={prolific} />
              </figure>
            </div>
            <div className="name-message">
              <div className="upper-row">
                <h3>Julian Dasilva</h3>
                <span>Now</span>
              </div>
              <p>Hi Julian! See you after work?</p>
            </div>
          </div>
        </div>
        <div className="messenger-container">
          <div className="messenger-box">
            <div className="figure">
              <figure>
                <img src={prolific} />
              </figure>
            </div>
            <div className="name-message">
              <div className="upper-row">
                <h3>Julian Dasilva</h3>
                <span>Now</span>
              </div>
              <p>Hi Julian! See you after work?</p>
            </div>
          </div>
        </div>
        <div className="messenger-container">
          <div className="messenger-box">
            <div className="figure">
              <figure>
                <img src={prolific} />
              </figure>
            </div>
            <div className="name-message">
              <div className="upper-row">
                <h3>Julian Dasilva</h3>
                <span>Now</span>
              </div>
              <p>Hi Julian! See you after work?</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Messages;
