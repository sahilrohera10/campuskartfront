import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import Conversation from "../Conversation/Conversation.js";
import ChatBox from "../ChatBox/ChatBox.js";
import { io } from "socket.io-client";
import configData from "../../../config.json";
// import Login from "../Login/Login";

export default function Chat() {
  const presentUser = localStorage.getItem("id");
  const socket = useRef();

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  // get the chats of a user in the chat section
  useEffect(() => {
    fetch(`${configData.apiurl}/chat/${presentUser}`)
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(resp);
        setChats(resp.data);
      });
  }, [presentUser]);

  //connect to socket.io
  useEffect(() => {
    socket.current = io("https://campus-kart-sockets.onrender.com", {
      transports: ["websocket"],
    });
    socket.current.emit("new-user-add", presentUser);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [presentUser]);

  // sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceiveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== presentUser);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {presentUser ? (
        <>
          {/* Left Side */}
          <div className="Left-side-chat">
            <div className="Chat-container">
              <h2>Chats</h2>

              <div className="Chat-list">
                {/* {console.log(chats)} */}
                {chats &&
                  chats.map((d) => (
                    <div onClick={() => setCurrentChat(d)}>
                      {/* {d._id} */}
                      <Conversation
                        data={d}
                        currentUserId={presentUser}
                        online={checkOnlineStatus(d)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="right-side-chat">
            <ChatBox
              chat={currentChat}
              currentUser={presentUser}
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
