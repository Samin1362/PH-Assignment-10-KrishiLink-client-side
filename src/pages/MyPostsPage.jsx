import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { cropsAPI, interestsAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const MyPostsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCrop, setExpandedCrop] = useState(null);
  const [receivedInterests, setReceivedInterests] = useState({});

  useEffect(() => {
    if (user) {
      fetchMyCrops();
      fetchReceivedInterests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchMyCrops = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cropsAPI.getAll();
      // Filter to only show user's own crops
      const myCrops = response.data.filter(
        (crop) => crop.owner.ownerEmail === user.email
      );
      setCrops(myCrops);
    } catch (err) {
      setError(err.message || "Failed to fetch crops");
      console.error("Error fetching crops:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReceivedInterests = async () => {
    try {
      const response = await interestsAPI.getReceived(user.email);
      // Group interests by cropId
      const grouped = {};
      response.data.forEach((interest) => {
        if (!grouped[interest.cropId]) {
          grouped[interest.cropId] = [];
        }
        grouped[interest.cropId].push(interest);
      });
      setReceivedInterests(grouped);
    } catch (err) {
      console.error("Error fetching interests:", err);
    }
  };

  const handleDeleteCrop = async (cropId, cropName) => {
    if (!window.confirm(`Are you sure you want to delete "${cropName}"?`)) {
      return;
    }

    try {
      await cropsAPI.delete(cropId, user.email);
      showSuccess("Crop deleted successfully!");
      fetchMyCrops();
    } catch (err) {
      showError(err.message || "Failed to delete crop");
      console.error("Error deleting crop:", err);
    }
  };

  const handleUpdateInterestStatus = async (interestId, cropId, newStatus) => {
    try {
      await interestsAPI.updateStatus({
        interestId,
        cropId,
        status: newStatus,
      });
      showSuccess(`Interest ${newStatus} successfully!`);
      fetchReceivedInterests();
      fetchMyCrops(); // Refresh to update quantity if accepted
    } catch (err) {
      showError(err.message || "Failed to update interest status");
      console.error("Error updating interest:", err);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      accepted: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold border ${
          statusColors[status] || "bg-gray-100 text-gray-800 border-gray-300"
        }`}
      >
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
      <div className="container mx-auto px-4 py-20 min-h-screen font-[Poppins,sans-serif]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3">My Posts</h1>
            <p className="text-gray-600">
              Manage your crop listings and received interests
            </p>
          </div>
          <NavLink to="/add-crops" className="btn-primary">
            + Add New Crop
          </NavLink>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {crops.length > 0 ? (
          <div className="space-y-6">
            {crops.map((crop) => (
              <div
                key={crop._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                {/* Crop Header */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Crop Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={
                          crop.image ||
                          "https://via.placeholder.com/200x150?text=No+Image"
                        }
                        alt={crop.name}
                        className="w-full md:w-48 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Crop Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-[#1A1A1A]">
                            {crop.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {crop.type} • {crop.location}
                          </p>
                        </div>
                        <span className="px-4 py-1 bg-[#A5D6A7] text-[#1A1A1A] rounded-full text-sm font-semibold">
                          {crop.type}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {crop.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="text-lg font-semibold text-[#4CAF50]">
                            ৳{crop.pricePerUnit}/{crop.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Available</p>
                          <p className="text-lg font-semibold text-[#1A1A1A]">
                            {crop.quantity} {crop.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Interests</p>
                          <p className="text-lg font-semibold text-[#1A1A1A]">
                            {receivedInterests[crop._id]?.length || 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <p className="text-lg font-semibold text-green-600">
                            Active
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <NavLink
                          to={`/crop/${crop._id}`}
                          className="btn-outline text-sm"
                        >
                          View
                        </NavLink>
                        <button
                          onClick={() => navigate(`/edit-crop/${crop._id}`)}
                          className="btn-outline text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCrop(crop._id, crop.name)}
                          className="px-4 py-2 text-sm font-medium text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Delete
                        </button>
                        {receivedInterests[crop._id]?.length > 0 && (
                          <button
                            onClick={() =>
                              setExpandedCrop(
                                expandedCrop === crop._id ? null : crop._id
                              )
                            }
                            className="btn-primary text-sm ml-auto"
                          >
                            {expandedCrop === crop._id
                              ? "Hide Interests"
                              : `View ${
                                  receivedInterests[crop._id].length
                                } Interest${
                                  receivedInterests[crop._id].length > 1
                                    ? "s"
                                    : ""
                                }`}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Received Interests Section */}
                {expandedCrop === crop._id &&
                  receivedInterests[crop._id]?.length > 0 && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <h4 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                        Received Interests
                      </h4>
                      <div className="space-y-4">
                        {receivedInterests[crop._id].map((interest) => (
                          <div
                            key={interest._id}
                            className="bg-white p-4 rounded-lg border border-gray-200"
                          >
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="font-semibold text-[#1A1A1A]">
                                    {interest.userName}
                                  </p>
                                  {getStatusBadge(interest.status)}
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                  {interest.userEmail}
                                </p>
                                <p className="text-sm mb-2">
                                  <span className="font-semibold">
                                    Quantity:
                                  </span>{" "}
                                  {interest.quantity} {crop.unit}
                                </p>
                                {interest.message && (
                                  <p className="text-sm text-gray-700 italic">
                                    "{interest.message}"
                                  </p>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
                                  {new Date(
                                    interest.createdAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                              {interest.status === "pending" && (
                                <div className="flex flex-col gap-2 flex-shrink-0">
                                  <button
                                    onClick={() =>
                                      handleUpdateInterestStatus(
                                        interest._id,
                                        crop._id,
                                        "accepted"
                                      )
                                    }
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleUpdateInterestStatus(
                                        interest._id,
                                        crop._id,
                                        "rejected"
                                      )
                                    }
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
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
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Crops Posted Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start by adding your first crop listing
            </p>
            <NavLink to="/add-crops" className="btn-primary">
              + Add Your First Crop
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPostsPage;
