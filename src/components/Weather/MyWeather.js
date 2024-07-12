import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTemperatureHigh, FaWind, FaTint, FaEye, FaThermometerHalf, FaCloudSun, FaArrowUp, FaSun } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const MyWeather = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_API_KEY}`);
        const [latitude, longitude] = response.data.loc.split(',');
        setLocation({ latitude, longitude });
      } catch (error) {
        setError('Error fetching location data.');
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location.latitude},${location.longitude}`
          );
          setWeatherData(response.data);
          setLoading(false);
        } catch (error) {
          setError('Error fetching weather data.');
          setLoading(false);
        }
      };
      fetchWeatherData();
    }
  }, [location]);

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="my-weather-container bg-gradient-to-r from-blue-0 to-blue-0 md:p-6 p-1 md:rounded-lg rounded-sm shadow-lg hover:shadow-xl transform hover:scale-99 transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">You live in {weatherData.location.country}</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-1">
        {weatherData && (
          <>
            <div className="weather-item flex items-center bg-cover bg-center p-4 rounded-lg shadow-md relative"
              style={{ backgroundImage: `url('https://www.eff.org/files/banner_library/locational-privacy.jpg')` }}>
              <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
              <FaCloudSun className="text-4xl text-yellow-500 mr-4 z-10" />
              <div className="z-10">
                <p className="text-lg font-semibold text-white">Location</p>
                <span className="block text-md text-white">{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</span>
              </div>
            </div>
            <div className="weather-item flex items-center bg-cover bg-center p-4 rounded-lg shadow-md relative"
              style={{ backgroundImage: `url('https://newsnetwork.mayoclinic.org/n7-mcnn/7bcc9724adf7b803/uploads/2020/03/shutterstock_763301095_101F_Fotor-16x9-1-1024x576.jpg')` }}>
              <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
              <FaTemperatureHigh className="text-4xl text-red-500 mr-4 z-10" />
              <div className="z-10">
                <p className="text-lg font-semibold text-white">Temperature</p>
                <span className="block text-md text-white">{weatherData.current.temp_c}°C</span>
              </div>
            </div>
            <div className="weather-item flex items-center bg-cover bg-center p-4 rounded-lg shadow-md relative"
              style={{ backgroundImage: `url('https://assets.ltkcontent.com/images/6225/standing-in-rain_27c5571306.jpg')` }}>
              <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
              <FaThermometerHalf className="text-4xl text-blue-500 mr-4 z-10" />
              <div className="z-10">
                <p className="text-lg font-semibold text-white">Condition</p>
                <span className="block text-md text-white">{weatherData.current.condition.text}</span>
              </div>
            </div>
            <div className="weather-item flex items-center bg-cover bg-center p-4 rounded-lg shadow-md relative"
              style={{ backgroundImage: `url('https://undark.org/wp-content/uploads/2020/04/humid-scaled.jpg')` }}>
              <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
              <FaTint className="text-4xl text-green-500 mr-4 z-10" />
              <div className="z-10">
                <p className="text-lg font-semibold text-white">Humidity</p>
                <span className="block text-md text-white">{weatherData.current.humidity}%</span>
              </div>
            </div>
            <div className="weather-item flex items-center bg-cover bg-center p-4 rounded-lg shadow-md relative"
              style={{ backgroundImage: `url('https://www.fondriest.com/news/wp-content/uploads/2010/08/wind_speed_direction-1.jpg')` }}>
              <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
              <FaWind className="text-4xl text-purple-500 mr-4 z-10" />
              <div className="z-10">
                <p className="text-lg font-semibold text-white">Wind Speed</p>
                <span className="block text-md text-white">{weatherData.current.wind_kph} kph</span>
              </div>
            </div>
            <div className="weather-item flex items-center bg-cover bg-center p-4 rounded-lg shadow-md relative"
              style={{ backgroundImage: `url('https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/wind/wind-sock-in-a-windy-sky.jpg')` }}>
              <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
              <FaArrowUp className="text-4xl text-orange-500 mr-4 z-10" />
              <div className="z-10">
                <p className="text-lg font-semibold text-white">Wind Direction</p>
                <span className="block text-md text-white">{weatherData.current.wind_dir}</span>
              </div>
            </div>
            <div className="weather-item flex items-center bg-cover bg-center p-4 rounded-lg shadow-md relative"
              style={{ backgroundImage: `url('https://cdn-wordpress-info.futurelearn.com/wp-content/uploads/74c301d0-ba17-4eff-93ec-8da7ab8079e1-754x495.jpg.optimal.jpg')` }}>
              <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
              <FaThermometerHalf className="text-4xl text-indigo-500 mr-4 z-10" />
              <div className="z-10">
                <p className="text-lg font-semibold text-white">Pressure</p>
                <span className="block text-md text-white">{weatherData.current.pressure_mb} mb</span>
              </div>
            </div>
            <div className="weather-item flex items-center bg-cover bg-center p-4 rounded-lg shadow-md relative"
              style={{ backgroundImage: `url('https://www.gulf-times.com/uploads/imported_images/Upload/Slider/220221592639408511049.jpg')` }}>
              <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
              <FaEye className="text-4xl text-teal-500 mr-4 z-10" />
              <div className="z-10">
                <p className="text-lg font-semibold text-white">Visibility</p>
                <span className="block text-md text-white">{weatherData.current.vis_km} km</span>
              </div>
            </div>
            <div className="weather-item flex items-center bg-cover bg-center p-4 rounded-lg shadow-md relative"
              style={{ backgroundImage: `url('https://cancerqld.org.au/wp-content/uploads/2019/10/19074-EHS_Sun_Protection_Home-Page-banner_2.jpg')` }}>
              <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
              <FaSun className="text-4xl text-yellow-700 mr-4 z-10" />
              <div className="z-10">
                <p className="text-lg font-semibold text-white">UV Index</p>
                <span className="block text-md text-white">{weatherData.current.uv}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MyWeather), {
  ssr: false,
});
