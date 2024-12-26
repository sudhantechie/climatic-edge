// src/pages/WeatherWidget.tsx
import React, { useState, useEffect } from 'react';

interface WeatherData {
  city: string;
  temperature: string;
  description: string;
  icon: string;
  humidity: string;
  windSpeed: string;
  pressure: string;
  visibility: string;
  cloudiness: string;
  sunrise: string;
  sunset: string;
}

const WeatherWidget = () => {
  const [locations, setLocations] = useState<string[]>([
    'New York',
    'London',
    'Tokyo',
    'Paris',
    'Sydney',
    'Mumbai',
  ]);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [newLocation, setNewLocation] = useState<string>('');
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = (city: string) => {
    setLoading(true);
    setError(null);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data for ${city}`);
        }
        return response.json();
      })
      .then((data) => {
        const weather = {
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          pressure: data.main.pressure,
          visibility: (data.visibility / 1000).toFixed(1),
          cloudiness: data.clouds.all,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        };

        setWeatherData((prevData) => {
          if (!prevData.find((item) => item.city === weather.city)) {
            return [...prevData, weather];
          }
          return prevData;
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchCitySuggestions = (query: string) => {
    if (query.trim() === '') {
      setCitySuggestions([]);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}`;
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch city suggestions');
        }
        return response.json();
      })
      .then((data) => {
        const suggestions = data.list ? data.list.map((item: any) => item.name) : [];
        setCitySuggestions(suggestions);
      })
      .catch((err) => {
        console.error('Error fetching city suggestions:', err);
        setCitySuggestions([]);
      });
  };

  useEffect(() => {
    setWeatherData([]);
    locations.forEach((location) => fetchWeather(location));
  }, [locations]);

  const handleAddLocation = () => {
    if (newLocation && !locations.includes(newLocation)) {
      setLocations((prevLocations) => [...prevLocations, newLocation]);
      setNewLocation('');
      setCitySuggestions([]);
    }
  };

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewLocation(value);
    fetchCitySuggestions(value);
  };

  const handleCitySelect = (city: string) => {
    setNewLocation(city);
    setCitySuggestions([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-100 p-4">
      <header className="text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 mb-6 w-full">
        <h1 className="text-3xl font-bold">Global Weather Forecast</h1>
        <p className="mt-2">Get the latest weather updates for cities around the world!</p>
      </header>
      <div className="mb-4 flex justify-center w-full relative">
        <input
          type="text"
          value={newLocation}
          onChange={handleCityInputChange}
          placeholder="Add a location"
          className="p-2 border border-gray-300 rounded mr-2 w-1/2 md:w-1/3 lg:w-1/4"
        />
        <button onClick={handleAddLocation} className="bg-blue-500 text-white p-2 rounded">
          Add Location
        </button>
        {citySuggestions.length > 0 && (
          <ul className="absolute top-12 mt-1 w-1/2 md:w-1/7 lg:w-1/7 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto z-10">
            {citySuggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleCitySelect(city)}
                className="p-2 cursor-pointer hover:bg-blue-100"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}
      {error && (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}
      {!loading && weatherData.length === 0 && <p>No weather data available.</p>}

      {/* Weather Data Display */}
      <div className="flex flex-wrap justify-center w-full gap-6 mb-auto">
        {!loading && !error && weatherData.length > 0 && weatherData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h4 className="text-xl font-semibold text-center">{item.city}</h4>
            <p className="text-center text-gray-600 text-sm">{item.description}</p>
            <div className="flex justify-center items-center mt-4">
              <img 
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} 
                alt={item.description} 
                className="w-16 h-16"
              />
              <p className="text-xl ml-2">{item.temperature}°C</p>
            </div>

            <div className="mt-4 text-center text-sm">
              <p>Humidity: {item.humidity}%</p>
              <p>Wind Speed: {item.windSpeed} m/s</p>
              <p>Pressure: {item.pressure} hPa</p>
              <p>Visibility: {item.visibility} km</p>
              <p>Cloudiness: {item.cloudiness}%</p>
              <p>Sunrise: {item.sunrise}</p>
              <p>Sunset: {item.sunset}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
