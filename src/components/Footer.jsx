import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-2 border-[#A5D6A7] mt-16 font-[Poppins,sans-serif]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Logo & About Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">
                <span className="text-[#1A1A1A]">Krishi</span>
                <span className="text-[#4CAF50]">Link</span>
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Connecting farmers, traders, and consumers in one digital space
              for sustainable growth and collaboration.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:support@krishilink.com"
                className="hover:text-[#4CAF50] transition-colors duration-300"
              >
                support@krishilink.com
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-base font-semibold text-[#1A1A1A] mb-4 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <NavLink
                  to="/"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all-crops"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  All Crops
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-crops"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Add Crops
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-posts"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  My Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-interests"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  My Interests
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-base font-semibold text-[#1A1A1A] mb-4 uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <NavLink
                  to="/blogs"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Agro News & Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/how-it-works"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  How It Works
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/terms"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Terms & Conditions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/privacy"
                  className="text-sm text-gray-600 hover:text-[#4CAF50] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Social & Contact Section */}
          <div>
            <h3 className="text-base font-semibold text-[#1A1A1A] mb-4 uppercase tracking-wide">
              Connect With Us
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Follow us on social media for updates, tips, and agricultural
              insights.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#A5D6A7]"></div>

      {/* Bottom Bar */}
      <div className="bg-linear-to-r from-white via-[#F8FFF8] to-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {currentYear}{" "}
              <span className="font-semibold text-[#4CAF50]">KrishiLink</span> —
              All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <NavLink
                to="/terms"
                className="hover:text-[#4CAF50] transition-colors duration-300"
              >
                Terms
              </NavLink>
              <span className="text-gray-400">•</span>
              <NavLink
                to="/privacy"
                className="hover:text-[#4CAF50] transition-colors duration-300"
              >
                Privacy
              </NavLink>
              <span className="text-gray-400">•</span>
              <NavLink
                to="/contact"
                className="hover:text-[#4CAF50] transition-colors duration-300"
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
