import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import EditProduct from "./EditProduct";
import { MdDelete } from "react-icons/md";
import { DotLoader } from "react-spinners";
import configData from "../config.json";
import { AES } from "crypto-js";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const label = { inputProps: { role: "switch" } };

// import { Link } from 'react-router-dom'

const MyProducts = () => {
  const navigate = useNavigate();

  const [finalData, setFinalData] = useState();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sellerId = localStorage.getItem("id");

  useLayoutEffect(() => {
    console.log("in fetcher");
    setIsLoading(true);
    try {
      fetch(`${configData.apiurl}/products/get/myProducts/${sellerId}`)
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFinalData(resp.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const resp = await fetch(
        `${configData.apiurl}/product/delete/${id}`,
        requestOptions
      );

      if (resp.status === 200) {
        window.location.reload();
      } else {
        alert("error");
        console.log("error");
      }
    } catch (error) {
      alert("error");
      console.log("error=>", error);
    }
  };
  const key = "campuskart";
  const encryptIt = (id) => {
    const d = AES.encrypt(id, key).toString();
    const newd = encodeURIComponent(d);
    return newd;
  };

  const [checked, setChecked] = React.useState(new Map());

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [curId, setCurId] = useState();
  const handleChange = (event, id) => {
    {
      if (event.target.checked == false) alert("Can't be change");
      else {
        setChecked(checked.set(id, event.target.checked));
        setCurId(id);
        console.log("checked=>", event.target.checked);
        handleClickOpen();
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const body = {
        productId: curId,
        SoldStatus: true,
      };

      console.log("body=>", body);

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      const resp = await fetch(
        `${configData.apiurl}/product/updatesoldStatus`,
        requestOptions
      );

      if (resp.ok) {
        // alert("product updated successfully");
        window.location.reload();
      } else {
        // alert("error");
        // console.log("error");
      }
    } catch (error) {
      // alert("error");
      console.log("error=>", error);
    }
  };

  return (
    <div className=" 2xl:container 2xl:mx-auto">
      <div className=" bg-gray-50 text-center lg:py-10 md:py-8 py-6">
        <p className=" w-10/12 mx-auto md:w-full  font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800"></p>
      </div>
      <div className=" py-6 lg:px-20 md:px-6 px-4">
        <p className=" font-normal text-sm leading-3 text-gray-600 ">
          Home / My uploaded products
        </p>
        <hr className=" w-full bg-gray-200 my-6" />

        <div className=" flex justify-between items-center">
          <div className=" flex space-x-3 justify-center items-center">
            <svg
              className=" cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 7.5H20.25"
                stroke="#1F2937"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M3.75 12H20.25"
                stroke="#1F2937"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M3.75 16.5H20.25"
                stroke="#1F2937"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            <p className=" font-normal text-base leading-4 text-gray-800">
              {/* Filter */}
            </p>
          </div>
          <p className=" cursor-pointer hover:underline duration-100 font-normal text-base leading-4 text-gray-600">
            {/* Showing 18 products */}
          </p>
        </div>

        <div className="loader">
          <DotLoader
            color="#5ee727"
            size={40}
            speedMultiplier={1}
            loading={isLoading}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "start",
            width: "90vw",
            flexWrap: "wrap",
            gap: "1rem",
            paddingLeft: "100px",
          }}
        >
          {finalData &&
            finalData.map((data) => (
              <div style={{ position: "relative" }}>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to={`/productReview/${encryptIt(data._id)}`}
                >
                  <Card
                    id="card-product"
                    // className="shadow-lg m-2 p-3 "
                    style={{
                      width: "275px",
                      cursor: "pointer",
                      height: "58vh",
                      borderRadius: "1.5rem",
                      marginBottom: "50px",
                      display: "flex",
                      flexDirection: "column",
                      margin: "20px",
                    }}
                  >
                    <div className="main_page-card">
                      <Card.Img
                        className="product-card-img"
                        style={{
                          height: "30vh",
                          width: "100%",
                          objectFit: "cover",
                        }}
                        variant="top"
                        src={`${configData.apiurl}/uploads/${data.imageId}`}
                      />
                      <Card.Img
                        className="product-card-img2"
                        style={{
                          height: "100%",
                          objectFit: "contain",
                          zIndex: "101",
                          position: "relative",
                        }}
                        variant="top"
                        src={`${configData.apiurl}/uploads/${data.imageId}`}
                      />
                    </div>
                    <Card.Body
                      className="product-card-body"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: "space-around",
                        // marginTop: "1rem",
                        gap: "1.5rem",
                        height: "20vh",
                        width: "100%",
                      }}
                    >
                      <Card.Title>{data.productName}</Card.Title>
                      <Card.Title>Rs.{data.price}</Card.Title>
                      <Card.Text>{data.description.slice(0, 40)}...</Card.Text>

                      {/* <Link to="">
                      <button className="product-card-main">Add to Cart</button>
                    </Link> */}
                    </Card.Body>
                  </Card>
                </Link>
                <EditProduct data={data} />
                <MdDelete
                  onClick={() => handleDelete(data._id)}
                  size={20}
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    // color: "red",
                    marginTop: "-54px",
                    marginLeft: "250px",
                  }}
                />
                {console.log("status=>", data.SoldStatus)}
                <Tooltip title="Mark as Sold" placement="top">
                  <Switch
                    sx={{
                      top: "5%",
                      position: "absolute",
                      left: "70%",
                      zIndex: "1000",
                    }}
                    checked={data.SoldStatus}
                    onChange={(event) => handleChange(event, data._id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Tooltip>
              </div>
            ))}
        </div>
      </div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Alert !!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are your sure, that you want to mark this product as sold ?? This
              action can't be revert back !!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              No
            </Button>
            <Button onClick={() => handleUpdate()} autoFocus>
              I'am Sure
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default MyProducts;
