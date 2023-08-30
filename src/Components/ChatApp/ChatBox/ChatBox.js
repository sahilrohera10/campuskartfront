import React, { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";
import configData from "../../../config.json";

export default function ChatBox({
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
}) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  //fetch data for header
  useEffect(() => {
    const userId = chat?.members.find((id) => id !== currentUser);
    const getuserData = async () => {
      try {
        fetch(`${configData.apiurl}/get/user/${userId}`)
          .then((resp) => resp.json())
          .then((resp) => {
            setUserData(resp.data);
          });
      } catch (error) {
        console.log("error=>", error);
      }
    };

    if (chat !== null) getuserData();
  }, [chat, currentUser]);

  // get messages
  useEffect(() => {
    const getmessages = async () => {
      try {
        await fetch(`${configData.apiurl}/message/${chat._id}`)
          .then((resp) => resp.json())
          .then((resp) => {
            setMessages(resp.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getmessages();
  }, [chat, receiveMessage]);

  // Send message
  const handleSend = async (e) => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    };

    // send message to the socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...messages, receiverId });

    try {
      const data = await fetch(`${configData.apiurl}/message`, requestOptions);
      setMessages([...messages, data]);
      await fetch(`${configData.apiurl}/message/${chat._id}`)
        .then((resp) => resp.json())
        .then((resp) => {
          setMessages(resp.data);
          console.log(resp);
        });

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Message Arrived :", receiveMessage);
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  //scroll to last msg
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  {/* <div className="online-dot"> </div> */}
                  <img
                    src={
                      userData?.profileImage
                        ? userData.profileImage
                        : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                    }
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                  />
                </div>
                <div className="name" style={{ fontSize: "0.7rem" }}>
                  {" "}
                  <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                    {" "}
                    {userData?.name}{" "}
                  </span>{" "}
                  <br />
                  {/* <span>Online</span>{" "} */}
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>

            {/* Chatbox messages */}

            <div className="chat-body">
              {messages &&
                messages.map((m) => (
                  <>
                    <div
                      ref={scroll}
                      className={
                        m.senderId === currentUser ? "message own" : "message"
                      }
                    >
                      <span>{m.text}</span>
                      <span> {format(m.createdAt)} </span>
                    </div>
                  </>
                ))}
            </div>
            {/* Chat-sender */}

            <div className="chat-sender">
              <div>+</div>
              {/* <InputEmoji
                value={newMessage}
                onChange={setNewMessage}
                cleanOnEnter="true"
                onEnter={() => handleSend()}
              /> */}
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                cleanOnEnter="true"
                onEnter={() => handleSend()}
              />
              <div
                className="send-button button"
                onClick={(e) => handleSend(e)}
              >
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            {" "}
            Tap on a Chat to start a conversation...{" "}
          </span>
        )}
      </div>
    </>
  );
}
