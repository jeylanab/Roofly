import React from 'react';
import logo from "../asset/logo.svg";
import menuList from '../constant';
import home from '../asset/home.mp4';

export const Navigation = () => {
  return (
    <div className=''>
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
      
      {/* Navigation bar only for large screen */}
      <div className='menu-container-large lg:flex hidden items-center justify-between mx-10 relative z-10 text-slate-50'>
        <div className='logo-container flex items-center'>
          {/* display the logo of the company */}
          <img src={logo} alt="roofly logo" />
        </div>
        {/* map through the menuList object to display the menu items */}
        <ul className='list-none flex justify-center items-center text-lg'>
          {menuList.map((menu) => {
            return <li className='mx-5' key={menu.id}>{menu.title}</li>;
          })}
        </ul>
        <div className='flex justify-center items-center text-lg'>
          <p className='mx-3'>Sign In</p>
          <button className='btn-one px-5 py-1 text-black'>Sign Up</button>
        </div>
      </div>
      </div>
    </div>
  );
};

