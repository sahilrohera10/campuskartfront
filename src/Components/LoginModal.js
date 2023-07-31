import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoginRegister from "./LoginRegister";
import { BiRightArrow } from "react-icons/bi";
import LoginModanewl from "./LoginModal/LoginModanewl";
import google from '.././Images/google.png'
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider , useGoogleLogin ,GoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import configData from '../config.json';
export default function LoginModal() {
  const navigate = useNavigate();
  const handleRegistration =async(data)=>{
    const body ={
      Email:data.email,
      Name:data.name,
      ProfileImage:data.picture
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      const rep1 = await fetch(`${configData.apiurl}/Register`, requestOptions);
      const responseJson = await rep1.json();
      if (rep1.status === 409) {
        localStorage.setItem("User Id" , responseJson.id);
    
      }
      if (rep1.status === 200) {
        localStorage.setItem("User Id" , responseJson.id);
      }
    } catch (err) {
      console.log("Err ", err);
      alert("Error !! Some Error Occured");
    }
  }
  const fetchUserData =(accesstoken)=>{
    fetch(configData.userinfoEndpoint, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleRegistration(data);

      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }
  const login = useGoogleLogin({
    onSuccess: tokenResponse =>{
      console.log(tokenResponse);
      navigate("/");
      localStorage.setItem("access", JSON.stringify(tokenResponse));
      localStorage.setItem("isAuthenticated","true");
      if(tokenResponse.access_token){
        fetchUserData(tokenResponse.access_token);
      }
    },
    onError(){
      alert('Something went wrong!');
    }
  });

  return (
    <div>
      <button onClick={login} style={{backgroundColor:"white", border:"1px solid black" ,width:"170px", marginRight: "20px", color: "black" , justifyContent:"space-evenly" ,alignItems:"center" , display:"flex" ,height:"60px"}}>
      <img src={google} alt="" style={{height:"50px" , width:"63px"}} />  <p style={{alignSelf:"end"}}>Sign In</p> 
      </button>

    </div>
  );
}
