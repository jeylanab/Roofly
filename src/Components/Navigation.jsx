import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import menuList from "../constant/index.js"; // Assuming your menu list is here
import { FaBars, FaTimes } from "react-icons/fa";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* Navigation Bar (only for large screens) */}
      <div className="lg:flex hidden items-center justify-between">
        <div className="logo-container flex items-center">
          {/* Logo */}
          <h1 className="text-4xl font-semibold">Roofly</h1>
        </div>

        {/* Menu Links */}
        <ul className="list-none flex justify-center items-center text-xl">
          {menuList.map((menu) => (
            <li className="mx-5" key={menu.id}>
              <Link to={menu.path} className="hover:text-gray-500">
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign In / Sign Up Buttons */}
        <div className="flex justify-center items-center text-lg">
          <Link to="/login">
            <p className="mx-3">Sign In</p>
          </Link>
          <Link to="/signup">
            <button className="bg-black text-white rounded-lg px-10 text-xl px-5 py-3 text-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Navigation Bar (only for small screens) */}
      <div className="lg:hidden flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-3xl font-semibold">Roofly</h1>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl focus:outline-none"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white absolute top-0 left-0 w-full h-screen z-10">
          <div className="flex items-center justify-between p-4">
            {/* Logo */}
            <h1 className="text-3xl font-semibold">Roofly</h1>

            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <ul className="list-none flex flex-col items-center justify-center text-xl space-y-6 mt-10">
            {menuList.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  className="hover:text-gray-500"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center mt-8 space-y-4">
            <Link to="/login">
              <p className="text-lg">Sign In</p>
            </Link>
            <Link to="/signup">
              <button className="bg-black text-white rounded-lg px-10 text-xl py-3">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
