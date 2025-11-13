import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation links for logged-out users
  const publicLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#4CAF50] font-semibold border-b-2 border-[#4CAF50] px-3 py-2 transition-all duration-300"
              : "text-[#1A1A1A] hover:text-[#4CAF50] px-3 py-2 transition-all duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-crops"
          className={({ isActive }) =>
            isActive
              ? "text-[#4CAF50] font-semibold border-b-2 border-[#4CAF50] px-3 py-2 transition-all duration-300"
              : "text-[#1A1A1A] hover:text-[#4CAF50] px-3 py-2 transition-all duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          All Crops
        </NavLink>
      </li>
    </>
  );

  // Navigation links for logged-in users
  const privateLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#4CAF50] font-semibold border-b-2 border-[#4CAF50] px-3 py-2 transition-all duration-300"
              : "text-[#1A1A1A] hover:text-[#4CAF50] px-3 py-2 transition-all duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-crops"
          className={({ isActive }) =>
            isActive
              ? "text-[#4CAF50] font-semibold border-b-2 border-[#4CAF50] px-3 py-2 transition-all duration-300"
              : "text-[#1A1A1A] hover:text-[#4CAF50] px-3 py-2 transition-all duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          All Crops
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text-[#4CAF50] font-semibold border-b-2 border-[#4CAF50] px-3 py-2 transition-all duration-300"
              : "text-[#1A1A1A] hover:text-[#4CAF50] px-3 py-2 transition-all duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-crops"
          className={({ isActive }) =>
            isActive
              ? "text-[#4CAF50] font-semibold border-b-2 border-[#4CAF50] px-3 py-2 transition-all duration-300"
              : "text-[#1A1A1A] hover:text-[#4CAF50] px-3 py-2 transition-all duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Add Crops
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-posts"
          className={({ isActive }) =>
            isActive
              ? "text-[#4CAF50] font-semibold border-b-2 border-[#4CAF50] px-3 py-2 transition-all duration-300"
              : "text-[#1A1A1A] hover:text-[#4CAF50] px-3 py-2 transition-all duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          My Posts
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-interests"
          className={({ isActive }) =>
            isActive
              ? "text-[#4CAF50] font-semibold border-b-2 border-[#4CAF50] px-3 py-2 transition-all duration-300"
              : "text-[#1A1A1A] hover:text-[#4CAF50] px-3 py-2 transition-all duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          My Interests
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 font-[Poppins,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#1A1A1A]">
                  Krishi
                </span>
                <span className="text-2xl font-bold text-[#4CAF50]">Link</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              {user ? privateLinks : publicLinks}
            </ul>
          </div>

          {/* Right Side - Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* User Avatar */}
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User avatar"}
                      className="w-10 h-10 rounded-full border-2 border-[#4CAF50] object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#A5D6A7] flex items-center justify-center text-[#1A1A1A] font-semibold border-2 border-[#4CAF50]">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </div>
                {/* Logout Button */}
                <button onClick={handleLogout} className="btn-outline btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/login" className="btn-outline btn-sm">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn-primary btn-sm">
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-[#1A1A1A] hover:text-[#4CAF50] focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                // Close Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col space-y-1 px-4 py-4">
            {user ? privateLinks : publicLinks}
          </ul>

          {/* Mobile Auth Section */}
          <div className="px-4 py-3 border-t border-gray-200">
            {user ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-10 h-10 rounded-full border-2 border-[#4CAF50] object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#A5D6A7] flex items-center justify-center text-[#1A1A1A] font-semibold border-2 border-[#4CAF50]">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </div>
                <button onClick={handleLogout} className="btn-outline w-full">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <NavLink
                  to="/login"
                  className="btn-outline w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn-primary w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
