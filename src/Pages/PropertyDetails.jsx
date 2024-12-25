import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaArrowLeft } from 'react-icons/fa';
import { getPropertyById } from '../firebase/config';

export const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const propertyData = await getPropertyById(id);
        if (propertyData) {
          setProperty(propertyData);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to fetch property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 rounded">
            {property.status}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="text-2xl font-bold text-blue-600">
              £{property.price.toLocaleString()}
              {property.status === 'For Rent' ? '/month' : ''}
            </p>
          </div>

          <div className="flex items-center text-gray-600 mb-6">
            <FaMapMarkerAlt className="mr-2" />
            <span>{property.location}</span>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <FaBed className="text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="font-semibold">{property.bedrooms}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaBath className="text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="font-semibold">{property.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaRulerCombined className="text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Square Feet</p>
                <p className="font-semibold">{property.sqft}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {property.features && property.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="grid grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {property.sellerName && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Contact {property.status === 'For Rent' ? 'Landlord' : 'Seller'}
              </h2>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span> {property.sellerName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span>{' '}
                  <a
                    href={`mailto:${property.sellerEmail}`}
                    className="text-blue-600 hover:underline"
                  >
                    {property.sellerEmail}
                  </a>
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span>{' '}
                  <a
                    href={`tel:${property.sellerPhone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {property.sellerPhone}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
