import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { AES } from "crypto-js";

const ProductsGrid = () => {
  const key = "campuskart";
  const encryptIt = (id) => {
    const d = AES.encrypt(id, key).toString();
    const newd = encodeURIComponent(d);
    return newd;
  };
  const [category, setCategory] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let college = localStorage.getItem("collegeName");
  if (!college) {
    college = "MAIT";
  }

  const { Category } = useParams();
  console.log("category is =>", Category);

  const navigate = useNavigate();

  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    // window.location.reload();
    window.scrollTo(0, 0);
    setIsLoading(true);
    fetch(`${configData.apiurl}/product/get/${Category}/${college}`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("data=>", resp);
        setFinalData(resp.data);
        setIsLoading(false);
      });
  }, [Category, college]);

  const id = localStorage.getItem("id");
  const auth = localStorage.getItem("isAuthenticated");
  const handleAdd = async (addData) => {
    const body = {
      customerId: id,
      productId: addData._id,
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
    <div className=" 2xl:container 2xl:mx-auto">
      <div className=" py-6 lg:px-20 md:px-6 px-4">
        <div className=" flex justify-between items-center"></div>

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
            justifyContent: "center",
            // flexDirection:"column",
            flexWrap: "wrap",
            gap: "2rem",
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
      </div>
    </div>
  );
};

export default ProductsGrid;
