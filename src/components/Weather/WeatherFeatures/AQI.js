import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AQI = ({ location }) => {
  const [aqiData, setAqiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAqiData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
            q: location,
            aqi: 'yes'
          }
        });
        console.log('AQI API Response:', response.data); // Log the response data
        setAqiData(response.data);
      } catch (error) {
        console.error('Error fetching AQI data:', error);
        setError('Failed to fetch AQI data');
      }
    };

    if (location) {
      fetchAqiData();
    }
  }, [location]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!aqiData) {
    return <p>Loading AQI data...</p>;
  }

  const { pm2_5, pm10, no2, o3, so2, co } = aqiData.current.air_quality;

  return (
    <div className="aqi-container mt-5 bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Air Quality Index (AQI)</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <div className="aqi-item bg-green-200 p-4 rounded-lg text-center shadow-md">
        <p className="text-lg font-semibold text-gray-700">PM2.5</p>
        <span className="block text-md text-gray-600">{pm2_5.toFixed(1)} µg/m³</span>
      </div>
      <div className="aqi-item bg-green-300 p-4 rounded-lg text-center shadow-md">
        <p className="text-lg font-semibold text-gray-700">PM10</p>
        <span className="block text-md text-gray-600">{pm10.toFixed(1)} µg/m³</span>
      </div>
      <div className="aqi-item bg-green-400 p-4 rounded-lg text-center shadow-md">
        <p className="text-lg font-semibold text-gray-700">NO2</p>
        <span className="block text-md text-gray-600">{no2.toFixed(1)} µg/m³</span>
      </div>
      <div className="aqi-item bg-green-400 p-4 rounded-lg text-center shadow-md">
        <p className="text-lg font-semibold text-gray-700">O3</p>
        <span className="block text-md text-gray-600">{o3.toFixed(1)} µg/m³</span>
      </div>
      <div className="aqi-item bg-green-200 p-4 rounded-lg text-center shadow-md">
        <p className="text-lg font-semibold text-gray-700">SO2</p>
        <span className="block text-md text-gray-600">{so2.toFixed(1)} µg/m³</span>
      </div>
      <div className="aqi-item bg-green-300 p-4 rounded-lg text-center shadow-md">
        <p className="text-lg font-semibold text-gray-700">CO</p>
        <span className="block text-md text-gray-600">{co.toFixed(1)} µg/m³</span>
      </div>
    </div>
  </div>
  
  );
};

export default AQI;
