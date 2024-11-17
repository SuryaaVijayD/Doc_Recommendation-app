import React from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { useState } from 'react'

function Navbar() {
    return (
        <nav className="shadow p-4  z-10 bg-white w-full">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden md:flex items-center gap-2 text-black text-2xl font-bold">
                    <img src="https://res.cloudinary.com/dvp9gkjpk/image/upload/v1731849989/Doctor-logo_odl01q.png" className='w-[50px] h-[40px]' />
                    <h1 className='text-3xl'>CCIFMHIT</h1>
                </div>
                <div className='hidden md:flex'>
                    <input type="text" className='border-2 w-[350px] px-5 py-2 border-gray-800 rounded-l-2xl' placeholder='Enter Search element' />
                    <button className='rounded-r-2xl bg-[#5772B1] text-white px-4 py-2'><FaSearch /></button>
                </div>
                <div className="hidden md:flex space-x-10">

                    <a href="#" className="text-black-300 hover:text-blue-600">Contact</a>
                </div>
            </div>
            <div className='md:hidden text-center font-bold flex items-center justify-center'>
                <img src="https://res.cloudinary.com/dvp9gkjpk/image/upload/v1731849989/Doctor-logo_odl01q.png" className='w-[40px] h-[30px]' />
                <h1 className='text-2xl'>CCIFMHIT</h1>
            </div>
        </nav>
    )
}

export default Navbar