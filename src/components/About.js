import React from 'react'
import { useRouter } from 'next/router';

const About = () => {
    const router = useRouter();
    const handleSearch = () => {
          router.push(`/`);
      };
  return (
    <div>
        <header class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-16 mx-auto">
        <div class="items-center lg:flex">
            <div class="w-full lg:w-1/2">
                <div class="lg:max-w-lg">
                    <h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">About <span class="text-blue-500 ">Weatherfy</span></h1>
                    
                    <p class="mt-3 text-gray-600 dark:text-gray-400">
                    We strive for excellence in all aspects of our work, from data collection and analysis to customer service. 
                    Our team is dedicated to maintaining the highest quality standards and delivering superior results.
                    </p>
                    
                    <button  onClick={handleSearch} class="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Get Started</button>
                </div>
            </div>

            <div class="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <img class="w-full h-full lg:max-w-3xl" src="https://merakiui.com/images/components/Catalogue-pana.svg" alt="Catalogue-pana.svg"/>
            </div>
        </div>
    </div>
</header>
    </div>
  )
}

export default About