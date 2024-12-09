import React, { useState } from 'react';
import axios from 'axios';
import home from '../Assets/home.mp4';
import hero from "../Assets/hero-image1.png";
import loc from "../Assets/location.svg";
import bed from "../Assets/bed.svg";
import buy from "../Assets/buy.svg";
import { Services } from '../Pages/Services';
import { House } from './House';
import bd from "../Assets/bd.svg"
import bath from "../Assets/bath.svg"
import lc from "../Assets/lc.svg"
import { useNavigate } from 'react-router-dom';


// Load environment variables

const API_URL = 'https://zoopla.p.rapidapi.com/properties/v2/list';
const API_KEY = '206f5fabb5mshd6a12f5f0fefd42p122a88jsn651b1c6c0620';
const HOST = 'zoopla.p.rapidapi.com';

export const Home = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  // Fetch properties from the API
  const fetchProperties = async (location) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(API_URL, {
        params: {
          locationValue: location,
          page: '2',
        },
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': HOST,
        },
      });

      const result = response.data.data.listings.regular;
      setResults(result); 
      console.log("Properties:", result);
    } catch (err) {
      console.error("Error fetching properties:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      alert("Please enter a location.");
      return;
    }
    fetchProperties(location);
  };
  
    const handleCardClick = (property) => {
    navigate(`/property/${property.listingId}`, { state: { property } });
  };

  return (
    <div className="">
    <div className="hero-container animate-fadeIn">
      {/* Hero Section - Large Screens */}
      <div className="hero-info-container hidden lg:flex justify-around items-center my-10">
        <div className="hero-text flex flex-col w-1/2 mr-5 animate-slideInLeft">
          <h1 className="hero-header text-7xl leading-tight">
            Your Future, Your Home, Your Roofly
          </h1>
          <p className="hero-sub-header text-xl">
            Roofly combines powerful tech and personalized listings to bring you closer to your next home, wherever you are.
          </p>
        </div>
        <div className="hero-image w-1/2 animate-slideInRight">
          <img src={hero} alt="House" />
        </div>
      </div>

      {/* Hero Section - Small Screens */}
      <div className="lg:hidden flex flex-col justify-center items-center animate-fadeIn">
        <div>
          <img src={hero} alt="House" />
        </div>
        <div className="text-start my-8">
          <h1 className="text-4xl">Your Future, Your Home, Your Roofly</h1>
          <p className="text-md my-3">
            Roofly combines powerful tech and personalized listings to bring you closer to your next home, wherever you are.
          </p>
        </div>
      </div>

      {/* Search Section - Large Screens */}
      <div className="hero-input-container lg:flex hidden justify-center items-center text-xl animate-slideInUp">
        <div className="border flex">
          <div className="flex flex-col mx-5">
            <label className="opacity-60 text-green-600 flex">
              <img src={loc} alt="Location icon" className="px-1" />
              <p>Location</p>
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-3"
              type="text"
              placeholder="Choose location"
            />
          </div>
          <div className="flex flex-col mx-10">
            <label className="opacity-60 text-green-600 flex">
              <img src={buy} alt="Buy icon" className="px-1" />
              <p>Rental/Buy</p>
            </label>
            <select>
              <option value="Rental" key="1">Rental</option>
              <option value="Buy" key="2">Buy</option>
            </select>
          </div>
          <div className="flex flex-col mx-10">
            <label className="opacity-60 text-green-600 flex">
              <img src={bed} alt="Bed icon" className="px-1" />
              <p>Room</p>
            </label>
            <select>
              <option value="1 Bed" key="1">1 Bed</option>
              <option value="2 Bed" key="2">2 Bed</option>
              <option value="3 Bed" key="3">3 Bed</option>
            </select>
          </div>

          <input
            className="bg-black text-white rounded-lg px-10 mx-10 text-xl hover:scale-105 transition duration-300"
            type="submit"
            onClick={handleSubmit}
            value="Search"
          />
        </div>
      </div>

      {/* Search Section - Small Screens */}
      <div className="lg:hidden animate-slideInUp">
        <div className="flex justify-center items-center">
          <div className="w-40 mx-3">
            <label className="opacity-60 text-green-600 flex">
              <img src={loc} alt="Location icon" />
              <p className="ml-1">Location</p>
            </label>
              <input
                type="text"
                value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-3"
  
              placeholder="Choose location"
               />
          </div>
          <div className="flex flex-col mx-2">
            <label className="opacity-60 text-green-600 flex">
              <img src={buy} alt="Buy icon" />
              <p className="ml-1">Home</p>
            </label>
            <select>
              <option value="Rental" key="1">Rental</option>
              <option value="Buy" key="2">Buy</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="opacity-60 text-green-600 flex">
              <img src={bed} alt="Bed icon" />
              <p className="ml-1">Room</p>
            </label>
            <select>
              <option value="1 Bed" key="1">1 Bed</option>
              <option value="2 Bed" key="2">2 Bed</option>
              <option value="3 Bed" key="3">3 Bed</option>
            </select>
          </div>
        </div>
        <input
          className="bg-black text-white rounded-lg w-full py-3 text-2xl my-2 hover:scale-105 transition duration-300"
          type="submit"
            onClick={handleSubmit}
            value="Search"
        />
      </div>
    </div>

<div className="results-container my-10">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {results.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Properties:</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((property) => (
                <li
                  key={property.listingId}
                  className="relative my-5 cursor-pointer"
                  onClick={() => handleCardClick(property)}
                >
                  <img
                    src={property.imageUris?.[0] || 'https://via.placeholder.com/150'}
                    alt={property.title}
                    className="rounded-md mb-4 w-full h-72 object-cover"
                  />
                  <div className='border bg-white shadow-sm w-[90%] absolute bottom-[-15px] left-5'>
                    <div className='flex justify-between items-top'>
                      <h3 className="text-lg font-bold ">{property.title}</h3>
                      <p className="text-xl text-lime-500 font-bold">
                        {property.pricing.label || "Price not available"}
                      </p>
                    </div>
                    <div className='flex justify-start items-start'>
                      <img src={lc} alt="location" />
                      <p className="text-gray-600">{property.address}</p>
                    </div>
                    <div className='flex justify-between text-lg items-center'>
                      <div className='flex'>
                        <img src={bath} alt="" /> <p className='mx-2'>{property.attributes.bathrooms} {property.attributes.bathrooms === 1 ? "bath" : "baths"} </p>
                      </div>
                      <div className='flex'>
                        <img src={bd} alt="" /> <p className='mx-2'>{property.attributes.bedrooms} {property.attributes.bedrooms === 1 ? "bed" : "beds"}</p>
                      </div>
                      <p className="text-sm text-lime-500">
                        {property.flag || "No special tag"}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !loading && <p>No properties found.</p>
        )}
      </div>

      {/* Services and House Components */}
      <Services />
      <House />
    </div>
  );
};
