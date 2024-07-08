import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Modal from 'react-modal';

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

  useEffect(() => {
    if (location) {
      fetchWeatherData();
      fetchAiContent();
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

  return (
    <div className="container mx-auto md:px-4 py-8">
      <Head>
        <title>Weather Result for {location}</title>
      </Head>
      <h1 className="md:text-3xl text-2xl p-2 font-bold mb-4">Weather Result for {location}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:row-span-2 h-[710px] overflow-y-auto">
        {/*  <h2 className="md:text-2xl text-xl p-2 font-bold">{location} Weather Article</h2> */}
          <div className="text-md ">
            {typedArticle.map((paragraph, index) => (
              <p key={index} className="text-md leading-relaxed text-gray-700 bg-white p-4 rounded-sm shadow-md border border-gray-100 hover:bg-gray-50 transition duration-300 ease-in-out max-w-2xl mx-auto my-8 first-letter:text-4xl first-letter:font-bold first-letter:text-gray-900 first-line:tracking-widest">
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
        <div className="flex flex-col justify-between">
          <div className="mb-4">
            {images.length > 0 && (
              <img
                src={images[currentImageIndex]}
                alt={location}
                className="w-full h-64 object-cover mb-4"
              />
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
      </div>

      {weatherData ? (
        <div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-2">Weather Data</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      ) : (
        <p className="text-xl">No weather information found in {location}</p>
      )}

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
