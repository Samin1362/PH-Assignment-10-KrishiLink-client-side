import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { cropsAPI, interestsAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const CropDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showSuccess, showError } = useToast();

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [submittingInterest, setSubmittingInterest] = useState(false);

  const [interestData, setInterestData] = useState({
    quantity: "",
    message: "",
  });

  useEffect(() => {
    fetchCropDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCropDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cropsAPI.getById(id);
      setCrop(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch crop details");
      console.error("Error fetching crop:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInterestSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login", { state: { from: { pathname: `/crop/${id}` } } });
      return;
    }

    try {
      setSubmittingInterest(true);

      const interest = {
        cropId: crop._id,
        userEmail: user.email,
        userName: user.displayName || user.email.split("@")[0],
        quantity: parseInt(interestData.quantity),
        message: interestData.message,
      };

      await interestsAPI.add(interest);

      // Show success message
      showSuccess("Interest sent successfully! 📧");
      setShowInterestForm(false);
      setInterestData({ quantity: "", message: "" });
    } catch (err) {
      showError(err.message || "Failed to send interest");
      console.error("Error sending interest:", err);
    } finally {
      setSubmittingInterest(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !crop) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-screen font-[Poppins,sans-serif]">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error || "Crop not found"}</p>
            <button
              onClick={() => navigate("/all-crops")}
              className="btn-primary"
            >
              Back to All Crops
            </button>
          </div>
        </div>
      </>
    );
  }

  const isOwner = user && crop.owner.ownerEmail === user.email;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-20 min-h-screen font-[Poppins,sans-serif]">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#4CAF50] transition-colors"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Crop Image */}
            <div className="rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={
                  crop.image ||
                  "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={crop.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Crop Details */}
            <div>
              <div className="inline-block px-4 py-1 bg-[#A5D6A7] text-[#1A1A1A] rounded-full text-sm font-semibold mb-4">
                {crop.type}
              </div>

              <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">
                {crop.name}
              </h1>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-[#4CAF50]">
                  ৳{crop.pricePerUnit}
                </span>
                <span className="text-xl text-gray-600">/ {crop.unit}</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
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
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <div>
                    <span className="text-gray-600">Available Quantity:</span>
                    <span className="font-semibold text-[#1A1A1A] ml-2">
                      {crop.quantity} {crop.unit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold text-[#1A1A1A] ml-2">
                      {crop.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div>
                    <span className="text-gray-600">Owner:</span>
                    <span className="font-semibold text-[#1A1A1A] ml-2">
                      {crop.owner.ownerName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {crop.description}
                </p>
              </div>

              {/* Action Buttons */}
              {isOwner ? (
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
                    This is your crop listing
                  </div>
                  <button
                    onClick={() => navigate(`/edit-crop/${crop._id}`)}
                    className="btn-primary w-full"
                  >
                    Edit Crop
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {!showInterestForm ? (
                    <button
                      onClick={() => setShowInterestForm(true)}
                      className="btn-primary w-full"
                    >
                      Show Interest
                    </button>
                  ) : (
                    <form onSubmit={handleInterestSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity ({crop.unit})
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          max={crop.quantity}
                          value={interestData.quantity}
                          onChange={(e) =>
                            setInterestData({
                              ...interestData,
                              quantity: e.target.value,
                            })
                          }
                          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                          placeholder={`Max ${crop.quantity} ${crop.unit}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message (Optional)
                        </label>
                        <textarea
                          value={interestData.message}
                          onChange={(e) =>
                            setInterestData({
                              ...interestData,
                              message: e.target.value,
                            })
                          }
                          rows="3"
                          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50] resize-none"
                          placeholder="Add a message to the owner..."
                        ></textarea>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={submittingInterest}
                          className="btn-primary flex-1 disabled:opacity-50"
                        >
                          {submittingInterest ? "Sending..." : "Send Interest"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowInterestForm(false)}
                          className="btn-outline flex-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropDetailPage;
