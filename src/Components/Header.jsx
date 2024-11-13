import React from 'react';
import homeVideo from '../asset/home.mp4'; // Import your video file

export const Header = () => {
  return (
    <div className="header">
      <video className="video-background" autoPlay loop muted>
        <source src={homeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className='z-20 relative'>Welcome to Our Real Estate Site</h1>
    </div>
  );
};
