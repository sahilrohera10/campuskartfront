import { React, useState } from "react";
import "./LoginModal.css";
import { useNavigate } from "react-router-dom";

import {
  GoogleOAuthProvider,
  useGoogleLogin,
  GoogleLogin,
} from "@react-oauth/google";

const userinfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
const LoginModanewl = () => {
  // const [accesstoken , setAccessToken] = useState("");

  const navigate = useNavigate();
  const fetchUserData = (accesstoken) => {
    fetch(userinfoEndpoint, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      // console.log(tokenResponse.access_token);
      navigate("/");
      localStorage.setItem("access", JSON.stringify(tokenResponse));
      localStorage.setItem("isAuthenticated", "true");
      if (tokenResponse.access_token) {
        fetchUserData(tokenResponse.access_token);
      }
    },
    onError() {
      alert("Something went wrong!");
    },
  });
  return (
    <div className="Login_modal">
      {/* <span className='modal_head'>Sign in with&nbsp;<img style={{height:"53px",width:"135px"}} src={googlelogo} alt="" /></span> */}
      <div className="link2">
        <button className="m-button" onClick={login}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LoginModanewl;
