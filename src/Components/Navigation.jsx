import React from 'react'
import logo from "../Assets/logo.svg"
import menuList from "../constant/index.js"

export const Navigation = () => {
  return (
    <div>
      {/* display navigation menus only for large device  */}
      <div className=''>
      
       <div className='  lg:flex hidden items-center justify-between '>
         <div className='logo-container flex items-center'>
          {/* display the logo of the company */}
          <h1 className='text-3xl font-semibold'>Roofly</h1>
        </div>
        {/* map through the menulist object to display the menu items */}
        <ul className='list-none flex justify-center items-center  text-xl '>
          {menuList.map((menu) => {
         return <li className='mx-5' key={menu.id}>{ menu.title }</li>
          })}
        </ul>
        <div className='flex justify-center items-center text-lg'>
          <p className='mx-3'>Sign In</p>
          <button className='bg-black text-white rounded-lg px-10 text-xl px-5 py-3 text-lg'>Sign Up</button>
        </div>
        
        </div>
      </div>
    </div>
  )
}
