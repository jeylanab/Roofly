import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching property listings from the provided API endpoint
  useEffect(() => {
    const fetchProperties = async () => {
      const options = {
        method: 'GET',
        url: 'https://bayut.p.rapidapi.com/properties/list',
        params: {
          locationExternalIDs: '5002,6020', // Location IDs (can be adjusted for your needs)
          purpose: 'for-rent',               // Property for rent
          hitsPerPage: '25',                 // Number of properties per page
          page: '0',                         // Page number
          lang: 'en',                        // Language (English)
          sort: 'city-level-score',          // Sorting criteria
          rentFrequency: 'monthly',          // Rent frequency
          categoryExternalID: '4'            // Category ID (can be adjusted)
        },
        headers: {
          'x-rapidapi-key': '206f5fabb5mshd6a12f5f0fefd42p122a88jsn651b1c6c0620', // API Key
          'x-rapidapi-host': 'bayut.p.rapidapi.com'                            // Host
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data); // Log the response data to check image structure
        setProperties(response.data.hits); // Assuming the property data is in 'hits'
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch property listings");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Property Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property) => {
            const imageUrl = property.cover_photo?.url
              ? property.cover_photo.url
              : 'https://via.placeholder.com/500x300?text=No+Image'; // Fallback image URL

            return (
              <div
                key={property.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-200"
              >
                <img
                  src={imageUrl}
                  alt={property.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">{property.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{property.description}</p>
                  <div className="mt-3 text-green-600 font-bold">
                    {property.price ? `AED ${property.price.toLocaleString()}` : "N/A"}
                  </div>
                  <div className="mt-3 text-gray-700">
                    <strong>Location: </strong>{property.location?.city}, {property.location?.area}
                  </div>
                  <div className="mt-3 text-gray-700">
                    <strong>Size: </strong>{property.area} sq ft
                  </div>
                  <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-green-700">
                    View More Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
