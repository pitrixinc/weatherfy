import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const RadarMap = ({ latitude, longitude }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');

      const map = L.map('radar-map').setView([latitude, longitude], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
      }).addTo(map);

      L.tileLayer(`https://{s}.tile.openweathermap.org/map/radar/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`, {
        attribution: ''
      }).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [latitude, longitude]);

  return <div id="radar-map" className="w-full h-96 mt-5"></div>;
};

export default dynamic(() => Promise.resolve(RadarMap), {
  ssr: false
});
