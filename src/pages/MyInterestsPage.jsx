import React, { useState, useEffect, useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { interestsAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const MyInterestsPage = () => {
  const { user } = useContext(AuthContext);
  const { showSuccess, showError } = useToast();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMyInterests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchMyInterests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await interestsAPI.getReceived(user.email);
      setInterests(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch interests");
      console.error("Error fetching interests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (interestId, newStatus) => {
    try {
      setUpdatingStatus(interestId);
      await interestsAPI.update(interestId, newStatus);

      // Update local state
      setInterests((prev) =>
        prev.map((interest) =>
          interest._id === interestId
            ? { ...interest, status: newStatus }
            : interest
        )
      );

      showSuccess(
        `Interest ${
          newStatus === "accepted" ? "accepted" : "rejected"
        } successfully!`
      );
    } catch (err) {
      console.error("Error updating status:", err);
      showError(err.message || "Failed to update interest status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: interests.length,
      pending: interests.filter((i) => i.status === "pending").length,
      accepted: interests.filter((i) => i.status === "accepted").length,
      rejected: interests.filter((i) => i.status === "rejected").length,
    };
  }, [interests]);

  // Filter and Sort interests
  const filteredAndSortedInterests = useMemo(() => {
    let filtered = [...interests];

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (interest) => interest.status === filterStatus
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "quantity-high":
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      case "quantity-low":
        filtered.sort((a, b) => a.quantity - b.quantity);
        break;
      case "crop-name":
        filtered.sort((a, b) =>
          (a.cropDetails?.name || "").localeCompare(b.cropDetails?.name || "")
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [interests, sortBy, filterStatus]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: (
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      accepted: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: (
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: (
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
    };

    const config = statusConfig[status] || {
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
      icon: null,
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-white to-[#F8FFF8] font-[Poppins,sans-serif]">
        <div className="container mx-auto px-4 py-20">
          {/* Header Section */}
          <div className="mb-8 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-3">
              Received <span className="text-[#4CAF50]">Interests</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Manage buyer interests on your crops - Accept or reject requests
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-700 animate-fadeIn">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
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
                <span>{error}</span>
              </div>
            </div>
          )}

          {interests.length > 0 ? (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slideUp">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#4CAF50]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1A1A1A]">
                        {stats.total}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        Total Interests
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1A1A1A]">
                        {stats.pending}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        Pending
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1A1A1A]">
                        {stats.accepted}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        Accepted
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1A1A1A]">
                        {stats.rejected}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        Rejected
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters and Sort Controls */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8 animate-slideUp">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  {/* Filter by Status */}
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center flex-wrap">
                    <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Filter by Status:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setFilterStatus("all")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          filterStatus === "all"
                            ? "bg-[#4CAF50] text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All ({stats.total})
                      </button>
                      <button
                        onClick={() => setFilterStatus("pending")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          filterStatus === "pending"
                            ? "bg-yellow-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Pending ({stats.pending})
                      </button>
                      <button
                        onClick={() => setFilterStatus("accepted")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          filterStatus === "accepted"
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Accepted ({stats.accepted})
                      </button>
                      <button
                        onClick={() => setFilterStatus("rejected")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          filterStatus === "rejected"
                            ? "bg-red-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Rejected ({stats.rejected})
                      </button>
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    <label
                      htmlFor="sortBy"
                      className="text-sm font-semibold text-gray-700 whitespace-nowrap"
                    >
                      Sort by:
                    </label>
                    <select
                      id="sortBy"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 text-sm font-medium grow lg:grow-0"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="quantity-high">
                        Quantity (High to Low)
                      </option>
                      <option value="quantity-low">
                        Quantity (Low to High)
                      </option>
                      <option value="crop-name">Crop Name (A-Z)</option>
                    </select>
                  </div>
                </div>

                {/* Results Count */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-[#4CAF50]">
                      {filteredAndSortedInterests.length}
                    </span>{" "}
                    of <span className="font-semibold">{stats.total}</span>{" "}
                    interest{stats.total !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Interests List */}
              {filteredAndSortedInterests.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 animate-slideUp">
                  {filteredAndSortedInterests.map((interest) => (
                    <div
                      key={interest._id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Crop Image */}
                          <div className="shrink-0">
                            <NavLink to={`/crop/${interest.cropId}`}>
                              <img
                                src={
                                  interest.cropDetails?.image ||
                                  "https://via.placeholder.com/200x150?text=No+Image"
                                }
                                alt={interest.cropDetails?.name || "Crop"}
                                className="w-full md:w-56 h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                              />
                            </NavLink>
                          </div>

                          {/* Interest Details */}
                          <div className="grow">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                              <div className="flex-1">
                                <NavLink
                                  to={`/crop/${interest.cropId}`}
                                  className="text-2xl font-bold text-[#1A1A1A] hover:text-[#4CAF50] transition-colors inline-block"
                                >
                                  {interest.cropDetails?.name ||
                                    "Crop Not Found"}
                                </NavLink>
                                {interest.cropDetails && (
                                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
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
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                      />
                                    </svg>
                                    <span>{interest.cropDetails.type}</span>
                                    <span>•</span>
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
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                    </svg>
                                    <span>{interest.cropDetails.location}</span>
                                  </div>
                                )}
                                {/* Buyer Information */}
                                <div className="mt-3 bg-blue-50 rounded-lg p-3 border border-blue-200">
                                  <p className="text-xs text-blue-600 font-semibold mb-1 flex items-center gap-1">
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                      />
                                    </svg>
                                    Buyer Information
                                  </p>
                                  <p className="text-sm text-gray-700">
                                    <span className="font-semibold">Name:</span>{" "}
                                    {interest.buyerName || "Unknown"}
                                  </p>
                                  <p className="text-sm text-gray-700 wrap-break-word">
                                    <span className="font-semibold">
                                      Email:
                                    </span>{" "}
                                    {interest.buyerEmail || "N/A"}
                                  </p>
                                </div>
                              </div>
                              {getStatusBadge(interest.status)}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                              <div className="bg-[#F8FFF8] rounded-lg p-4 border border-[#E8F5E9]">
                                <p className="text-xs text-gray-600 mb-1 font-medium">
                                  Quantity Requested
                                </p>
                                <p className="text-lg font-bold text-[#1A1A1A]">
                                  {interest.quantity}{" "}
                                  <span className="text-sm font-normal text-gray-600">
                                    {interest.cropDetails?.unit || "units"}
                                  </span>
                                </p>
                              </div>
                              <div className="bg-[#F8FFF8] rounded-lg p-4 border border-[#E8F5E9]">
                                <p className="text-xs text-gray-600 mb-1 font-medium">
                                  Price Per Unit
                                </p>
                                <p className="text-lg font-bold text-[#4CAF50]">
                                  ৳{interest.cropDetails?.pricePerUnit || "N/A"}
                                </p>
                              </div>
                              <div className="bg-[#F8FFF8] rounded-lg p-4 border border-[#E8F5E9]">
                                <p className="text-xs text-gray-600 mb-1 font-medium">
                                  Total Value
                                </p>
                                <p className="text-lg font-bold text-[#4CAF50]">
                                  ৳
                                  {interest.cropDetails?.pricePerUnit
                                    ? (
                                        interest.quantity *
                                        interest.cropDetails.pricePerUnit
                                      ).toLocaleString()
                                    : "N/A"}
                                </p>
                              </div>
                            </div>

                            {interest.message && (
                              <div className="mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <p className="text-xs text-gray-600 mb-2 font-semibold flex items-center gap-1">
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
                                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                  </svg>
                                  Buyer's Message
                                </p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  "{interest.message}"
                                </p>
                              </div>
                            )}

                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
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
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span>
                                  {new Date(
                                    interest.createdAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col sm:flex-row gap-2">
                                {interest.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(
                                          interest._id,
                                          "accepted"
                                        )
                                      }
                                      disabled={updatingStatus === interest._id}
                                      className="flex-1 btn-success text-sm inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {updatingStatus === interest._id ? (
                                        <>
                                          <svg
                                            className="animate-spin h-4 w-4"
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
                                          Updating...
                                        </>
                                      ) : (
                                        <>
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
                                              d="M5 13l4 4L19 7"
                                            />
                                          </svg>
                                          Accept Interest
                                        </>
                                      )}
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(
                                          interest._id,
                                          "rejected"
                                        )
                                      }
                                      disabled={updatingStatus === interest._id}
                                      className="flex-1 btn-error text-sm inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {updatingStatus === interest._id ? (
                                        <>
                                          <svg
                                            className="animate-spin h-4 w-4"
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
                                          Updating...
                                        </>
                                      ) : (
                                        <>
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
                                              d="M6 18L18 6M6 6l12 12"
                                            />
                                          </svg>
                                          Reject Interest
                                        </>
                                      )}
                                    </button>
                                  </>
                                )}
                                <NavLink
                                  to={`/crop/${interest.cropId}`}
                                  className={`${
                                    interest.status === "pending"
                                      ? "flex-1"
                                      : "w-full"
                                  } btn-outline text-sm inline-flex items-center justify-center gap-2`}
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
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                  View Crop Details
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 mx-auto text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No interests found with the selected filter
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <button
                    onClick={() => setFilterStatus("all")}
                    className="btn-outline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100 animate-fadeIn">
              <div className="mb-6 relative">
                <div className="w-32 h-32 bg-[#E8F5E9] rounded-full mx-auto flex items-center justify-center animate-float">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-[#4CAF50]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                No Interests Received Yet
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                You haven't received any buyer interests on your crops yet. List
                your crops to start receiving inquiries from potential buyers!
              </p>
              <NavLink
                to="/add-crops"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Your Crops
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyInterestsPage;
