import { useState } from 'react';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import countryList from 'react-select-country-list';
import Link from 'next/link';
import { RiHome4Line } from "react-icons/ri";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FiHeadphones } from "react-icons/fi";
import { MdOutlineHomeRepairService } from "react-icons/md";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchLocation) {
      window.location.href = `/weather-result?location=${searchLocation}`;
    }
  };

  const handleCountryClick = (country) => {
    window.location.href = `/weather-result?location=${country}`;
  };

  const countries = countryList().getLabels();

  return (
    <>
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
          <Link href="/" className='flex'>
                  <img className="w-auto md:h-10 h-8 sm:h-7" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="logo" />
                  <span className='p-1 md:p-2 font-semibold text-gray-600'>Weatherfy</span>
                </Link>
{/*
                <div className="hidden mx-10 md:block">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <BsSearch className="w-5 h-5 text-gray-400" />
                    </span>
                    <form onSubmit={handleSearch}>
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                        placeholder="Search location"
                      />
                    </form>
                  </div>
                </div>
  */}
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
            } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
            <div className='flex items-center'>
              <RiHome4Line className='text-lg' />
              <Link href="/" className="px-1 py-2 mr-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
            </div>
            <div className='flex items-center'>
              <MdOutlinePeopleAlt className='text-lg' />
              <Link href="/about-us" className="px-1 py-2 mr-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">About Us</Link>
              </div>
              <div className='flex items-center'>
              <FiHeadphones className='text-lg' />
              <Link href="/contact-us" className="px-1 py-2 mr-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Contact Us</Link>
              </div>
              <div className='flex items-center'>
              <MdOutlineHomeRepairService className='text-lg' />
              <Link href="/services" className="px-1 py-2 mr-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Services</Link>
            </div>
            </div>

{/*
            <div className="flex items-center mt-4 lg:mt-0">
              <button
                className="hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                aria-label="show notifications"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    className="object-cover w-full h-full"
                    alt="avatar"
                  />
                </div>
                <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">Khatab wedaa</h3>
              </button>
            </div>
*/}
{/*
            <div className="my-4 md:hidden">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <BsSearch className="w-5 h-5 text-gray-400" />
                  </span>
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                      placeholder="Search a location"
                    />
                  </form>
                </div>
              </div>
*/}

          </div>
        </div>

{/*
        <div className="py-3 mt-3 -mx-3 overflow-y-auto whitespace-nowrap scroll-hidden">
            {countries.map((country, index) => (
              <a
                key={index}
                className="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
                href="#"
                onClick={() => handleCountryClick(country)}
              >
                {country}
              </a>
            ))}
          </div>
            */}

      </div>
    </nav>






{/*
    <div className="sticky">
      <nav className="relative bg-cover bg-center shadow dark:bg-gray-800">
        <div className="container px-6 py-3 mx-auto bg-white bg-opacity-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className='flex'>
                  <img className="w-auto md:h-10 h-8 sm:h-7" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="logo" />
                  <span className='p-1 md:p-2 font-semibold text-gray-600'>Weatherfy</span>
                </Link>

                <div className="hidden mx-10 md:block">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <BsSearch className="w-5 h-5 text-gray-400" />
                    </span>
                    <form onSubmit={handleSearch}>
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                        placeholder="Search location"
                      />
                    </form>
                  </div>
                </div>
              </div>

              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  {!isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className={`absolute inset-x-0 z-20 w-full px-6 py-2 transition-all duration-300 ease-in-out bg-white top-24 dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
            <div className="flex flex-col md:flex-row md:mx-1">
              <div className='flex items-center'>
              <RiHome4Line className='text-md' />
              <Link className="my-2 text-md font-semibold leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mr-4 md:ml-1 md:my-0" href="/">
                  Home
                </Link>
              </div>
              <div className='flex items-center'>
              <MdOutlinePeopleAlt className='text-md'/>
                <Link className="my-2 text-md font-semibold leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mr-4 md:ml-1 md:my-0" href="/about-us">
                  About Us
                </Link>
                </div>
                <div className='flex items-center'>
                <FiHeadphones className='text-md' />
                <Link className="my-2 text-md font-semibold leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underlinemd:mr-4 md:ml-1 md:my-0" href="/contact-us">
                  Contact Us
                </Link>
                </div>
                <div className='flex items-center md:ml-3'>
                <MdOutlineHomeRepairService className='text-md' />
                <Link className="my-2 text-md font-semibold leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mr-4 md:ml-1 md:my-0" href="/services">
                  Services
                </Link>
                </div>
              </div>

              <div className="my-4 md:hidden">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <BsSearch className="w-5 h-5 text-gray-400" />
                  </span>
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                      placeholder="Search a location"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
{/*
          <div className="py-3 mt-3 -mx-3 overflow-y-auto whitespace-nowrap scroll-hidden">
            {countries.map((country, index) => (
              <a
                key={index}
                className="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
                href="#"
                onClick={() => handleCountryClick(country)}
              >
                {country}
              </a>
            ))}
          </div>
            
        </div>
      </nav>
    </div>
            */}
    </>
  );
}
