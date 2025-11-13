import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { interestsAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const MyInterestsPage = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await interestsAPI.getSent(user.email);
      setInterests(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch interests");
      console.error("Error fetching interests:", err);
    } finally {
      setLoading(false);
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
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3">
            My Interests
          </h1>
          <p className="text-gray-600">
            Track all the crop interests you've sent to sellers
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {interests.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {interests.map((interest) => (
              <div
                key={interest._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Crop Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={
                          interest.cropDetails?.image ||
                          "https://via.placeholder.com/200x150?text=No+Image"
                        }
                        alt={interest.cropDetails?.name || "Crop"}
                        className="w-full md:w-48 h-32 md:h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Interest Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <NavLink
                            to={`/crop/${interest.cropId}`}
                            className="text-2xl font-bold text-[#1A1A1A] hover:text-[#4CAF50] transition-colors"
                          >
                            {interest.cropDetails?.name || "Crop Not Found"}
                          </NavLink>
                          {interest.cropDetails && (
                            <p className="text-sm text-gray-500 mt-1">
                              {interest.cropDetails.type} •{" "}
                              {interest.cropDetails.location}
                            </p>
                          )}
                        </div>
                        {getStatusBadge(interest.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            Quantity Requested
                          </p>
                          <p className="text-lg font-semibold text-[#1A1A1A]">
                            {interest.quantity}{" "}
                            {interest.cropDetails?.unit || "units"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Price Per Unit
                          </p>
                          <p className="text-lg font-semibold text-[#4CAF50]">
                            ৳{interest.cropDetails?.pricePerUnit || "N/A"}
                          </p>
                        </div>
                      </div>

                      {interest.message && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-1">
                            Your Message
                          </p>
                          <p className="text-gray-700 italic">
                            "{interest.message}"
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          Sent on{" "}
                          {new Date(interest.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <NavLink
                          to={`/crop/${interest.cropId}`}
                          className="btn-outline text-sm"
                        >
                          View Crop Details
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Interests Sent Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Browse crops and show your interest to connect with sellers
            </p>
            <NavLink to="/all-crops" className="btn-primary">
              Browse Crops
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default MyInterestsPage;
