import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { addProperty, updateProperty, deleteProperty, getProperties } from '../firebase/config';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export const Admin = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    imageUrl: '',
    propertyType: 'Apartment',
    status: 'For Sale',
    sellerName: '',
    sellerEmail: '',
    sellerPhone: ''
  });

  // Redirect if not admin
  if (!user || user.email !== 'admin@example.com') {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const fetchedProperties = await getProperties();
      setProperties(fetchedProperties);
    } catch (error) {
      setError('Failed to fetch properties');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyData = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        sqft: Number(formData.sqft)
      };

      if (editingProperty) {
        await updateProperty(editingProperty.id, propertyData);
      } else {
        await addProperty(propertyData);
      }

      setIsModalOpen(false);
      setEditingProperty(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        imageUrl: '',
        propertyType: 'Apartment',
        status: 'For Sale',
        sellerName: '',
        sellerEmail: '',
        sellerPhone: ''
      });
      fetchProperties();
    } catch (error) {
      setError('Failed to save property');
      console.error('Error:', error);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      imageUrl: property.imageUrl,
      propertyType: property.propertyType,
      status: property.status,
      sellerName: property.sellerName || '',
      sellerEmail: property.sellerEmail || '',
      sellerPhone: property.sellerPhone || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(propertyId);
        fetchProperties();
      } catch (error) {
        setError('Failed to delete property');
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Property Management</h1>
        <button
          onClick={() => {
            setEditingProperty(null);
            setFormData({
              title: '',
              description: '',
              price: '',
              location: '',
              bedrooms: '',
              bathrooms: '',
              sqft: '',
              imageUrl: '',
              propertyType: 'Apartment',
              status: 'For Sale',
              sellerName: '',
              sellerEmail: '',
              sellerPhone: ''
            });
            setIsModalOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Property
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-lg font-bold">
                £{property.price.toLocaleString()}
                {property.status === 'For Rent' ? '/month' : ''}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(property)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(property.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingProperty ? 'Edit Property' : 'Add Property'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  rows="3"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Square Feet</label>
                  <input
                    type="number"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  >
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Seller Name</label>
                    <input
                      type="text"
                      name="sellerName"
                      value={formData.sellerName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Seller Email</label>
                    <input
                      type="email"
                      name="sellerEmail"
                      value={formData.sellerEmail}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Seller Phone</label>
                    <input
                      type="tel"
                      name="sellerPhone"
                      value={formData.sellerPhone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  {editingProperty ? 'Update' : 'Add'} Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
