import React from "react";
import { NavLink } from "react-router-dom";

const CropCard = ({ crop }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Crop Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={
            crop.image || "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={crop.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-[#4CAF50]">
          {crop.type}
        </div>
      </div>

      {/* Crop Details */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 line-clamp-1">
          {crop.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {crop.description}
        </p>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-[#4CAF50]">
              ৳{crop.pricePerUnit}
            </span>
            <span className="text-gray-500 text-sm">/ {crop.unit}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{crop.quantity}</span> {crop.unit}{" "}
            available
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-[#4CAF50]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{crop.location}</span>
        </div>

        {/* View Details Button */}
        <NavLink
          to={`/crop/${crop._id}`}
          className="btn-primary w-full text-center block"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default CropCard;
