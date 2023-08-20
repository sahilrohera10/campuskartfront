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
import { AES } from "crypto-js";
import Slider from "react-slick";

// import ReactCardSlider from 'react-card-slider-component';

// import { Link } from 'react-router-dom'

const ProductsGrid = () => {
  const [category, setCategory] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const navigate = useNavigate();

  const [finalData, setFinalData] = useState([]);

  const [newlyadded, setnewlyadded] = useState([]);
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
  useLayoutEffect(() => {
    console.log("in fetcher");
    setIsLoading(true);
    try {
      fetch(`${configData.apiurl}/product/byFeature?newly_added=true`)
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setnewlyadded(resp.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const id = localStorage.getItem("id");
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
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };
  //   const slides = [
  //     {image:`${configData.apiurl}/uploads/${finalData.imageId}`,title:finalData.productName,
  //     clickEvent:"sliderClick"},

  // ]

  const key = "campuskart";
  const encryptIt = (id) => {
    const d = AES.encrypt(id, key).toString();
    const newd = encodeURIComponent(d);
    return newd;
  };

  return (
    <div
      className=" 2xl:container 2xl:mx-auto w-screen flex justify-center flex-column items-center "
      style={{ marginTop: "7rem", gap: "2rem", position: "relative" }}
    >
      <span style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
        Newly Added Products
      </span>
      <div
        id="scroller1"
        className=" py-6 lg:px-20 md:px-6 px-4 w-10/12  justify-center items-center flex-wrap"
      >
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            // flexDirection:"column",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* <ReactCardSlider slides={slides}/> */}

          {newlyadded &&
            newlyadded.map((data) => (
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/productReview/${encryptIt(data._id)}`}
              >
                <div>
                  <Card
                    id="card-product"
                    // className="shadow-lg m-2 p-3 "
                    style={{
                      width: "275px",
                      cursor: "pointer",
                      height: "55vh",
                      borderRadius: "1.5rem",
                      marginBottom: "50px",
                      display: "flex",
                      flexDirection: "column",
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
                        justifyContent: "space-around",
                        // marginTop: "1rem",
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
                </div>
              </Link>
            ))}
        </div>
        {/* </Slider> */}
      </div>
      <span style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
        Our Products
      </span>

      <div
        id="scroller"
        className=" py-6 lg:px-20 md:px-6 px-4 w-10/12  justify-center items-center flex-wrap"
      >
        <br />
        {/* <div className="loader">
          <DotLoader
            color="blue"
            size={40}
            speedMultiplier={1}
            loading={isLoading}
          />
        </div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // flexDirection:"column",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* <ReactCardSlider slides={slides}/> */}

          {finalData &&
            finalData.map((data) => (
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/productReview/${encryptIt(data._id)}`}
              >
                <div>
                  <Card
                    id="card-product"
                    // className="shadow-lg m-2 p-3 "
                    style={{
                      width: "275px",
                      cursor: "pointer",
                      height: "55vh",
                      borderRadius: "1.5rem",
                      marginBottom: "50px",
                      display: "flex",
                      flexDirection: "column",
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
                        justifyContent: "space-around",
                        // marginTop: "1rem",
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
                </div>
              </Link>
            ))}
        </div>
        {/* </Slider> */}
      </div>

    </div>
  );
};

export default ProductsGrid;
