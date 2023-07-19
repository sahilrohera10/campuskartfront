import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import EditProduct from "./EditProduct";
import { MdDelete } from "react-icons/md";
import { DotLoader } from "react-spinners";
import configData from "../config.json";

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
                    {/* </Link> */}
                  </Card.Body>
                </Card>
                <EditProduct data={data} />
                <MdDelete
                  onClick={() => handleDelete(data._id)}
                  size={20}
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    // color: "red",
                    marginTop: "-46px",
                    marginLeft: "250px",
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
