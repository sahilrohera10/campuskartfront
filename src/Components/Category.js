import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Category() {
  const b = "book";
  const s = "stationery";
  const f = "furniture";
  const e = "electronics";
  // const o = "others";

  return (
    <div className="pb-16">
      <div className="flex justify-center items-center">
        <div
          style={{ width: "1000px" }}
          className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full"
        >
          <div className="flex flex-col jusitfy-center items-center space-y-10">
            <div className="flex flex-col justify-center items-center space-y-2">
              <p className="text-xl leading-5 text-gray-600"></p>
              <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                Shop By Category
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-x-8 w-full">
              <div className="relative group flex justify-center items-center h-full w-full">
                <Link to={`${b}`}>
                  <img
                    style={{ objectFit: "contain" }}
                    className="object-center object-cover h-full w-full"
                    src="PostBooks.png"
                    alt="girl-image"
                  />
                </Link>

                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
              </div>
              <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
                <div className="relative group flex justify-center items-center h-full w-full">
                  <Link to={`${s}`}>
                    <img
                      className="object-center object-cover h-full w-full"
                      src="GifStationery.gif"
                      alt="shoe-image"
                    />
                  </Link>

                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                </div>
                <div className="relative group flex justify-center items-center h-full w-full">
                  <Link to={`${f}`}>
                    <img
                      className="object-center object-cover h-full w-full"
                      src="PostFurniture.png"
                      alt="watch-image"
                    />
                  </Link>

                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                </div>
              </div>
              <div className="relative group justify-center items-center h-full w-full lg:flex">
                <Link to={`${e}`}>
                  <img
                    className="object-center object-cover h-full w-full"
                    src="GifElectronics.gif"
                    alt="image"
                  />
                </Link>
                {/* 
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
              </div>
              <div className="relative group flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden">
                <img
                  className="object-center object-cover h-full w-full hidden md:block"
                  src="https://i.ibb.co/6FjW19n/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2.png"
                  alt="girl-image"
                /> */}
                {/* <img
                  className="object-center object-cover h-full w-full md:hidden"
                  src="https://i.ibb.co/sQgHwHn/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
                  alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
                /> */}
                {/* <Link to="products">
                  <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                    others
                  </button>
                </Link> */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
              </div>
            </div>
            <div className="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
              <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
