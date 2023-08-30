import React from "react";
import { Outlet } from "react-router-dom";

import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  let { myid } = useParams();
  return (
    <div>
      <NavBar />

      <Outlet />

      {myid ? "" : <Footer />}
    </div>
  );
}
