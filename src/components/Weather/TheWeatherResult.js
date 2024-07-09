import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Modal from 'react-modal';
import Typewriter from 'typewriter-effect'; // Import Typewriter
import {
  WiThermometer,
  WiHumidity,
  WiBarometer,
  WiStrongWind,
  WiDaySunny,
  WiSunrise,
  WiSunset,
  WiRain,
  WiCloud,
  WiSnow,
  WiFog,
  WiRaindrop,
  WiDayCloudy,
  WiNightClear,
  WiNightCloudy,
} from 'react-icons/wi';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import TemperatureGraph from './Graphs/TemperatureGraph';
import WindSpeedGraph from './Graphs/WindSpeedGraph';
import HumidityGraph from './Graphs/HumidityGraph';
import PrecipitationGraph from './Graphs/PrecipitationGraph';

const TheWeatherResult = () => {
  const router = useRouter();
  const { location } = router.query;
  const [weatherData, setWeatherData] = useState(null);
  const [aiArticle, setAiArticle] = useState('');
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [typedArticle, setTypedArticle] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecastData, setForecastData] = useState(null);

  const headerMessages = [
    `Weather Result for ${location}`,
    `${location} Weather Update`,
    `Current Weather in ${location}`,
    `Latest Weather for ${location}`,
    `${location} Weather Report`,
    `Weather Details for ${location}`,
    `${location} Climate Overview`,
    `Today's Weather in ${location}`,
    `${location} Forecast`,
    `Weather Information for ${location}`,
  ]; 

  useEffect(() => {
    if (location) {
      fetchWeatherData();
      fetchAiContent();
      fetchHourlyForecast();
      fetchForecastData();
      fetchImages(); // Call fetchImages when location changes
    }
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );
      setWeatherData(response.data);
      setLatitude(response.data.coord.lat);
      setLongitude(response.data.coord.lon);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };
 


  const fetchHourlyForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );
      setHourlyForecast(response.data.list.slice(0, 24)); // Get 24 hours forecast
    } catch (error) {
      console.error('Error fetching hourly forecast:', error);
      setHourlyForecast([]);
    }
  };

  const fetchForecastData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}&days=7`
      );
      setForecastData(response.data.forecast.forecastday);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setForecastData(null);
    }
  };
 

  const fetchAiContent = async () => {
    try {
      const response = await axios.post('/api/generate-content', { location });
      const articleContent = response.data.article
        .split('\n')
        .filter((paragraph) => paragraph.trim() !== '');
      setAiArticle(articleContent);
    } catch (error) {
      console.error('Error generating AI content:', error);
      setAiArticle(['No weather information found in ' + location]);
    }
  };

  const fetchImages = async () => {
    const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
    const url = `https://api.pexels.com/v1/search?query=${location}&per_page=3`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: apiKey,
        },
      });
      if (response.data && response.data.photos && response.data.photos.length > 0) {
        setImages(response.data.photos.map(photo => photo.src.large));
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const stopTyping = () => {
    setIsTyping(false);
  };

  useEffect(() => {
    if (aiArticle.length > 0 && isTyping) {
      const typeNextParagraph = (index) => {
        if (index < aiArticle.length) {
          setTypedArticle((prev) => [...prev, aiArticle[index]]);
          setTimeout(() => typeNextParagraph(index + 1), 1000);
        } else {
          setIsTyping(false);
        }
      };
      typeNextParagraph(0);
    }
  }, [aiArticle, isTyping]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const formatParagraph = (paragraph) => {
    // Replace **text** with <strong>text</strong>
    return paragraph.split('**').map((text, index) => 
      index % 2 === 1 ? <strong key={index}>{text}</strong> : text
    );
  };

  const renderWeatherIcon = (icon) => {
    switch (icon) {
      case '01d':
        return <WiDaySunny className="text-4xl text-red-600 mr-2" />;
      case '01n':
        return <WiNightClear className="text-4xl text-black mr-2" />;
      case '02d':
      case '03d':
      case '04d':
        return <WiDayCloudy className="text-4xl text-gray-600 mr-2" />;
      case '02n':
      case '03n':
      case '04n':
        return <WiNightCloudy className="text-4xl text-blue-600 mr-2" />;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <WiRain className="text-4xl text-orange-600 mr-2" />;
      case '11d':
      case '11n':
        return <WiCloud className="text-4xl text-rose-600 mr-2" />;
      case '13d':
      case '13n':
        return <WiSnow className="text-4xl text-violet-600 mr-2" />;
      case '50d':
      case '50n':
        return <WiFog className="text-4xl text-brown-600 mr-2" />;
      default:
        return <WiDaySunny className="text-4xl text-indigo-600 mr-2"/>;
    }
  };

  const hourlyLabels = hourlyForecast.map((hour) =>
    new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  const temperatureData = hourlyForecast.map((hour) => hour.main.temp);
  const feelsLikeData = hourlyForecast.map((hour) => hour.main.feels_like);

  const chartData = {
    labels: hourlyLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Feels Like (°C)',
        data: feelsLikeData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto md:px-4 py-2 md:py-8">
      <Head>
        <title>Weather Result for {location}</title>
      </Head>
    {/*  <h1 className="md:text-3xl text-2xl p-2 font-bold mb-4">Weather Result for {location}</h1> */}
      
      <div className="mb-4 block md:hidden">
      {images.length > 0 && (
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={location}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white">
              <p className="font-semibold text-center tracking-widest">
                  <Typewriter
                    options={{
                      strings: headerMessages,
                      autoStart: true,
                      loop: true,
                    }}
                  /> 
                </p>
                {/* <span className="font-semibold tracking-widest">{location}</span> */}
              </div>
            </div>
          )}
          </div>

          <div className="block md:hidden h-[410px] overflow-y-auto">
        {/*  <h2 className="md:text-2xl text-xl p-2 font-bold">{location} Weather Article</h2> */}
          <div className="text-md ">
            {typedArticle.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-gray-700 bg-white p-4 rounded-sm shadow-md border border-gray-100 hover:bg-gray-50 transition duration-300 ease-in-out max-w-2xl mx-auto my-0 first-letter:text-lg first-letter:font-bold first-letter:text-gray-900 first-line:tracking-widest">
                {paragraph.startsWith('#') ? (
                  <strong>{paragraph.replace(/^#+\s*/, '')}</strong>
                ) : (
                  formatParagraph(paragraph)
                )}
              </p>
            ))}
            {isTyping && (
              <button
                onClick={stopTyping}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Stop Writing
              </button>
            )}
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="flex flex-col justify-between">
        <div className="mb-4 hidden md:block relative">
          {images.length > 0 && (
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={location}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white">
                <p className="font-semibold text-center tracking-widest">
                  <Typewriter
                    options={{
                      strings: headerMessages,
                      autoStart: true,
                      loop: true,
                    }}
                  /> 
                </p>
                {/* <span className="font-semibold tracking-widest">{location}</span> */}
              </div>
            </div>
          )}
        </div>

          <div className={`md:w-full ${modalIsOpen ? 'hidden' : ''}`}>
            <div onClick={openModal} className={`${latitude && longitude ? '' : 'cursor-not-allowed'}`}>
              {latitude && longitude && (
                <MapComponent latitude={latitude} longitude={longitude} location={location} />
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block md:row-span-2 h-[410px] md:h-[710px] overflow-y-auto">
        {/*  <h2 className="md:text-2xl text-xl p-2 font-bold">{location} Weather Article</h2> */}
          <div className="text-md ">
            {typedArticle.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-gray-700 bg-white p-4 rounded-sm shadow-md border border-gray-100 hover:bg-gray-50 transition duration-300 ease-in-out max-w-2xl mx-auto my-0 first-letter:text-lg first-letter:font-bold first-letter:text-gray-900 first-line:tracking-widest">
                {paragraph.startsWith('#') ? (
                  <strong>{paragraph.replace(/^#+\s*/, '')}</strong>
                ) : (
                  formatParagraph(paragraph)
                )}
              </p>
            ))}
            {isTyping && (
              <button
                onClick={stopTyping}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Stop Writing
              </button>
            )}
          </div>
        </div>
      </div>
<div className='h-[610px] overflow-y-auto'>
      {weatherData ? (
        <div className="bg-white shadow-md rounded-lg p-4 mt-8">
          <h2 className="md:text-2xl text-xl font-semibold mb-4">Current Weather Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiThermometer className="text-4xl text-blue-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Temperature</p>
                <p>Current: {weatherData.main.temp}°C</p>
                <p>Min: {weatherData.main.temp_min}°C, Max: {weatherData.main.temp_max}°C</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiThermometer className="text-4xl text-green-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Feels Like</p>
                <p>{weatherData.main.feels_like}°C</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiBarometer className="text-4xl text-yellow-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Pressure</p>
                <p>{weatherData.main.pressure} hPa</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiHumidity className="text-4xl text-purple-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Humidity</p>
                <p>{weatherData.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              {renderWeatherIcon(weatherData.weather[0].icon)}
              <div>
                <p className="text-sm font-semibold">Conditions</p>
                <p>{weatherData.weather[0].description}</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiCloud className="text-4xl text-indigo-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Cloudiness</p>
                <p>{weatherData.clouds.all}%</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiStrongWind className="text-4xl text-pink-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Wind</p>
                <p>{weatherData.wind.speed} m/s, {weatherData.wind.deg}°</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiRaindrop className="text-4xl text-teal-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Precipitation</p>
                <p>{weatherData.rain ? weatherData.rain['1h'] : '0'} mm</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiDaySunny className="text-4xl text-orange-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">UV Index</p>
                <p>{weatherData.uv_index || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiFog className="text-4xl text-gray-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Visibility</p>
                <p>{weatherData.visibility / 1000} km</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiSunrise className="text-4xl text-pink-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Sunrise</p>
                <p>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <WiSunset className="text-4xl text-purple-600 mr-2" />
              <div>
                <p className="text-sm font-semibold">Sunset</p>
                <p>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>

      ) : (
        <p className="text-xl">No weather information found in {location}</p>
      )}

{hourlyForecast.length > 0 && (
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Hourly Forecast</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hourlyForecast.map((hour, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-gray-700">
              {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <div className="flex justify-center items-center mb-2">
              {renderWeatherIcon(hour.weather[0].icon)}
              <p className="text-md text-gray-600 ml-2 capitalize">{hour.weather[0].description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="hourly-data-item bg-blue-100 p-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Temperature</p>
              <span className="block text-sm">{hour.main.temp}°C</span>
            </div>
            <div className="hourly-data-item bg-blue-200 p-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Feels Like</p>
              <span className="block text-sm">{hour.main.feels_like}°C</span>
            </div>
            <div className="hourly-data-item bg-blue-300 p-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Pressure</p>
              <span className="block text-sm">{hour.main.pressure} hPa</span>
            </div>
            <div className="hourly-data-item bg-blue-400 p-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Humidity</p>
              <span className="block text-sm">{hour.main.humidity}%</span>
            </div>
            <div className="hourly-data-item bg-blue-500 p-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Cloudiness</p>
              <span className="block text-sm">{hour.clouds.all}%</span>
            </div>
            <div className="hourly-data-item bg-blue-300 p-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Wind</p>
              <span className="block text-sm">{hour.wind.speed} m/s, {hour.wind.deg}°</span>
            </div>
            <div className="hourly-data-item bg-blue-400 p-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Visibility</p>
              <span className="block text-sm">{(hour.visibility / 1000).toFixed(1)} km</span>
            </div>
            <div className="hourly-data-item bg-blue-500 p-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Precipitation</p>
              <span className="block text-sm">{hour.rain ? hour.rain['1h'] : '0'} mm</span>
            </div>
            <div className="hourly-data-item bg-blue-300 p-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-700">Probability of Precipitation</p>
              <span className="block text-sm">{(hour.pop * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Temperature Graph</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg w-full h-[600px] flex items-center justify-center">
              <Line data={chartData} />
            </div>
          </div>
  </div>
)}
</div>


<div className='h-[610px] overflow-y-auto'>

              {forecastData && (
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">7-Day Forecast</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forecastData.map((day, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-center mb-4">
                      <p className="text-lg font-semibold text-gray-700">
                        {new Date(day.date).toLocaleDateString()}
                      </p>
                      <div className="flex justify-center items-center mb-2">
                        {renderWeatherIcon(day.day.condition.icon)}
                        <p className="text-md text-gray-600 ml-2 capitalize">{day.day.condition.text}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Temperature</p>
                        <span className="block text-sm">{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</span>
                      </div>
                      <div className="bg-green-200 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Humidity</p>
                        <span className="block text-sm">{day.day.avghumidity}%</span>
                      </div>
                      <div className="bg-green-300 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Wind Speed</p>
                        <span className="block text-sm">{day.day.maxwind_kph} kph</span>
                      </div>
                      <div className="bg-green-400 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Cloudiness</p>
                        <span className="block text-sm">{day.day.cloud}%</span>
                      </div>
                      <div className="bg-green-500 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Precipitation</p>
                        <span className="block text-sm">{day.day.totalprecip_mm} mm</span>
                      </div>
                      <div className="bg-green-300 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">UV Index</p>
                        <span className="block text-sm">{day.day.uv}</span>
                      </div>
                      <div className="bg-green-400 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Sunrise</p>
                        <span className="block text-sm">{day.astro.sunrise}</span>
                      </div>
                      <div className="bg-green-500 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Sunset</p>
                        <span className="block text-sm">{day.astro.sunset}</span>
                      </div>
                      <div className="bg-green-300 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Moonrise</p>
                        <span className="block text-sm">{day.astro.moonrise}</span>
                      </div>
                      <div className="bg-green-400 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Moonset</p>
                        <span className="block text-sm">{day.astro.moonset}</span>
                      </div>
                      <div className="bg-green-500 p-2 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700">Moon Phase</p>
                        <span className="block text-sm">{day.astro.moon_phase}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
             
            </div>
          )}
      
      {/**
       
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                  <div className="bg-green-200 p-4 rounded-lg shadow-md">
                  <TemperatureGraph forecastData={forecastData} />
                  </div>
                  <div className="bg-green-200 p-4 rounded-lg shadow-md">
                  <WindSpeedGraph forecastData={forecastData} />
                  </div>
                  <div className="bg-green-200 p-4 rounded-lg shadow-md">
                  <HumidityGraph forecastData={forecastData} />
                  </div>
                  <div className="bg-green-200 p-4 rounded-lg shadow-md">
                  <PrecipitationGraph forecastData={forecastData} />
                  </div>
                </div>
          
       */}
</div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" overlayClassName="modal-overlay">
        <div className="modal-content">
          <button onClick={closeModal} className="modal-close-button">&times;</button>
          {latitude && longitude && (
            <MapComponent latitude={latitude} longitude={longitude} location={location} />
          )}
        </div>
      </Modal>
    </div>
  );
};

// Dynamic import for Leaflet map components
const MapComponent = ({ latitude, longitude, location }) => {
  const [MapContainer, setMapContainer] = useState(null);

  useEffect(() => {
    import('react-leaflet').then(({ MapContainer, TileLayer, Marker, Popup }) => {
      setMapContainer(() => (
        <MapContainer center={[latitude, longitude]} zoom={10} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              {location}
            </Popup>
          </Marker>
        </MapContainer>
      ));
    });
  }, [latitude, longitude]);

  return MapContainer;
};

export default TheWeatherResult;
