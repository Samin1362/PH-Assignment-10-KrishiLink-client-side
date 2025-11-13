import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-white to-[#F8FFF8] px-6 py-12 font-[Poppins,sans-serif]">
      {/* Animated Illustration */}
      <div className="mb-8 animate-fadeIn">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Agricultural themed 404 illustration */}
          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full animate-float"
          >
            {/* Sun */}
            <circle cx="320" cy="50" r="30" fill="#FFA726" opacity="0.8" />

            {/* Hills/Background */}
            <ellipse
              cx="200"
              cy="250"
              rx="180"
              ry="60"
              fill="#A5D6A7"
              opacity="0.3"
            />
            <ellipse
              cx="250"
              cy="260"
              rx="150"
              ry="50"
              fill="#81C784"
              opacity="0.3"
            />

            {/* Main plant/wheat stalks forming "4" */}
            <g transform="translate(50, 120)">
              <path
                d="M20 150 Q20 80 40 40 L35 45 M40 40 L45 45"
                stroke="#4CAF50"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <ellipse
                cx="40"
                cy="30"
                rx="8"
                ry="15"
                fill="#4CAF50"
                opacity="0.8"
              />
              <ellipse
                cx="40"
                cy="50"
                rx="7"
                ry="13"
                fill="#4CAF50"
                opacity="0.7"
              />
              <ellipse
                cx="40"
                cy="70"
                rx="6"
                ry="11"
                fill="#4CAF50"
                opacity="0.6"
              />
            </g>

            {/* "0" as a sun/seed */}
            <g transform="translate(180, 120)">
              <circle
                cx="20"
                cy="80"
                r="40"
                stroke="#4CAF50"
                strokeWidth="5"
                fill="none"
              />
              <circle cx="20" cy="80" r="30" fill="#A5D6A7" opacity="0.3" />
              <circle cx="15" cy="75" r="3" fill="#4CAF50" />
              <circle cx="25" cy="75" r="3" fill="#4CAF50" />
              <path
                d="M15 90 Q20 95 25 90"
                stroke="#4CAF50"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Another plant forming "4" */}
            <g transform="translate(280, 120)">
              <path
                d="M20 150 Q20 80 40 40 L35 45 M40 40 L45 45"
                stroke="#4CAF50"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <ellipse
                cx="40"
                cy="30"
                rx="8"
                ry="15"
                fill="#4CAF50"
                opacity="0.8"
              />
              <ellipse
                cx="40"
                cy="50"
                rx="7"
                ry="13"
                fill="#4CAF50"
                opacity="0.7"
              />
              <ellipse
                cx="40"
                cy="70"
                rx="6"
                ry="11"
                fill="#4CAF50"
                opacity="0.6"
              />
            </g>

            {/* Ground line */}
            <line
              x1="0"
              y1="270"
              x2="400"
              y2="270"
              stroke="#81C784"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Error Code */}
      <div className="text-center mb-6 animate-slideUp">
        <h1 className="text-7xl md:text-9xl font-bold text-[#1A1A1A] opacity-0 animate-slideUp">
          4<span className="text-[#4CAF50]">0</span>4
        </h1>
      </div>

      {/* Error Message */}
      <div className="text-center mb-8 max-w-lg opacity-0 animate-fadeIn animation-delay-300">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved. It
          seems like this field hasn't been planted yet! 🌾
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 opacity-0 animate-slideUp animation-delay-500">
        <NavLink to="/" className="btn-primary text-center min-w-[180px]">
          <span className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Back Home
          </span>
        </NavLink>

        <button
          onClick={handleGoBack}
          className="btn-outline text-center min-w-[180px]"
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </span>
        </button>
      </div>

      {/* Help Text */}
      <div className="text-center opacity-0 animate-fadeIn animation-delay-700">
        <p className="text-sm text-gray-500 mb-2">
          Need assistance? We're here to help!
        </p>
        <NavLink
          to="/contact"
          className="text-sm text-[#4CAF50] hover:text-[#2E7D32] font-medium transition-colors duration-300 underline"
        >
          Contact Support
        </NavLink>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20"
        >
          <path
            d="M0,0 C300,80 600,80 900,40 C1050,20 1150,60 1200,80 L1200,120 L0,120 Z"
            fill="#A5D6A7"
          />
        </svg>
      </div>
    </div>
  );
};

export default ErrorPage;
