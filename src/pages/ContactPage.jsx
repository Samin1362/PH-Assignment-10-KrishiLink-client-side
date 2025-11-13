import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-20 min-h-screen font-[Poppins,sans-serif]">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6">Contact Us</h1>
        <p className="text-gray-600">Get in touch with the KrishiLink team.</p>
      </div>
    </>
  );
};

export default ContactPage;

