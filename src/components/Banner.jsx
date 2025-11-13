import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
      tagline: "Connecting Farmers, Traders & Consumers",
      heading: "Empowering Agriculture Through Digital Connection",
      description:
        "KrishiLink brings together the entire agricultural community in one powerful digital platform. Connect, collaborate, and grow together.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2080&auto=format&fit=crop",
      tagline: "From Farm to Market",
      heading: "Direct Access to Quality Crops",
      description:
        "Browse verified listings, connect with trusted farmers, and discover fresh agricultural products at competitive prices.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop",
      tagline: "Building Sustainable Futures",
      heading: "Join the Agricultural Revolution",
      description:
        "Be part of a growing network that's transforming traditional farming through technology, transparency, and trust.",
    },
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[90vh] md:h-[85vh] overflow-hidden font-[Poppins,sans-serif]">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.tagline}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-[#A5D6A7]/70 md:from-white/90 md:via-white/70 md:to-[#A5D6A7]/60"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-6 md:px-12 lg:px-20 xl:px-32">
              <div className="max-w-3xl text-center md:text-left animate-fadeIn">
                {/* Tagline */}
                <p className="text-[#4CAF50] text-sm md:text-base font-semibold uppercase tracking-wider mb-3 md:mb-4 opacity-0 animate-slideDown">
                  {slide.tagline}
                </p>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-4 md:mb-6 opacity-0 animate-slideUp">
                  {slide.heading.split("Digital Connection").length > 1 ? (
                    <>
                      {slide.heading.split("Digital Connection")[0]}
                      <span className="text-[#4CAF50]">Digital Connection</span>
                    </>
                  ) : slide.heading.split("Quality Crops").length > 1 ? (
                    <>
                      {slide.heading.split("Quality Crops")[0]}
                      <span className="text-[#4CAF50]">Quality Crops</span>
                    </>
                  ) : slide.heading.split("Agricultural Revolution").length >
                    1 ? (
                    <>
                      {slide.heading.split("Agricultural Revolution")[0]}
                      <span className="text-[#4CAF50]">
                        Agricultural Revolution
                      </span>
                    </>
                  ) : (
                    slide.heading
                  )}
                </h1>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8 max-w-2xl opacity-0 animate-fadeIn animation-delay-300">
                  {slide.description}
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 opacity-0 animate-slideUp animation-delay-500">
                  <NavLink
                    to="/all-crops"
                    className="btn-primary text-center transform hover:scale-105 transition-transform duration-300"
                  >
                    Explore Crops
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#4CAF50] group-hover:text-[#2E7D32]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#4CAF50] group-hover:text-[#2E7D32]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-10 h-3 bg-[#4CAF50]"
                : "w-3 h-3 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
          Scroll
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-[#4CAF50]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
