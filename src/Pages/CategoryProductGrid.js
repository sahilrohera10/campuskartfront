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

const ProductsGrid = () => {
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
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {finalData &&
            finalData.map((data) => (
              <div>
                <Card
                  className="shadow-lg m-2 p-3 rounded"
                  style={{ width: "18rem", cursor: "pointer", height: "auto" }}
                  onClick={() =>
                    navigate("/productReview", {
                      state: {
                        data: {
                          imgId: data.imageId,
                          productName: data.productName,
                          price: data.price,
                          description: data.description,
                          contactNumber: data.contactNumber,
                        },
                      },
                    })
                  }
                >
                  <Card.Img
                    style={{ height: "250px", objectFit: "contain" }}
                    variant="top"
                    src={`${configData.apiurl}/uploads/${data.imageId}`}
                  />
                  <Card.Body>
                    <Card.Title>Title: {data.productName}</Card.Title>
                    <Card.Title>Price: Rs{data.price}</Card.Title>
                    <Card.Text>
                      Description: {data.description.slice(0, 10)}...
                    </Card.Text>

                    {/* <Link to={`product/${product.id}`}> */}
                    {/* <button>Detail</button> */}
                    {/* </Link> */}
                  </Card.Body>

                  <BsHeart
                    size={20}
                    style={{
                      position: "absolute",
                      zIndex: "100",
                      width: "20px",
                      height: "20px",
                      top: "90%",
                      left: "89%",
                    }}
                    // style={{ marginLeft: "230px", marginTop: "230px" }}
                    onClick={() => {
                      handleAdd(data);
                    }}
                  />
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
