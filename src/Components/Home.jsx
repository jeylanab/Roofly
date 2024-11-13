import React from 'react';
import home from '../Assets/home.mp4';
import searchIcon from "../Assets/search-icon.svg"
import check from "../Assets/check.svg";
import hero from "../Assets/hero-image1.png"
import location from "../Assets/location.svg"
import bed from "../Assets/bed.svg"
import buy from "../Assets/buy.svg"



export const Home = () => {
  return (
    // container of the whole hero section
    <div className="">
      <div className='hero-container'>
        {/* container of the hero text and image for large screen */}
        <div className='hero-info-container hidden lg:flex  justify-around items-center my-10'>
          <div className='hero-text flex flex-col w-1/2 mr-5'>
            <h1 className='hero-header text-7xl leading-tight'>Your Future, Your Home, Your Roofly</h1>
            <p className='hero-sub-header text-xl '>Roofly combines powerful tech and personalized listings to bring  you closer to your next home, wherever you are.</p>
          </div>
          <div className='hero-image w-1/2'>
           <img src={hero} alt="image of the house" />
          </div>
        </div>
        
        {/* container of hero texts and the image for small screen */}
        <div className='lg:hidden flex flex-col justify-center items-center '>
          <div className=''>
           <img className='' src={hero} alt="image of the house" />
          </div>
          {/* text div of the hero section */}
          <div className=' text-start my-8'>
            <h1 className='text-4xl'>Your Future, Your Home, Your Roofly</h1>
            <p className=' text-md  my-3'>Roofly combines powerful tech and personalized listings to bring  you closer to your next home, wherever you are.</p>
          </div>
        </div>
        
        
        {/* container of the search section on the home page only display on large screen */}
        <div className='hero-input-container lg:flex hidden justify-center items-center text-xl'>
          <div className='border flex'>
            <div className='flex flex-col mx-5'>
              <label className='opacity-60 text-green-600 flex '> <img src={location} alt="location icon" className='px-1' /> <p>Location</p> </label>
              <input className='px-3' type="text" placeholder='Choose location' />
            </div>
            <div className='flex flex-col mx-10'>
              <label className='opacity-60 text-green-600 flex '> <img src={buy} alt="bed icon" className='px-1' /> <p>Rental/Buy</p> </label>
              <select>
                  <option value="1 Bed" key="1">Rental</option>
                  <option value="1 Bed" key="1">Buy</option>
              </select>
            </div>
            <div className='flex flex-col mx-10'>
              <label className='opacity-60 text-green-600 flex '> <img src={bed} alt="bed icon" className='px-1' /> <p>Room</p> </label>
              <select>
                  <option value="1" key="1">1 Bed</option>
                  <option value="1" key="2">2 Bed</option>
                  <option value="1" key="3">3 Bed</option>
              </select>
            </div>
           
            <input  className=' bg-black text-white rounded-lg px-10 mx-10 text-xl' type="submit" value='Search' />
          </div>
        
        </div>
        {/* search item only for small screen */}
        
        <div className='lg:hidden'>
          <div className='mx-5 flex justify-center items-center'>
            <div className=''>
              <label className='opacity-60 text-green-600 flex '> <img src={location} alt="location icon"  /> <p className='ml-1'>Location</p> </label>
              <input  type="text" placeholder='Choose location' />
            </div>
            <div className='flex flex-col mx-2'>
              <label className='opacity-60 text-green-600 flex '> <img src={buy} alt="home icon"  /> <p className='ml-1'>Home</p> </label>
              <select >
                  <option value="1 Bed" key="1">Rental</option>
                  <option value="1 Bed" key="1">Buy</option>
              </select>
            </div>
            <div className='flex flex-col '>
              <label className='opacity-60 text-green-600 flex '> <img src={bed} alt="bed icon"  /> <p className='ml-1'>Room</p> </label>
              <select>
                  <option value="1" key="1">1 Bed</option>
                  <option value="1" key="2">2 Bed</option>
                  <option value="1" key="3">3 Bed</option>
              </select>
            </div>
           
          </div>
          <input  className=' bg-black text-white rounded-lg w-full py-3 text-2xl my-2 ' type="submit" value='Search' />
        
        </div>
        
      </div>      
    </div>
  );
}
