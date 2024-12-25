import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import PropTypes from 'prop-types';
import menuList from "../constant/index.js";
import { FaBars, FaTimes, FaUser, FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { logOut, updateUserProfile } from "../firebase/config";

const Logo = () => (
  <Link to={menuList[0].path}>
    <h1 className="font-semibold text-2xl xs:text-3xl lg:text-4xl">Roofly</h1>
  </Link>
);

const MenuLinks = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const isAdmin = user && user.email === 'admin@example.com';

  return (
    <ul className="hidden md:flex list-none justify-center items-center text-base lg:text-xl space-x-4 lg:space-x-6">
      {menuList.map((menu) => (
        <li className="mx-5" key={menu.id}>
          <Link 
            to={menu.path} 
            className="hover:text-gray-500 transition-colors duration-200"
          >
            {menu.title}
          </Link>
        </li>
      ))}
      {user && (
        <li className="mx-5">
          {isAdmin ? (
            <Link
              to="/admin"
              className="flex items-center hover:text-gray-500 transition-colors duration-200"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/favorites"
              className="flex items-center hover:text-gray-500 transition-colors duration-200"
            >
              <FaHeart className="mr-2" />
              Favorites
              {favorites.length > 0 && (
                <span className="ml-2 bg-black text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          )}
        </li>
      )}
    </ul>
  );
};

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');
  const [error, setError] = useState('');

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile({ displayName: newDisplayName });
      setIsEditing(false);
      setError('');
    } catch (error) {
      setError('Failed to update profile');
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center cursor-pointer space-x-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaUser className="text-gray-500" />
          )}
        </div>
        <span>{user?.displayName || 'User'}</span>
      </div>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
        {isEditing ? (
          <div className="px-4 py-2">
            <input
              type="text"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              className="w-full px-2 py-1 border rounded"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm text-gray-500 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="text-sm text-black"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit Profile
            </button>
            <Link
              to="/favorites"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Favorites
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const AuthButtons = () => {
  const { user } = useAuth();

  if (user) {
    return <UserProfile />;
  }

  return (
    <div className="flex justify-center items-center">
      <Link to="/login">
        <p className="mx-3 text-lg hover:text-gray-500 transition-colors duration-200">Sign In</p>
      </Link>
      <Link to="/signup">
        <button className="bg-black text-white rounded-lg px-10 py-3 text-lg hover:bg-gray-800 transition-colors duration-200">
          Sign Up
        </button>
      </Link>
    </div>
  );
};

const MobileMenu = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const isAdmin = user && user.email === 'admin@example.com';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed inset-y-0 right-0 w-64 sm:w-80 bg-white shadow-lg z-50 overflow-y-auto">
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <ul className="mt-8 space-y-4">
            {menuList.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  className="block text-lg hover:text-gray-500 transition-colors duration-200"
                  onClick={onClose}
                >
                  {menu.title}
                </Link>
              </li>
            ))}
            {user && (
              isAdmin ? (
                <li>
                  <Link
                    to="/admin"
                    className="block text-lg hover:text-gray-500 transition-colors duration-200"
                    onClick={onClose}
                  >
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/favorites"
                    className="flex items-center text-lg hover:text-gray-500 transition-colors duration-200"
                    onClick={onClose}
                  >
                    <FaHeart className="mr-2" />
                    Favorites
                    {favorites.length > 0 && (
                      <span className="ml-2 bg-black text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                </li>
              )
            )}
            {user ? (
              <UserProfile />
            ) : (
              <div className="flex flex-col items-center space-y-4 mt-8">
                <Link to="/login" onClick={onClose}>
                  <p className="text-xl">Sign In</p>
                </Link>
                <Link to="/signup" onClick={onClose}>
                  <button className="bg-black text-white rounded-lg px-10 py-3 text-xl">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-4">
            <MenuLinks />
            {user ? <UserProfile /> : <AuthButtons />}
          </div>

          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(true)}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </nav>
  );
};
