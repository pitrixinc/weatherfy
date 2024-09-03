import React from 'react'
import TheWeatherResult from '../components/Weather/TheWeatherResult'
import NavBar from '@/components/Weather/NavBar/NavBar'

const WeatherResult = () => {
  return (
    <div>
        <NavBar/>
        <main>
          <TheWeatherResult/>
        </main>
    </div>
  )
}

export default WeatherResult