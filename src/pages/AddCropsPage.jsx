import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { cropsAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const AddCropsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "kg",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });

  const cropTypes = [
    "Vegetable",
    "Fruit",
    "Grain",
    "Spice",
    "Pulse",
    "Oilseed",
    "Fiber",
    "Other",
  ];

  const units = ["kg", "ton", "piece", "liter", "bag"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Crop name is required";
    if (!formData.type) newErrors.type = "Crop type is required";
    if (!formData.pricePerUnit || formData.pricePerUnit <= 0) {
      newErrors.pricePerUnit = "Valid price is required";
    }
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Valid quantity is required";
    }
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const cropData = {
        ...formData,
        pricePerUnit: parseFloat(formData.pricePerUnit),
        quantity: parseFloat(formData.quantity),
        owner: {
          ownerEmail: user.email,
          ownerName: user.displayName || user.email.split("@")[0],
        },
      };

      const response = await cropsAPI.create(cropData, user.email);

      // Success
      showSuccess("Crop added successfully! 🌾");
      navigate(`/crop/${response.data._id}`);
    } catch (error) {
      showError(error.message || "Failed to add crop");
      console.error("Error adding crop:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-white to-[#F8FFF8] font-[Poppins,sans-serif]">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-[#E8F5E9] rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#4CAF50]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-[#1A1A1A] mb-3">
                List Your <span className="text-[#4CAF50]">Crop</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Connect with buyers across the region and grow your agricultural
                business
              </p>
            </div>

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12"
            >
              <div className="space-y-8">
                {/* Section: Basic Information */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">
                      Basic Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Crop Name */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Crop Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3.5 text-base border-2 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 ${
                            errors.name
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : "border-gray-200"
                          }`}
                          placeholder="e.g., Fresh Tomatoes, Organic Rice, Basmati Wheat"
                        />
                      </div>
                      {errors.name && (
                        <div className="flex items-center gap-1 mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-red-600 text-sm font-medium">
                            {errors.name}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Crop Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Crop Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                        </div>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-10 py-3.5 text-base border-2 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 appearance-none bg-white cursor-pointer ${
                            errors.type
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : "border-gray-200"
                          }`}
                        >
                          <option value="">Select crop type</option>
                          {cropTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {errors.type && (
                        <div className="flex items-center gap-1 mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-red-600 text-sm font-medium">
                            {errors.type}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
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
                        </div>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3.5 text-base border-2 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 ${
                            errors.location
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : "border-gray-200"
                          }`}
                          placeholder="e.g., Bogura, Rajshahi"
                        />
                      </div>
                      {errors.location && (
                        <div className="flex items-center gap-1 mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-red-600 text-sm font-medium">
                            {errors.location}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Section: Pricing & Quantity */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">
                      Pricing & Quantity
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Price Per Unit */}
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price Per Unit (৳){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <input
                          type="number"
                          name="pricePerUnit"
                          value={formData.pricePerUnit}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className={`w-full pl-12 pr-4 py-3.5 text-base border-2 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 ${
                            errors.pricePerUnit
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : "border-gray-200"
                          }`}
                          placeholder="e.g., 55.00"
                        />
                      </div>
                      {errors.pricePerUnit && (
                        <div className="flex items-center gap-1 mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-red-600 text-sm font-medium">
                            {errors.pricePerUnit}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Unit */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Unit <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            />
                          </svg>
                        </div>
                        <select
                          name="unit"
                          value={formData.unit}
                          onChange={handleChange}
                          className="w-full pl-12 pr-10 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 appearance-none bg-white cursor-pointer"
                        >
                          {units.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Available Quantity{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className={`w-full pl-12 pr-4 py-3.5 text-base border-2 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 ${
                            errors.quantity
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : "border-gray-200"
                          }`}
                          placeholder="e.g., 400"
                        />
                      </div>
                      {errors.quantity && (
                        <div className="flex items-center gap-1 mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-red-600 text-sm font-medium">
                            {errors.quantity}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Section: Description & Media */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">
                      Description & Media
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Crop Description <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="6"
                          className={`w-full px-4 py-3.5 text-base border-2 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 resize-none ${
                            errors.description
                              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                              : "border-gray-200"
                          }`}
                          placeholder="Provide detailed information about your crop: quality, growing conditions, organic status, harvest date, special features, certifications, etc."
                        ></textarea>
                        <div className="absolute top-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                          {formData.description.length} chars
                        </div>
                      </div>
                      {errors.description && (
                        <div className="flex items-center gap-1 mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-red-600 text-sm font-medium">
                            {errors.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Crop Image URL{" "}
                        <span className="text-gray-400 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200"
                          placeholder="https://example.com/your-crop-image.jpg"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 ml-1 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        A high-quality image helps attract more buyers (supports
                        JPG, PNG, WebP)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-6">
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 text-lg py-4"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Adding Your Crop...
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          List My Crop
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      disabled={loading}
                      className="flex-1 btn-outline disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 text-lg py-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCropsPage;
