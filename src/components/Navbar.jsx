import React from 'react'

const Navbar = () => {
  return (
    <nav >
        <ul className='flex   justify-between p-4 bg-orange-600'>
            <li className='font-bold hover:cursor-pointer text-xl text-white'>TODODODODO</li>
            <li className='hover:font-bold hover:cursor-pointer w-28 md:flex justify-center transition-all hidden hover:bg-orange-800 rounded-lg text-white'>Home</li>
            <li className='hover:font-bold hover:cursor-pointer w-28 md:flex justify-center transition-all hidden hover:bg-orange-800 rounded-lg text-white'>About</li>
            <li className='hover:font-bold hover:cursor-pointer w-28 md:flex justify-center transition-all hidden hover:bg-orange-800 rounded-lg text-white'>Contact</li>
        </ul>
    </nav>
  )
}

export default Navbar
