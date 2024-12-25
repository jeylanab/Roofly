import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProperties } from '../firebase/config';
import { FaTimes, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import hero from "../Assets/hero-image1.png";
import loc from "../Assets/location.svg";
import bed from "../Assets/bed.svg";
import buy from "../Assets/buy.svg";
import bd from "../Assets/bd.svg";
import bath from "../Assets/bath.svg";
import lc from "../Assets/lc.svg";

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('For Rent');
  const [bedrooms, setBedrooms] = useState('1');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch properties from Firebase with filters
  const fetchProperties = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const properties = await getProperties(filters);
      setResults(properties);
    } catch (err) {
      console.error("Error fetching properties:", err.message);
      setError("Failed to fetch properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission with filters
  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      ...(location && { location: location.trim() }),
      ...(propertyType && { status: propertyType }),
      ...(bedrooms && { bedrooms: parseInt(bedrooms) })
    };
    fetchProperties(filters);
  };

  const handleCardClick = (property) => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Hero Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-slideInLeft">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4">
              Your Future, Your Home, Your Roofly
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-600">
              Roofly combines powerful tech and personalized listings to bring you closer to your next home, wherever you are.
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="w-full lg:w-1/2 animate-slideInRight">
            <img src={hero} alt="House" className="w-full h-auto rounded-lg shadow-xl" />
          </div>
        </div>

        {/* Search Section */}
        {user && (
          <div className="mt-12">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Location Input */}
                  <div className="flex flex-col">
                    <label className="text-green-600 flex items-center mb-2">
                      <img src={loc} alt="Location icon" className="w-5 h-5 mr-2" />
                      <span>Location</span>
                    </label>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      type="text"
                      placeholder="Search India cities"
                    />
                  </div>

                  {/* Property Type Select */}
                  <div className="flex flex-col">
                    <label className="text-green-600 flex items-center mb-2">
                      <img src={buy} alt="Property type icon" className="w-5 h-5 mr-2" />
                      <span>Property Type</span>
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="For Rent">For Rent</option>
                      <option value="For Sale">For Sale</option>
                    </select>
                  </div>

                  {/* Bedrooms Select */}
                  <div className="flex flex-col">
                    <label className="text-green-600 flex items-center mb-2">
                      <img src={bed} alt="Bedrooms icon" className="w-5 h-5 mr-2" />
                      <span>Bedrooms</span>
                    </label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full mt-4 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search Properties'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Results Section */}
      {error && (
        <div className="container mx-auto px-4 mt-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((property) => (
              <div
                key={property.id}
                onClick={() => handleCardClick(property)}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaBed className="mr-1" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="mr-1" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <FaRulerCombined className="mr-1" />
                      <span>{property.area} sq.ft</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xl font-bold text-green-600">
                    ₹{property.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
