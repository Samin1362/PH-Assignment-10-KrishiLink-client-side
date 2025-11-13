import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowItWorksPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-20 min-h-screen font-[Poppins,sans-serif]">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6">How It Works</h1>
        <p className="text-gray-600">Learn how to use KrishiLink platform.</p>
      </div>
    </>
  );
};

export default HowItWorksPage;

