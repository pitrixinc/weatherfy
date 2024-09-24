import React, { useState, useEffect }  from 'react'
import { useRouter } from 'next/router';


const images = [
  'https://media.newyorker.com/photos/5ca64e18c3abc815ad5e8522/master/pass/190415_r34085.jpg',
  'https://i0.wp.com/meta.eeb.org/wp-content/uploads/2021/01/AdobeStock_11334480-scaled.jpeg?fit=2560%2C1683&ssl=1',
  'https://www.bridgemi.com/sites/default/files/styles/full_width_image/public/hero_images/strawberrypickingshutterstock.jpg?itok=GG1g21w5',
  'https://portacool.com/wp-content/uploads/2021/05/farmworkers-scaled.jpg',
]

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (location) {
      router.push(`/weather-result?location=${location}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 10000) // Change image every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div class="w-full bg-center bg-cover h-[38rem]" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
        <div class="flex items-center justify-center w-full h-full bg-gray-900/40">
        <div class="container px-6 py-16 mx-auto text-center">
        <div class="max-w-lg mx-auto">
            <h1 class="text-3xl font-semibold text-white dark:text-white lg:text-6xl">Essential Weather Insights for Your Farming Success</h1>
            <p class="mt-6 text-white dark:text-gray-300 md:text-xl">Stay ahead with tailored forecasts to optimize your planting, harvesting, and daily farm activities.</p>
          {/*
            <button class="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
                Join Us Today
            </button>
  */}
            <div className="flex flex-col justify-center items-center mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <input
                  id="location"
                  type="text"
                  className="w-full px-5 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  Search
                </button>
              </div>
              
          {/*  <p class="mt-3 text-sm text-white ">No credit card required</p> */}
        </div>

        
    </div>
        </div>
    </div>
  )
}

export default Hero