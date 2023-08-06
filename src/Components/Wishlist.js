import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import configData from "../config.json";
import { Link } from "react-router-dom";
import { AES } from "crypto-js";

export default function Wishlist() {
  const navigate = useNavigate();
  const key = "campuskart";
  const encryptIt = (id) => {
    const d = AES.encrypt(id, key).toString();
    const newd = encodeURIComponent(d);
    return newd;
  };
  const [finalData, setFinalData] = useState();

  useLayoutEffect(() => {
    console.log("in fetcher");
    const id = localStorage.getItem("id");
    try {
      fetch(`${configData.apiurl}/getProdfromWishlist/${id}`)
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFinalData(resp);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRemove = async (data) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const resp = await fetch(
        `${configData.apiurl}/deleteprodfromwishlist/${data.customerId}/${data.productId}`,
        requestOptions
      );

      if (resp.ok) {
        // alert("product removed from wishlist");
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
  if (finalData && finalData.length) {
    return (
      <div className=" py-12">
        <br />
        <br />
        <br />
        <br />
        {/* Desktop Responsive Start */}
        <div className="hidden sm:flex flex-col justify-start items-start">
          <div className="pl-4 lg:px-10 2xl:px-20 flex flex-row justify-center items-end space-x-4">
            <h1 className="text-4xl font-semibold leading-9 text-gray-800">
              Wishlist
            </h1>
            {/* <p className="text-base leading-4 text-gray-600 pb-1">(12 Items)</p> */}
          </div>
          <table className="w-full mt-16 whitespace-nowrap">
            <thead
              aria-label="table heading"
              className="w-full h-16 text-left py-6 bg-gray-50 border-gray-200 border-b "
            >
              <tr>
                <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-20 pl-4 lg:pl-10">
                  YOUR PRODUCT
                </th>
                <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                  Name
                </th>
                <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                  PRICE
                </th>
                <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                  MORE OPTIONS
                </th>
                <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-28 2xl:pr-20 pr-4 lg:pr-10" />
              </tr>
            </thead>
            {finalData &&
              finalData.map((data) => (
                <tbody className="w-full text-left">
                  <tr className="border-gray-200 border-b  ">
                    <th>
                      <img
                        className="my-10 pl-4 lg:pl-10 2xl:pl-20"
                        src={`${configData.apiurl}/uploads/${data.productList.imageId}`}
                        alt="shoe"
                      />
                    </th>
                    <th className="mt-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                      <p className=" text-base leading-4 text-gray-800">
                        {data.productList.productName}
                      </p>
                    </th>
                    <th className="my-10  pl-6 lg:pl-20 2xl:pl-52">
                      <p className>Rs {data.productList.price}</p>
                    </th>
                    <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                      <Link
                        style={{ color: "black", textDecoration: "none" }}
                        to={`/productReview/${encryptIt(data.productList._id)}`}
                      >
                        <button
                          href="javascript:void(0)"
                          className="hover:underline text-base font-medium leading-none  text-gray-800 focus:outline-none focus:underline"
                        >
                          View details
                        </button>
                      </Link>
                    </th>
                    <th className="my-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20">
                      <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-base leading-none text-red-600 hover:text-red-800"
                        onClick={() => {
                          handleRemove(data);
                        }}
                      >
                        <p>Remove Item</p>
                      </button>
                    </th>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
        {/* Desktop Responsive End */}
        {/* Mobile Responsive Start */}
        <div className=" flex justify-center items-center">
          <div className="sm:hidden flex flex-col justify-start items-start ">
            <div className="px-4 lg:px-10 2xl:px-20 flex flex-row justify-start items-end space-x-4">
              <p className="text-4xl font-semibold leading-9 text-gray-800">
                Wishlist
              </p>
              <p className="text-base leading-4 text-gray-600 pb-1">
                {/* (12 Items) */}
              </p>
            </div>
            <div className="border-gray-200 border-b pb-10">
              {finalData &&
                finalData.map((data) => (
                  <div>
                    <div className="px-4 flex flex-col jusitfy-center items-start mt-10">
                      <div>
                        <img
                          src={`${configData.apiurl}/uploads/${data.imgId}`}
                          alt="shoe"
                        />
                      </div>
                    </div>
                    <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                      <div>
                        <p className="w-36 text-base leading-6 text-gray-800">
                          {data.productName}
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-semibold leading-4 text-gray-800">
                          Rs {data.price}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 mt-6 flex justify-between w-full flex jusitfy-center items-center">
                      <div>
                        <a
                          href="javascript:void(0)"
                          className="hover:underline text-base font-medium leading-none focus:outline-none focus:underline  text-gray-800"
                          onClick={() =>
                            navigate("/productReview", {
                              state: {
                                data: {
                                  imgId: data.imgId,
                                  productName: data.productName,
                                  price: data.price,
                                  description: data.description,
                                  contactNumber: data.contactNumber,
                                },
                              },
                            })
                          }
                        >
                          View details
                        </a>
                      </div>
                      <div>
                        <button
                          className="focus:outline-none focus:ring-red-800 focus:ring-offset-2 focus:ring-2 text-base leading-none text-red-600 hover:text-red-800"
                          onClick={() => {
                            handleRemove(data);
                          }}
                        >
                          <p>Remove Item</p>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Mobile Responsive End */}
      </div>
    );
  } else {
    return (
      <div className="emptyWishlist">
        <h1>Your Wishlist Is empty</h1>
      </div>
    );
  }
}
