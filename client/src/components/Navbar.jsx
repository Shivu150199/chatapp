import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 sticky top-0 z-10 shadow-lg mb-2">
    <div className="flex-1">
    <h1 className="tracking-wider font-bold  flex items-center justify-start gap-4">
          <span className=" p-2 w-full h-[3rem] rounded button font-extrabold bg-teal-700 flex items-center justify-center">
            Chat
          </span>{' '}
          <span>App</span>
        </h1>
    </div>
 
  </div>
  )
}

export default Navbar