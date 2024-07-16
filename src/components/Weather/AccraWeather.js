// components/Weather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WiThermometer, WiStrongWind, WiCloudy, WiBarometer, WiHumidity, WiSunrise, WiSunset } from 'react-icons/wi';
import { FaTemperatureHigh, FaEye } from 'react-icons/fa';

const AccraWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Accra,GH&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        setWeatherData(weatherResponse.data);

        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Accra,GH&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        setForecastData(forecastResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    main: { temp, feels_like, humidity, pressure, temp_min, temp_max },
    weather,
    wind: { speed },
    visibility,
    sys: { sunrise, sunset },
  } = weatherData;

  const weatherCondition = weather[0];
  const forecastList = forecastData.list.slice(0, 5); // Get the first 5 forecast entries

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className=" md:p-8 font-sans bg-cover bg-center"
      style={{ backgroundImage: "url('https://media.istockphoto.com/id/697120006/photo/amazing-cloudscape-on-the-sky.jpg?s=612x612&w=0&k=20&c=6GK5lZu6xbOpVBNw4tnyoMiu_O8JrD6Et1-TM2b6dqg=')" }}
    >
      <div className="max-w-screen-xl mx-auto bg-white bg-opacity-20 rounded-lg p-2 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-5xl font-bold text-blue-800">{name}, GH</h1>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="p-3 rounded-full bg-blue-800 text-white shadow-md">°C</button>
            <button className="p-3 rounded-full bg-blue-800 text-white shadow-md">°F</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-8xl font-bold text-blue-800">{temp.toFixed(1)}°</div>
          <div className="text-3xl text-blue-600">{weatherCondition.main}</div>
        </div>
        <div className="text-lg mb-6 text-blue-800">Updated as of {new Date().toLocaleTimeString()}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-blue-800">
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-40">
            <WiThermometer className="text-3xl" />
            <div>
              Feels Like: <span className="font-bold">{feels_like.toFixed(1)}°</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-40">
            <WiStrongWind className="text-3xl" />
            <div>
              Wind: <span className="font-bold">{speed} km/h</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-40">
            <FaEye className="text-3xl" />
            <div>
              Visibility: <span className="font-bold">{visibility / 1000} km</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-40">
            <WiBarometer className="text-3xl" />
            <div>
              Barometer: <span className="font-bold">{pressure} mb</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-40">
            <WiHumidity className="text-3xl" />
            <div>
              Humidity: <span className="font-bold">{humidity}%</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-40">
            <WiSunrise className="text-3xl" />
            <div>
              Sunrise: <span className="font-bold">{formatTime(sunrise)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-40">
            <WiSunset className="text-3xl" />
            <div>
              Sunset: <span className="font-bold">{formatTime(sunset)}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {forecastList.map((forecast, index) => (
            <div key={index} className="bg-blue-700 p-4 rounded-lg text-center text-white shadow-lg bg-opacity-40">
              <div className="text-xl font-bold">{new Date(forecast.dt * 1000).toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' })}</div>
              <div className="text-6xl md:text-10xl text-yellow-400 my-2 flex items-center justify-center">
                <WiCloudy />
              </div>
              <div className="text-lg">{forecast.main.temp_max.toFixed(1)}° / {forecast.main.temp_min.toFixed(1)}°</div>
              <div className="text-md">{forecast.weather[0].main}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccraWeather;
