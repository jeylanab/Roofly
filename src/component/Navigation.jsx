import React from 'react'
import logo from "../asset/logo.svg";
import menuList from '../constant';

export const Navigation = () => {
  return (
    <div>
      {/* display navigation menus only for large device  */}
      <div className='menu-container-large  lg:flex hidden items-center justify-between mx-10'>
        <div className='logo-container flex items-center'>
          {/* display the logo of the company */}
           <img src={logo} alt="roofly logo" />
        </div>
        {/* map through the menulist object to display the menu items */}
        <ul className='list-none flex justify-center items-center text-lg'>
          {menuList.map((menu) => {
         return <li className='mx-5' key={menu.id}>{ menu.title }</li>
          })}
        </ul>
        <div className='flex justify-center items-center text-lg'>
          <p className='mx-3'>Sign In</p>
          <button className='btn-one px-5 py-1 text-lg'>Sign Up</button>
        </div>
        
      </div>
    </div>
  )
}
