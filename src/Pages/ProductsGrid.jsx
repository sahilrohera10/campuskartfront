import React, { useEffect, useLayoutEffect, useState } from "react";
import "./ProductGrid.css";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import { DotLoader } from "react-spinners";
import configData from "../config.json";
import { Link } from "react-router-dom";
import { AES } from "crypto-js";

// import { Link } from 'react-router-dom'

const ProductsGrid = () => {
  const [category, setCategory] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const key = "campuskart";
  const encryptIt = (id) => {
    const d = AES.encrypt(id, key).toString();
    const newd = encodeURIComponent(d);
    return newd;
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
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/productReview/${encryptIt(data._id)}`}
              >
                <Card
                  id="card-product"
                  style={{
                    width: "350px",
                    cursor: "pointer",
                    height: "65vh",
                    borderRadius: "1.5rem",
                    marginBottom: "100px",
                    display: "flex",
                    flexDirection: "column",
                  }}
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
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
