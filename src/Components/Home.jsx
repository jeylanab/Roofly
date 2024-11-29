import React, { useState } from 'react';
import home from '../Assets/home.mp4';
import searchIcon from "../Assets/search-icon.svg";
import check from "../Assets/check.svg";
import hero from "../Assets/hero-image1.png";
import location from "../Assets/location.svg";
import bed from "../Assets/bed.svg";
import buy from "../Assets/buy.svg";
import PropertyList from './PropertyList';
import { Services } from '../Pages/Services';
import { House } from './House';
import axios from 'axios';

export const Home = () => {
  const [location, setLocation] = useState(''); // To capture user input
  const [results, setResults] = useState([]); // To store API results
  const [error, setError] = useState(null); // To handle API errors
  const [loading, setLoading] = useState(false); // To manage loading state
  const API_URL = 'https://zoopla.p.rapidapi.com/properties/v2/list';
  const API_KEY = '206f5fabb5mshd6a12f5f0fefd42p122a88jsn651b1c6c0620';
  const HOST = 'zoopla.p.rapidapi.com';

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}`, {
        params: {
          locationValue: location,
          page: '2',
        },
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': HOST,
        },
      });

      // Update state with the API response
      const result = response.data.data.listings.regular;
      setResults(result);
    } catch (err) {
      setError(err.message); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="">

      {/* Hero Section with fade-in animation */}
      <div className="hero-container animate-fadeIn">
        <div className="hero-info-container hidden lg:flex justify-around items-center my-10">
          <div className="hero-text flex flex-col w-1/2 mr-5 animate-slideInLeft">
            <h1 className="hero-header text-7xl leading-tight">Your Future, Your Home, Your Roofly</h1>
            <p className="hero-sub-header text-xl">Roofly combines powerful tech and personalized listings to bring you closer to your next home, wherever you are.</p>
          </div>
          <div className="hero-image w-1/2 animate-slideInRight">
            <img src={hero} alt="image of the house" />
          </div>
        </div>

        {/* Small screen version */}
        <div className="lg:hidden flex flex-col justify-center items-center animate-fadeIn">
          <div>
            <img src={hero} alt="image of the house" />
          </div>
          <div className="text-start my-8">
            <h1 className="text-4xl">Your Future, Your Home, Your Roofly</h1>
            <p className="text-md my-3">Roofly combines powerful tech and personalized listings to bring you closer to your next home, wherever you are.</p>
          </div>
        </div>

        {/* Search Section - Large screens */}
        <div className="hero-input-container lg:flex hidden justify-center items-center text-xl animate-slideInUp">
          <div className="border flex">
            <div className="flex flex-col mx-5">
              <label className="opacity-60 text-green-600 flex"> <img src={location} alt="location icon" className="px-1" /> <p>Location</p> </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-3"
                type="text"
                placeholder="Choose location"
              />
            </div>
            <div className="flex flex-col mx-10">
              <label className="opacity-60 text-green-600 flex"> <img src={buy} alt="bed icon" className="px-1" /> <p>Rental/Buy</p> </label>
              <select>
                <option value="Rental" key="1">Rental</option>
                <option value="Buy" key="2">Buy</option>
              </select>
            </div>
            <div className="flex flex-col mx-10">
              <label className="opacity-60 text-green-600 flex"> <img src={bed} alt="bed icon" className="px-1" /> <p>Room</p> </label>
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

        {/* Search Section - Small screens */}
        <div className="lg:hidden animate-slideInUp">
          <div className="flex justify-center items-center">
            <div className="w-40 mx-3">
              <label className="opacity-60 text-green-600 flex"> <img src={location} alt="location icon" /> <p className="ml-1">Location</p> </label>
              <input type="text" placeholder="Choose location" />
            </div>
            <div className="flex flex-col mx-2">
              <label className="opacity-60 text-green-600 flex"> <img src={buy} alt="home icon" /> <p className="ml-1">Home</p> </label>
              <select>
                <option value="Rental" key="1">Rental</option>
                <option value="Buy" key="2">Buy</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="opacity-60 text-green-600 flex"> <img src={bed} alt="bed icon" /> <p className="ml-1">Room</p> </label>
              <select>
                <option value="1 Bed" key="1">1 Bed</option>
                <option value="2 Bed" key="2">2 Bed</option>
                <option value="3 Bed" key="3">3 Bed</option>
              </select>
            </div>
          </div>
          <input className="bg-black text-white rounded-lg w-full py-3 text-2xl my-2 hover:scale-105 transition duration-300" type="submit" value="Search" />
        </div>
      </div>

      <Services />
      <House />
    </div>
  );
};

