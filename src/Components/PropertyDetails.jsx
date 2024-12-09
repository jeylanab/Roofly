import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const PropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;

  if (!property) {
    return <p>No property details available.</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 px-4 py-2 rounded-md mb-4 hover:bg-gray-400 transition"
      >
        Go Back
      </button>

      {/* Image Gallery */}
      <div className="flex justify-center flex-wrap gap-4">
        {property.imageUris.map((img, index) => (
          <img
            key={index}
            src={img || 'https://via.placeholder.com/300'}
            alt={property.title || 'Property Image'}
            className="rounded-md w-full sm:w-1/2 lg:w-1/4 h-64 object-cover"
          />
        ))}
      </div>

      {/* Property Details Section */}
      <div className="bg-black text-white p-6 rounded-md mt-6 max-w-4xl mx-auto md:flex md:flex-wrap md:gap-4">
        <h1 className="text-3xl font-bold mb-4 w-full">{property.title}</h1>

        <p className="text-lg mb-2 w-full sm:w-1/2">
          <span className="bg-white text-black rounded-md px-4 py-1 inline-block">Price</span>{' '}
          {property.pricing.label || 'Not available'}
        </p>

        <p className="text-lg mb-2 w-full sm:w-1/2">
          <span className="bg-white text-black rounded-md px-4 py-1 inline-block">Location</span>{' '}
          {property.address}
        </p>

        <p className="text-lg mb-2 w-full sm:w-1/2">
          <span className="bg-white text-black rounded-md px-4 py-1 inline-block">Call ☎️</span>{' '}
          {property.agent.phone}
        </p>

        <p className="text-lg mb-2 w-full sm:w-1/2">
          <span className="bg-white text-black rounded-md px-4 py-1 inline-block">Bathrooms</span>{' '}
          {property.attributes.bathrooms}
        </p>

        <p className="text-lg mb-2 w-full sm:w-1/2">
          <span className="bg-white text-black rounded-md px-4 py-1 inline-block">Bedrooms</span>{' '}
          {property.attributes.bedrooms}
        </p>

        <p className="text-lg text-lime-500 w-full sm:w-1/2">
          <span className="bg-white text-black rounded-md px-4 py-1 inline-block">Tag</span>{' '}
          {property.flag || 'None'}
        </p>
      </div>
    </div>
  );
};
