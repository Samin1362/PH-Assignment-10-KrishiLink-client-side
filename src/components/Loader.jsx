import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-[Poppins,sans-serif]">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-[#A5D6A7] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#4CAF50] rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">
          Krishi<span className="text-[#4CAF50]">Link</span>
        </h2>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;