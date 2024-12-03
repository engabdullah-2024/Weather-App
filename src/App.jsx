// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';  // Import search icon
import { RiErrorWarningFill } from 'react-icons/ri';  // Import error icon
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi'; // Import weather icons


const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'b6273be527a39c02aaa3506b4feed5cd'; // Your API key

  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then((response) => {
          setWeather(response.data);
          setError('');
          setLoading(false);
        })
        .catch((error) => {
          setError('City not found! Please check the city name.');
          setWeather(null);
          setLoading(false);
        });
    }
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(e.target.city.value);
  };

  const renderWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return <WiDaySunny className="text-yellow-500 text-6xl" />;
      case 'Clouds':
        return <WiCloudy className="text-gray-500 text-6xl" />;
      case 'Rain':
        return <WiRain className="text-blue-500 text-6xl" />;
      case 'Snow':
        return <WiSnow className="text-white text-6xl" />;
      default:
        return <WiCloudy className="text-gray-500 text-6xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex flex-col justify-center items-center p-6">
      <header className="text-center text-white mb-6">
        <h1 className="text-4xl font-bold">Weather App</h1>
        <p className="text-lg">Get the latest weather information</p>
      </header>

      <form onSubmit={handleSearch} className="flex justify-center items-center mb-6 space-x-2">
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          required
          className="p-3 rounded-lg text-black w-60"
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center"
        >
          <FaSearch className="text-2xl" />
        </button>
      </form>

      {loading && <p className="text-white text-xl">Loading...</p>}
      {error && (
        <div className="flex items-center justify-center text-red-500 text-xl">
          <RiErrorWarningFill className="mr-2" />
          {error}
        </div>
      )}

      {weather && !loading && (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center w-80">
          <h2 className="text-2xl font-semibold text-gray-700">{weather.name}</h2>
          <p className="text-xl text-gray-600">{weather.sys.country}</p>
          {renderWeatherIcon(weather.weather[0].main)}
          <p className="text-3xl font-bold text-gray-800">{weather.main.temp}°C</p>
          <p className="text-lg text-gray-600">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default App;
