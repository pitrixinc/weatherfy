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


// News component styled
const NewsComponent = ({ articles }) => (
  <div className="bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-80 mt-8">
    <h2 className="text-2xl font-bold mb-4 text-blue-800">Live Weather News</h2>
    {articles.map((article, index) => (
      <div key={index} className="mb-4">
        <h3 className="text-xl font-bold text-blue-600">{article.title}</h3>
        <p className="text-blue-800">{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Read more
        </a>
      </div>
    ))}
  </div>
);


const AccraWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Tesano,Accra,GH&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        setWeatherData(weatherResponse.data);

        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Tesano,Accra,GH&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        setForecastData(forecastResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=weather+Tesano&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`);
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
        return <WiDaySunny className="text-8xl md:text-9xl text-yellow-500" />;
      case 'Clouds':
        return <WiDayCloudy className="text-8xl md:text-9xl text-white" />;
      case 'Rain':
        return <WiRain className="text-8xl md:text-9xl text-blue-700" />;
      default:
        return <WiCloudy className="text-8xl md:text-9xl text-white" />;
    }
  };

  return (
    <div
      className=" md:p-8 font-sans bg-cover bg-center"
      style={{ backgroundImage: "url('/images/back1.jpeg')" }}
    >
      <div className="max-w-screen-xl mx-auto bg-white bg-opacity-20 rounded-lg p-2 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mt-1">{name}, GH</h1>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="p-3 rounded-full bg-blue-800 text-white shadow-md">°C</button>
            <button className="p-3 rounded-full bg-blue-800 text-white shadow-md">°F</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {getWeatherIcon(weatherCondition.main)}
          <div className="text-4xl md:text-8xl font-bold text-yellow-500">{temp.toFixed(1)}°</div>
          <div className="text-3xl text-blue-600">{weatherCondition.main}</div>
        </div>
        <div className="text-lg mb-6 text-blue-900 text-center">Updated as of {new Date().toLocaleTimeString()}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-yellow-600">
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-80">
            <WiThermometer className="text-3xl" />
            <div>
              Feels Like: <span className="font-bold">{feels_like.toFixed(1)}°</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-80">
            <WiStrongWind className="text-3xl" />
            <div>
              Wind: <span className="font-bold">{speed} km/h</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-80">
            <FaEye className="text-3xl" />
            <div>
              Visibility: <span className="font-bold">{visibility / 1000} km</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-80">
            <WiBarometer className="text-3xl" />
            <div>
              Barometer: <span className="font-bold">{pressure} mb</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-80">
            <WiHumidity className="text-3xl" />
            <div>
              Humidity: <span className="font-bold">{humidity}%</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-80">
            <WiSunrise className="text-3xl" />
            <div>
              Sunrise: <span className="font-bold">{formatTime(sunrise)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 p-4 rounded-lg shadow-md bg-opacity-80">
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
        <WeatherBlog />
      </div>
    </div>
  );
};

export default AccraWeather;
