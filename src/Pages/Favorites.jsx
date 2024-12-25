import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { FaHeart, FaShare, FaEnvelope } from 'react-icons/fa';

export const Favorites = () => {
  const { favorites, loading, removeFavorite, shareViaEmail } = useFavorites();
  const { user } = useAuth();
  const [sharingEmail, setSharingEmail] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [error, setError] = useState('');

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  const handleShare = async (e) => {
    e.preventDefault();
    if (!sharingEmail) {
      setError('Please enter an email address');
      return;
    }
    try {
      await shareViaEmail(sharingEmail, selectedProperties);
      setShowShareModal(false);
      setSharingEmail('');
      setSelectedProperties([]);
      setError('');
    } catch (error) {
      setError('Failed to share properties');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Favorites</h1>
        {favorites.length > 0 && (
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FaShare className="mr-2" />
            Share Favorites
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No favorite properties yet</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div
              key={favorite.propertyId}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={favorite.propertyData.imageUrl || 'https://via.placeholder.com/400x300'}
                alt={favorite.propertyData.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{favorite.propertyData.title}</h3>
                <p className="text-gray-600 mb-2">{favorite.propertyData.location}</p>
                <p className="text-2xl font-bold mb-4">${favorite.propertyData.price.toLocaleString()}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => removeFavorite(favorite.propertyId)}
                    className="flex items-center text-red-500 hover:text-red-600 transition-colors"
                  >
                    <FaHeart className="mr-1" />
                    Remove
                  </button>
                  <Link
                    to={`/property/${favorite.propertyId}`}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Share Favorites</h2>
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            <form onSubmit={handleShare}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient's Email
                </label>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    id="email"
                    value={sharingEmail}
                    onChange={(e) => setSharingEmail(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowShareModal(false);
                    setSharingEmail('');
                    setError('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
