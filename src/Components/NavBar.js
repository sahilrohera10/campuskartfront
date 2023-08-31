import React, { useState, useEffect } from "react";
import configData from "../config.json";
// import logo from "../CampusLogo.png";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { BsFillTelephoneFill } from "react-icons/bs";
import Avatar from "@mui/material/Avatar";
import LoginModal from "./LoginModal";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import "./Navbar.css";

export default function NavBar() {
  const auth = localStorage.getItem("isAuthenticated");
  const b = "book";
  const s = "stationery";
  const f = "furniture";
  const e = "electronics";
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuSm, setShowMenuSm] = useState(false);
  const [search, setSearch] = useState(false);
  const [profileImage, setprofileImage] = useState();
  const LogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const id = localStorage.getItem("id");
  useEffect(() => {
    if (localStorage.getItem("profileImage")) {
      setprofileImage(localStorage.getItem("profileImage"));
    } else {
      try {
        fetch(`${configData.apiurl}/get/user/${id}`)
          .then((resp) => resp.json())
          .then((resp) => {
            setprofileImage(resp.data.profileImage);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <div
      style={{
        top: 0,
        position: "fixed",
        zIndex: "1500",
        backgroundColor: "white",
        width: "100vw",
        height: "90px",
      }}
      className="dark:bg-gray-900"
    >
      <div className="2xl:container 2xl:mx-auto md:py-5 lg:px-20 md:px-6 p-4  navsizing">
        <div className="flex items-center justify-between">
          <div className="lg:w-3/12">
            <button
              onClick={() => setShowMenu(true)}
              aria-label="Open Menu"
              className="text-gray-800 dark:text-white hidden md:block lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-800 rounded menuBtn"
            >
              <svg
                className="fill-stroke"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                color="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 18L4 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 12L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 6L4 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="lg:w-6/12 flex flex-row items-center space-y-3.5 logoDiv">
            {/* image of campus kart div  */}
            <Link to="/">
              <div
                aria-label="Luxiwood. Logo"
                role="img"
                className="cursor-pointer"
              >
                <img
                  style={{ width: "190px" }}
                  src="Campus Kart Logo.png"
                  alt=""
                />
              </div>
            </Link>
            <div
              style={{
                // marginLeft: "300px",
                width: "1760px",
                marginRight: "-750px",
                // height: "100px",
                fontFamily: "cursive",
              }}
              className="hidden lg:block"
            >
              <ul
                style={{ width: "550px" }}
                className="flex items-center space-x-10"
              >
                <li className="navitem">
                  <Link
                    to=""
                    style={{ textDecoration: "none" }}
                    className="dark:text-white dark:hover:text-gray-300 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    <p style={{ fontSize: "20px", marginBottom: "0px" }}>
                      Home
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`${b}`}
                    style={{ textDecoration: "none" }}
                    className="dark:text-white dark:hover:text-gray-300 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    <p style={{ fontSize: "20px", marginBottom: "0px" }}>
                      Books
                    </p>
                  </Link>
                </li>

                <li>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`${s}`}
                    className="dark:text-white dark:hover:text-gray-300 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    <p style={{ fontSize: "20px", marginBottom: "0px" }}>
                      {" "}
                      {/* Become a Seller{" "} */}
                      Stationery
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`${e}`}
                    className="dark:text-white dark:hover:text-gray-300 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    <p style={{ fontSize: "20px", marginBottom: "0px" }}>
                      {" "}
                      Electronics
                    </p>
                  </Link>
                </li>

                <li>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`${f}`}
                    className="dark:text-white dark:hover:text-gray-300 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    <p style={{ fontSize: "20px", marginBottom: "0px" }}>
                      {" "}
                      Furniture
                    </p>
                  </Link>
                </li>
                <Link
                  style={{ textDecoration: "none" }}
                  to="addProduct"
                  className="dark:text-white dark:hover:text-gray-300 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  <button
                    style={{
                      width: "80px",
                      color: "black",
                      // borderImage:
                      //   "linear-gradient(to right, green, lightgreen)",
                      borderRadius: "20px",
                      borderLeft: "5px solid green",
                      borderTop: "5px solid #FBCC06",
                      borderRight: "5px solid green",
                      borderBottom: "5px solid #FBCC06",

                      backgroundColor: "white",
                    }}
                  >
                    SELL
                  </button>
                </Link>
              </ul>
            </div>
          </div>
          {auth ? (
            <div className="logedin">
              <Link
                style={{ textDecoration: "none" }}
                to="wishlist"
                aria-label="view favourites"
                className="hidden md:block focus:outline-none text-gray-800 dark:text-white focus:ring-2 focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5 wishlist"
                href="javascript:void(0)"
              >
                <svg
                  className="fill-stroke"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  color="red"
                  backgroundColor="red"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: "red" }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="chat/:myid" style={{ color: "black" }}>
                <div>
                  <ChatOutlinedIcon
                    size="25"
                    style={{ marginRight: "15px", marginTop: "5px" }}
                  />
                </div>
              </Link>
              <Link to="contactUs" style={{ color: "black" }}>
                <div>
                  <BsFillTelephoneFill
                    size="20"
                    style={{ marginRight: "15px", marginTop: "5px" }}
                  />
                </div>
              </Link>
              <div>
                <div className="dropdown">
                  <button className="dropbtn">
                    {/* <CgProfile
                      color="black"
                      size={25}
                      style={{
                        marginRight: "25px",
                        marginTop: "1px",
                        cursor: "pointer",
                      }}
                    /> */}
                    <Avatar
                      sx={{ width: 30, height: 30 }}
                      style={{
                        marginRight: "25px",
                        cursor: "pointer",
                      }}
                      alt="Remy Sharp"
                      src={profileImage}
                    />
                  </button>
                  <div
                    style={{ minWidth: "100px", right: "0" }}
                    className="dropdown-content"
                  >
                    <Link to="profilePage">Profile</Link>
                    <Link to="myProducts">My Products</Link>

                    <p
                      style={{ marginLeft: "17px", cursor: "pointer" }}
                      onClick={LogOut}
                    >
                      Log Out
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="loginModalDiv">
              <LoginModal />
            </div>
          )}
        </div>
        <div id="md-menu" className={`${showMenu ? "md:block" : "hide"} "" `}>
          <div
            style={{
              height: "270px",
              width: "200px",
              background: "white",
              paddingLeft: "10px",
            }}
          >
            <button
              style={{ marginLeft: "150px" }}
              onClick={() => setShowMenu(false)}
              aria-label="close menu"
              className="focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <svg
                className="fill-stroke text-gray-800 dark:text-white"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 4L12 12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <Link to={""} style={{ textDecoration: "none", color: "black" }}>
              {" "}
              <p>Home</p>{" "}
            </Link>
            <Link
              to="addProduct"
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>Sell</p>
            </Link>
            <Link
              to={`${b}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>Books</p>
            </Link>
            <Link
              to={`${e}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>Electronics</p>
            </Link>

            <Link
              to={`${s}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>Stationery</p>
            </Link>

            <Link
              to={`${f}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>Furniture</p>
            </Link>
            {auth ? (
              <Link
                to="wishlist"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>wishlist</p>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* Search menu */}
        <div
          id="mobile-search-menu"
          className={`${
            search ? "flex" : "hidden"
          } md:hidden absolute inset-0 z-10 flex-col w-full h-screen bg-white dark:bg-gray-900 pt-4`}
        >
          <div className="w-full">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mx-4">
              <div className="flex items-center space-x-3 mx-2">
                <div>
                  <svg
                    className="fill-stroke text-gray-800 dark:text-white"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.9984 19.0004L14.6484 14.6504"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for products"
                  className="text-sm text-gray-600 focus:outline-none bg-transparent"
                />
              </div>
              <button
                aria-label="close menu"
                onClick={() => setSearch(false)}
                className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <svg
                  className="fill-stroke"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 5L15 15"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full h-full flex items-end">
            <ul className="bg-gray-50 dark:bg-gray-800 py-10 px-4 flex flex-col space-y-8 w-full">
              <li>
                <a
                  className="flex items-center space-x-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  href="javascript:void(0)"
                >
                  <div>
                    <svg
                      className="fill-stroke"
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.33333 1L1 5V19C1 19.5304 1.23413 20.0391 1.65087 20.4142C2.06762 20.7893 2.63285 21 3.22222 21H18.7778C19.3671 21 19.9324 20.7893 20.3491 20.4142C20.7659 20.0391 21 19.5304 21 19V5L17.6667 1H4.33333Z"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 5H21"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.4436 9C15.4436 10.0609 14.9753 11.0783 14.1418 11.8284C13.3083 12.5786 12.1779 13 10.9991 13C9.82039 13 8.68993 12.5786 7.85643 11.8284C7.02294 11.0783 6.55469 10.0609 6.55469 9"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base">Cart</p>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center space-x-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  href="javascript:void(0)"
                >
                  <div>
                    <svg
                      className="fill-stroke"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base">Wishlist</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Main Menu */}
        <div
          id="mobile-menu"
          className={`${
            showMenuSm ? "flex" : "hidden"
          } md:hidden absolute inset-0 z-10 flex-col w-full h-screen bg-white pt-4`}
        >
          <div className="w-full">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mx-4">
              <div />
              <div>
                <p className="text-base font-semibold text-gray-800">Menu</p>
              </div>
              <button
                aria-label="close menu"
                onClick={() => setShowMenuSm(false)}
                className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <svg
                  className="fill-stroke"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 5L15 15"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-6 mx-4">
            <ul className="flex flex-col space-y-8">
              <li className="flex items-center justify-between">
                <a
                  href="javascript:void(0)"
                  className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  Home
                </a>
                <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                  <svg
                    className="fill-stroke"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6L8 10L4 6"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
              <li className="flex items-center justify-between">
                <a
                  href="javascript:void(0)"
                  className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  Catalog
                </a>
                <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                  <svg
                    className="fill-stroke"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6L8 10L4 6"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
              <li className="flex items-center justify-between">
                <a
                  href="javascript:void(0)"
                  className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  Pages
                </a>
                <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                  <svg
                    className="fill-stroke"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6L8 10L4 6"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
              <li className="flex items-center justify-between">
                <a
                  href="javascript:void(0)"
                  className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  Blog
                </a>
                <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                  <svg
                    className="fill-stroke"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6L8 10L4 6"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
              <li className="flex items-center justify-between">
                <a
                  href="javascript:void(0)"
                  className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                >
                  Contact us
                </a>
                <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                  <svg
                    className="fill-stroke"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6L8 10L4 6"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
          <div className="w-full h-full flex items-end">
            <ul className="bg-gray-50 dark:bg-gray-800 py-10 px-4 flex flex-col space-y-8 w-full">
              <li>
                <a
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  href="javascript:void(0)"
                >
                  <div>
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.33333 1L1 5V19C1 19.5304 1.23413 20.0391 1.65087 20.4142C2.06762 20.7893 2.63285 21 3.22222 21H18.7778C19.3671 21 19.9324 20.7893 20.3491 20.4142C20.7659 20.0391 21 19.5304 21 19V5L17.6667 1H4.33333Z"
                        stroke="#1F2937"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 5H21"
                        stroke="#1F2937"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.4436 9C15.4436 10.0609 14.9753 11.0783 14.1418 11.8284C13.3083 12.5786 12.1779 13 10.9991 13C9.82039 13 8.68993 12.5786 7.85643 11.8284C7.02294 11.0783 6.55469 10.0609 6.55469 9"
                        stroke="#1F2937"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base text-gray-800">Cart</p>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                  href="javascript:void(0)"
                >
                  <div>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z"
                        stroke="#1F2937"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base text-gray-800">Wishlist</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
