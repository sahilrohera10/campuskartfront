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

export default function MainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Images />
      
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
        <FAQ/>
      </div>
      

      <br />
      <br />
    </div>
  );
}
