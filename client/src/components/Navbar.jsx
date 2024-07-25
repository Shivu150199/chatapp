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
    <div className="flex-none">
      <button className="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
        </svg>
      </button>
    </div>
  </div>
  )
}

export default Navbar