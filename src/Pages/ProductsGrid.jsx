import React, { useEffect, useLayoutEffect, useState } from "react";
import "./ProductGrid.css";
import { useParams } from "react-router";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import DropdownSelect from "../Components/DropdownSelect";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DotLoader } from "react-spinners";
import configData from "../config.json";
import { Link } from "react-router-dom";
import { Padding } from "@mui/icons-material";

// import { Link } from 'react-router-dom'

const ProductsGrid = () => {
  const [category, setCategory] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const navigate = useNavigate();

  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const college = localStorage.getItem("collegeName");

  useLayoutEffect(() => {
    console.log("in fetcher");
    setIsLoading(true);
    try {
      fetch(`${configData.apiurl}/product/get`)
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
  const id = localStorage.getItem("id");
  // console.log("id=>", id);
  const auth = localStorage.getItem("isAuthenticated");
  const handleAdd = async (addData) => {
    const body = {
      customerId: id,
      productId: addData._id,
      productName: addData.productName,
      description: addData.description,
      price: addData.price,
      imgId: addData.imageId,
      category: addData.category,
      contactNumber: addData.contactNumber,
    };
    console.log("data=> ", body);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    if (auth) {
      try {
        const resp = await fetch(
          `${configData.apiurl}/addprodinWishlist`,
          requestOptions
        );
        // .then((resp) => {
        if (resp.status === 200) {
          alert("added to wishlist");
        }
        if (resp.status === 300) {
          alert("already added to wishlist");
        }

        // });
      } catch (error) {
        console.log("error=>", error);
        alert("error is occurred");
      }
    } else {
      alert("login first to add this in wishlist");
    }
  };

  return (
    <div className=" 2xl:container 2xl:mx-auto w-screen flex justify-center items-center">
      <div className=" py-6 lg:px-20 md:px-6 px-4 w-10/12 flex justify-between items-center flex-wrap">
        <br />
        <div className="loader">
          <DotLoader
            color="blue"
            size={40}
            speedMultiplier={1}
            loading={isLoading}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {finalData &&
            finalData.map((data) => (
              <Card
                id="card-product"
                // className="shadow-lg m-2 p-3 "
                style={{
                  width: "350px",
                  cursor: "pointer",
                  height: "65vh",
                  borderRadius: "1.5rem",
                  marginBottom: "100px",
                  display: "flex",
                  flexDirection: "column",
                  // alignItems:"center",
                  // gap:"1.5rem",
                  // position:"relative"
                }}
                onClick={() => navigate(`/productReview/${data._id}`)}
              >
                <div className="main_page-card">
                  <Card.Img
                    className="product-card-img"
                    style={{
                      height: "37.5vh",
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
                    justifyContent: "space-around",
                    marginTop: "1rem",
                    height: "20vh",
                    width: "88%",
                  }}
                >
                  <Card.Title>{data.productName}</Card.Title>
                  <Card.Title>Rs.{data.price}</Card.Title>
                  <Card.Text>{data.description.slice(0, 40)}...</Card.Text>

                  {/* <Link to="">
                      <button className="product-card-main">Add to Cart</button>
                    </Link> */}
                </Card.Body>
                <BsHeart
                  size={30}
                  className="bsheat"
                  style={{
                    position: "relative",
                    zIndex: "1000",
                    width: "25px",
                    height: "25px",
                    top: "-90%",
                    right: "-88%",
                  }}
                  onClick={() => {
                    handleAdd(data);
                  }}
                />
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
