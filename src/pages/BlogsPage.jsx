import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BlogsPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-20 min-h-screen font-[Poppins,sans-serif]">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6">Agro News & Blog</h1>
        <p className="text-gray-600">Latest agricultural news and insights.</p>
      </div>
    </>
  );
};

export default BlogsPage;

