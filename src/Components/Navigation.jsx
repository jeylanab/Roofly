import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import menuList from "../constant/index.js";  // Assuming your menu list is here

export const Navigation = () => {
  return (
    <div>
      {/* Navigation Bar (only for large screens) */}
      <div className="lg:flex hidden items-center justify-between">
        <div className="logo-container flex items-center">
          {/* Logo */}
          <h1 className="text-3xl font-semibold">Roofly</h1>
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
    </div>
  );
};
