import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Banner from "../components/Banner";
import CropCard from "../components/CropCard";
import { cropsAPI } from "../services/api";

const Home = () => {
  const [latestCrops, setLatestCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestCrops();
  }, []);

  const fetchLatestCrops = async () => {
    try {
      const response = await cropsAPI.getLatest();
      setLatestCrops(response.data || []);
    } catch (error) {
      console.error("Error fetching latest crops:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* pt-16 accounts for the fixed navbar height */}
      <Banner />

      {/* Latest Crops Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              Latest Crops
            </h2>
            <p className="text-gray-600">
              Fresh listings from our agricultural community
            </p>
          </div>
          <NavLink to="/all-crops" className="btn-outline">
            View All Crops
          </NavLink>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : latestCrops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestCrops.map((crop) => (
              <CropCard key={crop._id} crop={crop} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            No crops available yet
          </p>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-linear-to-b from-white to-[#F8FFF8] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1A1A1A] mb-12">
            Why Choose KrishiLink?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A5D6A7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#4CAF50]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                Connect Directly
              </h3>
              <p className="text-gray-600">
                Direct connection between farmers and buyers
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A5D6A7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#4CAF50]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                Quality Assured
              </h3>
              <p className="text-gray-600">
                Fresh crops with verified information
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#A5D6A7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#4CAF50]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                Quick & Easy
              </h3>
              <p className="text-gray-600">
                Simple process from listing to transaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            How <span className="text-[#4CAF50]">KrishiLink</span> Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with the agricultural community in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  1
                </div>
              </div>
              <div className="mt-6 mb-4">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#4CAF50]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 text-center">
                Create Account
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Sign up for free and join our thriving agricultural community
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  2
                </div>
              </div>
              <div className="mt-6 mb-4">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#4CAF50]"
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
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 text-center">
                List Your Crops
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Add detailed information about your crops with photos and
                pricing
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  3
                </div>
              </div>
              <div className="mt-6 mb-4">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#4CAF50]"
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
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 text-center">
                Connect with Buyers
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Browse listings and connect directly with farmers or buyers
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  4
                </div>
              </div>
              <div className="mt-6 mb-4">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#4CAF50]"
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
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 text-center">
                Complete Transaction
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Negotiate and complete your deal with confidence and
                transparency
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <NavLink to="/register" className="btn-primary inline-block">
            Get Started Now
          </NavLink>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#4CAF50] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">5K+</div>
              <div className="text-[#E8F5E9] text-lg">Active Farmers</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-[#E8F5E9] text-lg">Crop Listings</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-[#E8F5E9] text-lg">Transactions</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">20+</div>
              <div className="text-[#E8F5E9] text-lg">Districts Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Agro News/Blogs Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Latest <span className="text-[#4CAF50]">Agro News</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest agricultural trends, tips, and success
            stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Card 1 */}
          <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop"
                alt="Modern Farming Techniques"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-[#4CAF50] text-white px-3 py-1 rounded-full text-xs font-semibold">
                Farming Tips
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
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
                <span>November 10, 2024</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#4CAF50] transition-colors">
                Modern Farming Techniques for Better Yield
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Discover how technology and innovative practices are
                revolutionizing agriculture and helping farmers increase their
                productivity.
              </p>
              <button className="text-[#4CAF50] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Read More
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </article>

          {/* Blog Card 2 */}
          <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop"
                alt="Organic Farming"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-[#4CAF50] text-white px-3 py-1 rounded-full text-xs font-semibold">
                Organic
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
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
                <span>November 8, 2024</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#4CAF50] transition-colors">
                The Rise of Organic Farming in Bangladesh
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Learn about the growing trend of organic farming and how it's
                creating new opportunities for farmers across the country.
              </p>
              <button className="text-[#4CAF50] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Read More
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </article>

          {/* Blog Card 3 */}
          <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&h=400&fit=crop"
                alt="Market Trends"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-[#4CAF50] text-white px-3 py-1 rounded-full text-xs font-semibold">
                Market Trends
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
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
                <span>November 5, 2024</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#4CAF50] transition-colors">
                Understanding Crop Price Fluctuations
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Expert insights on market dynamics and strategies to maximize
                profits during different seasons and market conditions.
              </p>
              <button className="text-[#4CAF50] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Read More
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </article>
        </div>

        <div className="text-center mt-12">
          <NavLink to="/blogs" className="btn-outline">
            View All Articles
          </NavLink>
        </div>
      </section>

      {/* Success Stories / Testimonials Section */}
      <section className="bg-linear-to-b from-[#F8FFF8] to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
              Farmer <span className="text-[#4CAF50]">Success Stories</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real stories from farmers who transformed their business with
              KrishiLink
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#4CAF50]"
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
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-lg">
                    Rahul Hasan
                  </h4>
                  <p className="text-gray-600 text-sm">Rice Farmer, Bogura</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#FFD700]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "KrishiLink helped me sell directly to buyers and earn 30%
                  more profit. The platform is easy to use and connects me with
                  serious buyers from across the region."
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#4CAF50]"
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
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-lg">
                    Fatima Begum
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Vegetable Farmer, Jessore
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#FFD700]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "I was able to expand my business and reach customers in Dhaka
                  through KrishiLink. No middlemen, better prices, and quick
                  transactions!"
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#4CAF50]"
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
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-lg">
                    Kamal Ahmed
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Grain Farmer, Dinajpur
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#FFD700]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "Simple, efficient, and reliable. KrishiLink made it easy to
                  showcase my wheat crops and connect with bulk buyers. Highly
                  recommend!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-linear-to-r from-[#4CAF50] to-[#2E7D32] rounded-3xl p-12 md:p-16 text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Agricultural Business?
            </h2>
            <p className="text-[#E8F5E9] text-lg md:text-xl mb-8 leading-relaxed">
              Join thousands of farmers and buyers who are already growing their
              business with KrishiLink. Start listing your crops today and
              connect with buyers nationwide!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#4CAF50] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Register for Free
              </NavLink>
              <NavLink
                to="/all-crops"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#4CAF50] transition-all duration-200"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Explore Listings
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
