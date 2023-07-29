import React, { useState, useContext } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import ls from "localstorage-slim";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import configData from "../config.json";
import { GoogleOAuthProvider ,GoogleLogin  , } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
const GOOGLE_CLIENT_ID = "316588223894-26oq94mt63nn6c6jmv5b1ehe7kj90bu9.apps.googleusercontent.com";

// import { MyContext } from "../../UserContext";

export default function LoginRegister() {

  const navigate = useNavigate();
  const responseGoogle = (credentialResponse) => {
      var decode = jwt_decode(credentialResponse.credential);
      localStorage.setItem("Login Token",decode.jti);
      if(credentialResponse.credential){
        localStorage.setItem("isAuthenticated", true);
        navigate("/");
      }
      console.log(decode);
  };
  const googleResponseError = ()=>{
    console.log("Login Failed");
  }
  
  const mail = localStorage.getItem("loginMail");
  console.log("mailId =>", mail);
  const pass = localStorage.getItem("loginPassword");
  let msg;
  const [loginRes, setRes] = useState("");
  const [loginMsg, setLoginMsg] = useState();

  const [disabled, setDisabled] = useState(false);

  // const container = document.getElementById('container')

  const openSignUp = (e) => {
    const container = document.getElementById("container");
    console.log(container);
    console.log("in Register");
    e.preventDefault();
    container.classList.add("right-panel-active");
  };

  const openSignIn = (e) => {
    const container = document.getElementById("container");
    console.log("in Login");
    e.preventDefault();
    container.classList.remove("right-panel-active");
  };
  const [registerMail, setRegisterMail] = useState();
  const [name, setName] = useState();
  const [otp, setOtp] = useState();
  // const [passwordSet, setPasswordSet] = useState();
  const [collegeName, setCollegeName] = useState();
  const [email, setEmail] = useState(mail);
  // const [password, setPassword] = useState(pass);

  const [values, setValues] = React.useState({
    passwordSet: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  // const handlePassword = (event) => {
  //   setPassword(event.target.value);
  // };

  const handleResgisterMail = (event) => {
    setRegisterMail(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleOtp = (event) => {
    setOtp(event.target.value);
  };

  const handlePasswordSet = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCollegeName = (event) => {
    setCollegeName(event.target.value);
  };

  const handleOtpSend = async (event) => {
    event.preventDefault();
    const body = {
      Email: registerMail,
      // Name: values.Name,
      // EmailId: values.EmailId,
      // Password: values.Password,
      // YearOfPassing: values.YearOfPassing,
    };

    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const rep1 = await fetch(`${configData.apiurl}/sendmail`, requestOptions);
      if (rep1.ok) {
        alert("Otp Send");
      } else {
        alert("Error !! Some Error Occured");
      }
    } catch (err) {
      console.log("Err ", err);
      alert("Error !! Some Error Occured");
    }
  };

  const handleRegister = async (event) => {
    setDisabled(true);
    event.preventDefault();
    const body = {
      Email: registerMail,
      Name: name,
      Password: values.passwordSet,
      otp: parseInt(otp),
      collegeName: collegeName,
    };

    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const rep1 = await fetch(`${configData.apiurl}/Register`, requestOptions);
      if (rep1.status === 300) {
        alert("already registered");
        setDisabled(false);
      }
      if (rep1.status === 200) {
        alert("registered successfully");
        setDisabled(false);
      }
      if (rep1.status === 303) {
        alert("invalid otp");
        setDisabled(false);
      }
    } catch (err) {
      console.log("Err ", err);
      alert("Error !! Some Error Occured");
    }
  };

  const [userData, setUserData] = useState();

  const handleSubmiting = async (event) => {
    
    event.preventDefault();
    const body = {
      Email: email,
      Password: values.password,
    };

    localStorage.setItem("loginMail", email);
    localStorage.setItem("loginPassword", values.password);

    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
  
    try {
      
      const rep1 = await fetch(`${configData.apiurl}/Login`, requestOptions);
      rep1.json().then((data) => {
        console.log("data =>", data.pass);

        //  .then({
        // const data =  await fetch(`http://localhost:3790/get/user/${email}`)
        //  })
        setUserData(data.pass);

        if (rep1.status === 400) {
          alert("please provide email and password");
        }
        if (rep1.status === 401) {
          console.log("in alert");
          alert("No user exist with this email");
        }
        if (rep1.status === 402) {
          alert("password Incorect");
        }
        if (rep1.status === 200) {
          // alert("Login Success");
          localStorage.setItem("id", data.pass._id);
          localStorage.setItem("name", data.pass.name);
          localStorage.setItem("email", data.pass.email);
          localStorage.setItem("collegeName", data.pass.collegeName);
          localStorage.setItem("isAuthenticated", true);
          navigate("/");
          // console.log(data);
          console.log("userData =>", userData);
        }
      });
    } catch (err) {
      console.log("Err ", err);
      alert("Error !! Some Error Occured");
    }
  };

  return (
    <div className="login">
      {/* <h2>Welcome To ATS! </h2> */}
      <div className="contained" id="container">
        <div
          style={{ background: "white" }}
          className="form-container sign-up-container"
        >
          <form onSubmit={handleOtpSend}>
            <div className="otpForm">
              <input
                className="mailInput"
                // style={{ width: "200px" }}
                type="email"
                placeholder="Email"
                value={registerMail}
                onChange={handleResgisterMail}
              />
              <Button
                style={{
                  width: "84px",
                  padding: "5px 5px 5px 5px",
                  height: "45px",
                  marginTop: "0px",
                  background: "#7ED957",
                  color: "black",
                }}
                type="submit"
              >
                {" "}
                <p style={{ marginBottom: "1px" }}> Send Otp</p>
              </Button>
            </div>
          </form>
          <br />
          <form
            onSubmit={handleRegister}
            style={{ height: "65%" }}
            className="loginform"
          >
            {/* Registeration */}
            <br />
            {/* <span>or use your email for registration</span> */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleName}
            />
            <br />
            <input
              // style={{ width: "200px" }}
              type="integer"
              placeholder="Enter Otp"
              value={otp}
              onChange={handleOtp}
            />
            <br />
            <FormControl className="password" variant="filled">
              <InputLabel htmlFor="standard-adornment-password">
                Set Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.passwordSet}
                onChange={handlePasswordSet("passwordSet")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* <input
              type="password"
              placeholder="Password"
              value={passwordSet}
              onChange={handlePasswordSet}
            /> */}
            <br />
            <FormControl className="collegeDrop">
              <InputLabel id="demo-simple-select-label">College</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={collegeName}
                label="College"
                onChange={handleCollegeName}
              >
                <MenuItem value={"MAIT"}>MAIT</MenuItem>
              </Select>
            </FormControl>

            <br />
            <button
              type="submit"
              disabled={disabled}
              style={{
                background: "#7ED957",
                padding: "10px",
                color: "black",
                borderRadius: "10px",
              }}
            >
              Register
            </button>
          </form>
        </div>

        {/* Login */}

        <div className="form-container sign-in-container">
          {loginRes === false ? (
            //   <Alert sx={{width:"25vw"}} >Success  — {loginRes}!</Alert>:""
            <Alert severity="error" sx={{ width: "25vw" }}>
              {loginMsg}!
            </Alert>
          ) : (
            ""
          )}
          {loginRes === true ? (
            <Alert sx={{ width: "25vw" }}>Success — {loginRes}!</Alert>
          ) : (
            ""
          )}
          <form onSubmit={handleSubmiting} className="loginform" action="#">
            <h1>Login</h1>

            <br />

            <input
              type="email"
              placeholder="Email"
              value={email}
              // defaultValue={mail}
              onChange={handleEmail}
            />
            <br />

            <FormControl className="password" variant="filled">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handlePasswordSet("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <a href="#" style={{ color: "black" }}>
              Forgot your password?
            </a>

            <br />
            <button
              style={{
                background: "#7ED957",
                padding: "10px",
                borderRadius: "10px",
              }}
              type="submit"
            >
              Login
            </button>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <GoogleLogin
      onSuccess={responseGoogle} 
      onError={googleResponseError}
/>
      </GoogleOAuthProvider>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>

              <button
                style={{
                  border: "2px solid black",
                  padding: "6px",
                  borderRadius: "10px",
                  color: "black",
                }}
                className="ghost"
                id="signIn"
                onClick={openSignIn}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <button
                style={{
                  color: "black",
                  border: "2px solid black",
                  padding: "5px",
                  borderRadius: "10px",
                }}
                className="ghost"
                id="signUp"
                onClick={openSignUp}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
