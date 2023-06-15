import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()


  return <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between " aria-label="Global">
    <div className="flex items-center justify-between">
      <p className="flex-none cursor-pointer bg-clip-text bg-gradient-to-tr from-[#13ABC4] to-[#C1224F] text-transparent text-xl font-bold sm:text-2xl lg:text-3xl lg:leading-tight" onClick={() => navigate("/")}>
        PowerHub
      </p>
      <div className="sm:hidden">
        <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm" data-hs-collapse="#navbar-image-1" aria-controls="navbar-image-1" aria-label="Toggle navigation">
          <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
    </div>
    <div id="navbar-image-1" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full bg-[#C1224F] rounded-md max-w-[60rem]  grow sm:block ">
      <div className="flex flex-col gap-y-4 gap-x-0 mt-5 mb-5 md:mb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:px-7">
        <a className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer" href="#" aria-current="page">Home</a>
        <a className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer" href="#">Alumni's</a>
        <a className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer" href="#">Work</a>
        <a className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer" href="#">Blog</a>
        <a className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer" href="#">Login</a>
      </div>
    </div>
  </nav>
</header>

};

export default Header;
