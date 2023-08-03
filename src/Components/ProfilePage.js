import React, { useEffect,useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import configData from "../config.json";
import "./Profile.css";
import { Link } from "react-router-dom";
import MyProducts from "./MyProducts";

export default function ProfilePage() {
  // const name = localStorage.getItem("name");
  // const email = localStorage.getItem("email");
  // const college = localStorage.getItem("collegeName");
  const navigate = useNavigate();
  const [userDetails,setUserDetails] = useState();
  const id = localStorage.getItem("id");
  // console.log(id)
  useEffect(() => {
    console.log(id)
    
    try{
      fetch(`${configData.apiurl}/get/user/${id}`)
      .then((resp) => resp.json())
      .then((resp)=> {
        // console.log(resp.data.email)
        console.log("data=>",resp.data);
        setUserDetails(resp.data);
      })

    }
    catch(err){
      console.error(err);
    }
    
  },[])
  const handleDelete = async () => {
    const id = localStorage.getItem("id");
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const resp = await fetch(
        `${configData.apiurl}/DeleteAccount/${id}`,
        requestOptions
      );

      if (resp.ok) {
        // alert("product removed from wishlist");
        window.location.reload();
        localStorage.clear();
        navigate("/");
      } else {
        alert("error");
        console.log("error");
      }
    } catch (error) {
      alert("error");
      console.log("error=>", error);
    }
  };

  const handleUpdate = async () => {
    const id = localStorage.getItem("id");
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const resp = await fetch(
        `${configData.apiurl}/profile/update`,
        requestOptions
      );

      if (resp.ok) {
        // alert("product removed from wishlist");
        window.location.reload();
        localStorage.clear();
        navigate("/");
      } else {
        alert("error");
        console.log("error");
      }
    } catch (error) {
      alert("error");
      console.log("error=>", error);
    }
  };

  return (
    <>
    {userDetails && <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src = {`${userDetails.profileImage}`} />
          <Button variant="contained" onClick={handleUpdate}>Edit Profile</Button>

        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{userDetails.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{userDetails.email}</p>
          </div>
          <div>
            <h4>College</h4>

          </div>
          <div>
            
            <br />  
            
            <Button variant="contained" onClick={handleDelete}>Delete My Account</Button>
          </div>

        </div>
      </div>}
      
      <MyProducts/>

    </> 
  );
}
