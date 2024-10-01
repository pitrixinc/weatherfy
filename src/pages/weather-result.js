import React from 'react'
import TheWeatherResult from '../components/Weather/TheWeatherResult'
import NavBar from '@/components/Weather/NavBar/NavBar'

const WeatherResult = () => {
  return (
    <div className='bg-center bg-cover' style={{ backgroundImage: "url('/images/back1.jpeg')" }} >
        <NavBar/>
        <main>
          <TheWeatherResult/>
        </main>
    </div>
  )
}

export default WeatherResult