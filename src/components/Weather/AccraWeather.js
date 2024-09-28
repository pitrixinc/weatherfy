// components/Weather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    WiThermometer,
    WiStrongWind,
    WiCloudy,
    WiBarometer,
    WiHumidity,
    WiSunrise,
    WiSunset,
    WiDaySunny,
    WiNightClear,
    WiDayCloudy,
    WiRain,
  } from 'react-icons/wi';
import { FaTemperatureHigh, FaEye } from 'react-icons/fa';
import WeatherBlog from './weatherBlog';




const AccraWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Tesano,Dwahenya,GH&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        setWeatherData(weatherResponse.data);

        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Tesano,Dwahenya,GH&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        setForecastData(forecastResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=weather+Dwahenya&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`);
        setNews(newsResponse.data.articles);
      } catch (error) {
        console.error('Error fetching weather news:', error);
      }
    };


    fetchWeatherData();
    fetchNews();
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

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny className="text-yellow-500" />;
      case 'Clouds':
        return <WiDayCloudy className="text-gray-500" />;
      case 'Rain':
        return <WiRain className="text-blue-500" />;
      case 'Snow':
        return <WiSnow className="text-blue-300" />;
      case 'Thunderstorm':
        return <WiThunderstorm className="text-purple-600" />;
      case 'Drizzle':
        return <WiRaindrops className="text-blue-400" />;
      default:
        return <WiCloudy className="text-gray-400" />;
    }
  };
  
  return (
    <div
      className=" md:p-8 font-sans"
    >
      
      <div className="max-w-screen-xl mx-auto bg-white bg-opacity-20 rounded-lg p-2 md:p-8 shadow-lg">
       
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {forecastList.map((forecast, index) => (
          <div key={index} className="bg-blue-700 p-4 rounded-lg text-center text-white shadow-lg bg-opacity-40">
            <div className="text-xl font-bold">{new Date(forecast.dt * 1000).toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' })}</div>
            <div className="text-md font-semibold">{formatTime(forecast.dt)}</div> {/* Add this line to display time */}
            <div className="text-6xl md:text-10xl my-2 flex items-center justify-center">
              {getWeatherIcon(forecast.weather[0].main)}
            </div>

            <div className="text-lg">{forecast.main.temp_max.toFixed(1)}° / {forecast.main.temp_min.toFixed(1)}°</div>
            <div className="text-md">{forecast.weather[0].main}</div>
          </div>
        ))}

        </div>
        <WeatherBlog />
      </div>
    </div>
  );
};

export default AccraWeather;
