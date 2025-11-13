import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import CropCard from "../components/CropCard";
import Loader from "../components/Loader";
import { cropsAPI } from "../services/api";

const AllCropsPage = () => {
  const [allCrops, setAllCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterType, setFilterType] = useState("all");

  // Crop types for filter
  const cropTypes = [
    "all",
    "Vegetable",
    "Fruit",
    "Grain",
    "Spice",
    "Pulse",
    "Oilseed",
    "Fiber",
    "Other",
  ];

  // Fetch all crops once on mount
  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cropsAPI.getAll();
      setAllCrops(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch crops");
      console.error("Error fetching crops:", err);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic search, filter, and sort
  const filteredAndSortedCrops = useMemo(() => {
    let result = [...allCrops];

    // 1. Search filter (case-insensitive, searches in name, type, location, description)
    if (searchInput.trim()) {
      const search = searchInput.toLowerCase();
      result = result.filter(
        (crop) =>
          crop.name.toLowerCase().includes(search) ||
          crop.type.toLowerCase().includes(search) ||
          crop.location.toLowerCase().includes(search) ||
          crop.description.toLowerCase().includes(search)
      );
    }

    // 2. Type filter
    if (filterType !== "all") {
      result = result.filter((crop) => crop.type === filterType);
    }

    // 3. Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
        break;
      case "price-high":
        result.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
        break;
      case "quantity-low":
        result.sort((a, b) => a.quantity - b.quantity);
        break;
      case "quantity-high":
        result.sort((a, b) => b.quantity - a.quantity);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    return result;
  }, [allCrops, searchInput, filterType, sortBy]);

  const handleClearFilters = () => {
    setSearchInput("");
    setFilterType("all");
    setSortBy("newest");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-white to-[#F8FFF8] font-[Poppins,sans-serif]">
        <div className="container mx-auto px-4 py-24">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-[#1A1A1A] mb-3">
              Explore <span className="text-[#4CAF50]">All Crops</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Discover fresh agricultural products from farmers across the
              region
            </p>
          </div>

          {/* Search & Filter Panel */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#4CAF50]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by crop name, type, location, or description..."
                  className="w-full pl-12 pr-12 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200"
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#4CAF50] transition-colors"
                    aria-label="Clear search"
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
                  </button>
                )}
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Left: Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-stretch sm:items-center">
                {/* Type Filter */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-600 mb-1 ml-1">
                    Crop Type
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="pl-10 pr-10 py-2.5 min-w-[160px] border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 appearance-none bg-white cursor-pointer"
                    >
                      {cropTypes.map((type) => (
                        <option key={type} value={type}>
                          {type === "all" ? "All Types" : type}
                        </option>
                      ))}
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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

                {/* Sort Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-600 mb-1 ml-1">
                    Sort By
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="pl-10 pr-10 py-2.5 min-w-[180px] border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 appearance-none bg-white cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="quantity-low">
                        Quantity: Low to High
                      </option>
                      <option value="quantity-high">
                        Quantity: High to Low
                      </option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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

                {/* Clear Filters Button */}
                {(searchInput ||
                  filterType !== "all" ||
                  sortBy !== "newest") && (
                  <div className="relative">
                    <label className="block text-xs font-semibold text-transparent mb-1 ml-1 select-none">
                      Action
                    </label>
                    <button
                      onClick={handleClearFilters}
                      className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border-2 border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {/* Right: Results Count */}
              <div className="flex items-center gap-3 bg-[#E8F5E9] px-5 py-3 rounded-lg border border-[#A5D6A7]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#4CAF50]"
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
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">
                    {filteredAndSortedCrops.length}
                  </div>
                  <div className="text-xs text-gray-600">
                    {filteredAndSortedCrops.length === 1 ? "Crop" : "Crops"}{" "}
                    Found
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {(searchInput || filterType !== "all") && (
              <div className="mt-5 pt-5 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Active Filters:
                  </span>
                  {searchInput && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg text-sm font-medium shadow-sm">
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
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>"{searchInput}"</span>
                      <button
                        onClick={() => setSearchInput("")}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        aria-label="Remove search filter"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  {filterType !== "all" && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg text-sm font-medium shadow-sm">
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
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <span>{filterType}</span>
                      <button
                        onClick={() => setFilterType("all")}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        aria-label="Remove type filter"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-5 bg-red-50 border-2 border-red-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-600"
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
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">
                    Error Loading Crops
                  </h4>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Crops Grid */}
          {filteredAndSortedCrops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedCrops.map((crop) => (
                <CropCard key={crop._id} crop={crop} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                  No Crops Found
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {searchInput || filterType !== "all"
                    ? "We couldn't find any crops matching your search criteria. Try adjusting your filters or search terms."
                    : "No crops are currently available. Please check back later or add a new listing."}
                </p>
                {(searchInput || filterType !== "all") && (
                  <button
                    onClick={handleClearFilters}
                    className="btn-primary inline-flex items-center gap-2"
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllCropsPage;
