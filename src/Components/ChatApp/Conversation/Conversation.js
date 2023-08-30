import React, { useState, useEffect } from "react";
import "../Chat/Chat.css";
import configData from "../../../config.json";

export default function Conversation({ data, currentUserId, online }) {
  const [userData, setUserData] = useState(null);
  // console.log(data);

  useEffect(() => {
    const userId = data.members.find((id) => id != currentUserId);
    // console.log(userId);
    const getuserData = async () => {
      try {
        fetch(`${configData.apiurl}/get/user/${userId}`)
          .then((resp) => resp.json())
          .then((resp) => {
            console.log(resp.data);
            setUserData(resp.data);
          });
      } catch (error) {
        console.log("error=>", error);
      }
    };
    getuserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"> </div>}
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
          <span> {online ? "Online" : "Offline"}</span>{" "}
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
}
