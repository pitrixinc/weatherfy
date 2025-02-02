import { useState } from 'react';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import countryList from 'react-select-country-list';
import Link from 'next/link';
import { RiHome4Line } from 'react-icons/ri';
import { MdOutlineHomeRepairService, MdOutlinePeopleAlt } from 'react-icons/md';
import { FiHeadphones } from 'react-icons/fi';

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
    <div className="sticky">
      <nav className="relative bg-cover bg-center shadow dark:bg-gray-800">
        <div className="container px-6 py-3 mx-auto bg-opacity-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <Link href="/" className='flex'>
                  <img className="w-auto md:h-10 h-8 sm:h-7" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="logo" />
                  <span className='p-1 md:p-2 font-semibold text-gray-600 outline-none'>Weatherfy</span>
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
{/*
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
              */}
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
            */}
        </div>
      </nav>
    </div>
  );
}
