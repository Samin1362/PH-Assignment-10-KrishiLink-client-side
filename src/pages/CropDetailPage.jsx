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
        <div className="min-h-screen bg-linear-to-b from-white to-[#F8FFF8] font-[Poppins,sans-serif] pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-red-600"
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
                <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">
                  Crop Not Found
                </h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  {error ||
                    "The crop you're looking for doesn't exist or has been removed."}
                </p>
                <button
                  onClick={() => navigate("/all-crops")}
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to All Crops
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const isOwner = user && crop.owner.ownerEmail === user.email;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-white to-[#F8FFF8] font-[Poppins,sans-serif] pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-[#4CAF50] hover:bg-[#F8FFF8] transition-all duration-200"
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
              <span className="font-medium">Back</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Image */}
              <div className="lg:col-span-2 space-y-6">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden bg-gray-100 shadow-2xl border border-gray-200 group">
                  <div className="aspect-video">
                    <img
                      src={
                        crop.image ||
                        "https://via.placeholder.com/800x600?text=No+Image"
                      }
                      alt={crop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Type Badge on Image */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-[#4CAF50] text-white rounded-xl text-sm font-bold shadow-lg">
                    {crop.type}
                  </div>
                  {/* Owner Badge (if owner) */}
                  {isOwner && (
                    <div className="absolute top-6 right-6 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg flex items-center gap-2">
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
                      Your Listing
                    </div>
                  )}
                </div>

                {/* Description Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    About This Crop
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                    {crop.description}
                  </p>
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-3">
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
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Available</p>
                        <p className="text-2xl font-bold text-[#1A1A1A]">
                          {crop.quantity} {crop.unit}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-3">
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
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-xl font-bold text-[#1A1A1A]">
                          {crop.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details & Actions */}
              <div className="lg:col-span-1 space-y-6">
                {/* Sticky Card */}
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 sticky top-24">
                  {/* Crop Name */}
                  <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6 leading-tight">
                    {crop.name}
                  </h1>

                  {/* Price Section */}
                  <div className="bg-linear-to-br from-[#E8F5E9] to-[#F8FFF8] rounded-2xl p-6 mb-6 border-2 border-[#A5D6A7]">
                    <p className="text-sm text-gray-600 mb-2">Price per unit</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-[#4CAF50]">
                        ৳{crop.pricePerUnit}
                      </span>
                      <span className="text-2xl text-gray-600 font-medium">
                        / {crop.unit}
                      </span>
                    </div>
                  </div>

                  {/* Owner Info Card */}
                  <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Listed by</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {crop.owner.ownerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[#1A1A1A] text-lg">
                          {crop.owner.ownerName}
                        </p>
                        <p className="text-sm text-gray-500">Farmer</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mb-6"></div>

                  {/* Action Buttons */}
                  {isOwner ? (
                    <div className="space-y-4">
                      <div className="p-5 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-start gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600 mt-0.5 shrink-0"
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
                        <div>
                          <p className="font-semibold text-blue-800">
                            Your Listing
                          </p>
                          <p className="text-sm text-blue-700 mt-1">
                            You own this crop listing. You can edit or manage it
                            anytime.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/edit-crop/${crop._id}`)}
                        className="btn-primary w-full py-4 text-lg inline-flex items-center justify-center gap-2"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit Crop Details
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {!showInterestForm ? (
                        <button
                          onClick={() => setShowInterestForm(true)}
                          className="btn-primary w-full py-4 text-lg inline-flex items-center justify-center gap-2 group"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 group-hover:scale-110 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Show Interest
                        </button>
                      ) : (
                        <div className="space-y-5">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-[#1A1A1A]">
                              Express Interest
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setShowInterestForm(false);
                                setInterestData({ quantity: "", message: "" });
                              }}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
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
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>

                          <form
                            onSubmit={handleInterestSubmit}
                            className="space-y-5"
                          >
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Quantity ({crop.unit}){" "}
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
                                  className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200"
                                  placeholder={`Max ${crop.quantity} ${crop.unit}`}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                Maximum available: {crop.quantity} {crop.unit}
                              </p>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Message{" "}
                                <span className="text-gray-400 font-normal">
                                  (Optional)
                                </span>
                              </label>
                              <textarea
                                value={interestData.message}
                                onChange={(e) =>
                                  setInterestData({
                                    ...interestData,
                                    message: e.target.value,
                                  })
                                }
                                rows="4"
                                className="w-full px-4 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#A5D6A7] transition-all duration-200 resize-none"
                                placeholder="Add a message to introduce yourself or discuss details..."
                              ></textarea>
                              <p className="text-xs text-gray-500 mt-2">
                                Share your requirements or ask questions about
                                the crop
                              </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                              <button
                                type="submit"
                                disabled={submittingInterest}
                                className="btn-primary flex-1 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                              >
                                {submittingInterest ? (
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
                                    Sending...
                                  </>
                                ) : (
                                  <>
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
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                      />
                                    </svg>
                                    Send Interest
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowInterestForm(false);
                                  setInterestData({
                                    quantity: "",
                                    message: "",
                                  });
                                }}
                                disabled={submittingInterest}
                                className="px-6 py-3.5 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropDetailPage;
