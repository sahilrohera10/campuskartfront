import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import configData from "../config.json";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";

/* Install pure-react-carousel using -> npm i pure-react-carousel */

export default function ProductReview() {
  const location = useLocation();
  const { pid } = useParams();
  console.log("id=>", pid);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${configData.apiurl}/product/get?pid=${pid}`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("data=>", resp.data[0]);
        setData(resp.data[0]);
      });
  }, []);

  return (
    <>
      {data ? (
        <div style={{ paddingTop: "100px" }}>
          <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
            <div
              id="viewerButton"
              className="hidden w-full flex justify-center"
            >
              <button
                onclick="openView()"
                className="bg-white text-indigo-600 shadow-md rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 py-5 px-10 font-semibold"
              >
                Open Quick View
              </button>
            </div>
            <div id="viewerBox" className="lg:p-10 md:p-6 p-4 bg-white">
              <div className="flex justify-end"></div>
              <div className="mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-stretch justify-center lg:space-x-8">
                <CarouselProvider
                  naturalSlideWidth={100}
                  isIntrinsicHeight={true}
                  totalSlides={3}
                  className="lg:w-1/2 flex justify-between items-strech bg-gray-50 px-2 py-20 md:py-6 md:px-6 lg:py-24"
                >
                  <div className="flex items-center">
                    <ButtonBack
                      aria-label="slide back"
                      className="focus:outline-none focus:ring-2 focus:ring-gray-800 hover:bg-gray-100"
                      role="button"
                    >
                      <svg
                        className="w-10 h-10 lg:w-16 lg:h-16"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M40 16L24 32L40 48"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </ButtonBack>
                  </div>
                  {/* <div className="slider"> */}
                  {/* <div className="slide-ana lg:relative"> */}
                  {/* <Slider> */}
                  {/* <Slide index={0}> */}
                  <div className="flex">
                    <img
                      style={{ width: "200px" }}
                      src={`${configData.apiurl}/uploads/${data.imageId}`}
                      alt="A black chair with wooden legs"
                    />
                  </div>
                  {/* </Slide> */}
                  {/* </Slider> */}
                  {/* </div>
              </div> */}
                  <div className="flex items-center">
                    <ButtonNext
                      role="button"
                      aria-label="next slide"
                      className="cursor-pointer ml-2"
                    >
                      <svg
                        className="w-10 h-10 lg:w-16 lg:h-16"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24 16L40 32L24 48"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </ButtonNext>
                  </div>
                </CarouselProvider>
                <div className="lg:w-1/2 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0">
                  <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">
                    {data.productName}
                  </h1>
                  <p className="text-base leading-normal text-gray-600 mt-2">
                    {data.description}
                  </p>
                  <p className="text-3xl font-medium text-gray-600 mt-8 md:mt-10">
                    Rs {data.price}
                  </p>
                  {/* <div className="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-16">
                <h5>Contact : {contact} </h5>
              </div> */}
                  <div className="mt-6">
                    <button className="text-xl underline text-gray-800 capitalize hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                      add to wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style>{`
                .slider {
                    width: 200px;
                    height: 400px;
                    position: relative;
                    overflow: hidden;
                }
    
                .slide-ana {
                    height: 360px;
                }
    
                .slide-ana > div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transition: all 0.7s;
                }
    
                @media (min-width: 200px) and (max-width: 639px) {
                    .slider {
                        height: 300px;
                        width: 170px;
                    }
                }
            `}</style>
        </div>
      ) : (
        "Wait"
      )}
    </>
  );
  // } else alert("login First to see the details");
  // return <Navigate to="/" />;
}
