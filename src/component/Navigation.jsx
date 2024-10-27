import React from 'react'
import logo from "../asset/logo.svg";
import menuList from '../constant';

export const Navigation = () => {
  return (
    <div>
      {/* display navigation menus only for large device  */}
      <div className='menu-container-large'>
        <div className='logo-container'>
          {/* display the logo of the company */}
           <img src={logo} alt="roofly logo" />
        </div>
        {/* map through the menulist object to display the menu items */}
        {menuList.map((menu) => {
         return <li key={menu.id}>{ menu.title }</li>
        })}
      </div>
    </div>
  )
}
