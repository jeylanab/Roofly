import React from 'react';
import home from '../asset/home.mp4'; // Replace with your video file path

export const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover" 
        autoPlay 
        loop 
        muted
      >
        <source src={home} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      <div className='relative text-white z-10 flex items-center justify-around h-full'>
        <h1 className='text-4xl'>Home</h1>
        <input type="text" />
      </div>
    </div>
  );
}
