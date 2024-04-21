import React, { useEffect } from "react";
// import AddProduct from "../Components/AddProduct";
// import Category from "../Components/Category";
// import ContactUs from "../Components/ContactUs";
// import Footer from "../Components/Footer";
// import Forum from "../Components/Forum";
// import NavBar from "../Components/NavBar";
// import Partners from "../Components/Partners";
// import { Link } from "react-router-dom";
// import newbanner from "../newbanner.jpeg";
import Images from "../Components/Images";
// import FeatureProducts from "../Components/FeatureProducts";
import ProductsGrid from "./ProductsGrid";
import Categories from "../Components/Categories";
import FAQ from "../Components/FAQ";
import useOnlineStatus from "../utils/useOnlineStatus";

export default function MainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const status = useOnlineStatus();

  if (status === false)
    return (
      <h2 style={{ marginTop: "140px", textAlign: "center" }}>
        Looks like you are offline! .. Please check your internet connction.
      </h2>
    );

  return (
    <div>
      {/* <Images /> */}

      <div className="flex items-center mt-16 justify-center pt-10 h-48 md:h-64 w-full bg-faf7f2">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Connect. Trade. Thrive.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Your College's Marketplace to buy and sell items among peers.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Explore Now
            </button>
          </div>
          {/* <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
            <img
              src="/img.png"
              alt="Illustration"
              className="object-cover w-56 h-56 md:w-64 md:h-64 rounded-lg "
            />
          </div> */}
        </div>
              
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Categories />
        <ProductsGrid />
        {/* <FAQ/> */}
      </div>

      <br />
      <br />
    </div>
  );
}
