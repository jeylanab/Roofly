import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { Navigate } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaTimes } from 'react-icons/fa';
import { getProperties } from '../firebase/config';

export const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const fetchedProperties = await getProperties({ status: 'For Sale' });
        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const isPropertyFavorite = (propertyId) => {
    return favorites.some(fav => fav.propertyId === propertyId);
  };

  const handleFavoriteToggle = async (property) => {
    try {
      if (isPropertyFavorite(property.id)) {
        await removeFavorite(property.id);
      } else {
        await addFavorite(property.id, property);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Properties for Sale</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => handleFavoriteToggle(property)}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isPropertyFavorite(property.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600'
                } hover:scale-110 transition-transform`}
              >
                <FaHeart />
              </button>
              <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 rounded">
                {property.status}
              </div>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
              <p className="text-gray-600 mb-2">${property.price.toLocaleString()}</p>
              <div className="flex items-center text-gray-500 mb-4">
                <FaMapMarkerAlt className="mr-1" />
                <span>{property.location}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 mb-4">
                <div className="flex items-center">
                  <FaBed className="mr-1" />
                  <span>{property.bedrooms} beds</span>
                </div>
                <div className="flex items-center">
                  <FaBath className="mr-1" />
                  <span>{property.bathrooms} baths</span>
                </div>
                <div className="flex items-center">
                  <FaRulerCombined className="mr-1" />
                  <span>{property.sqft} sqft</span>
                </div>
              </div>
              <button
                onClick={() => handleViewDetails(property)}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Property Details Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedProperty.title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="mb-6">
              <img
                src={selectedProperty.imageUrl}
                alt={selectedProperty.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-2xl font-bold text-blue-600 mb-4">
                ${selectedProperty.price.toLocaleString()}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <FaBed className="mr-2 text-gray-600" />
                  <span>{selectedProperty.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <FaBath className="mr-2 text-gray-600" />
                  <span>{selectedProperty.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <FaRulerCombined className="mr-2 text-gray-600" />
                  <span>{selectedProperty.sqft} sqft</span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  {selectedProperty.location}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{selectedProperty.description}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Additional Features</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedProperty.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              {selectedProperty.sellerName && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-4">Contact Seller</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Name:</span> {selectedProperty.sellerName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span>{' '}
                      <a href={`mailto:${selectedProperty.sellerEmail}`} className="text-blue-600 hover:underline">
                        {selectedProperty.sellerEmail}
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span>{' '}
                      <a href={`tel:${selectedProperty.sellerPhone}`} className="text-blue-600 hover:underline">
                        {selectedProperty.sellerPhone}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
