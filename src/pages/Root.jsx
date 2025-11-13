import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      {/* Main content area with flex-grow to push footer down */}
      <div className="grow">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
