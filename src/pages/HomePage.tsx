// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [weatherData, setWeatherData] = useState<any[]>([]); // Hold multiple cities data
  const [weatherError, setWeatherError] = useState<string>(''); 
  const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;
  
  useEffect(() => {
    // Fetch News Data
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

    if (!newsApiKey) {
      console.error("News API key is missing.");
      return;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          setNews(data.articles);
        }
      })
      .catch((error) => console.error('Error fetching news:', error));

    // Fetch Weather Data
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

    if (!weatherApiKey) {
      setWeatherError("Weather API key is missing.");
      return;
    }

    const cities = ['London', 'Paris', 'New York', 'Cairo', 'Sydney', 'Mumbai', 'Cape Town', 'Tokyo', 'Los Angeles', 'Dubai', 'Rome', 'Moscow', 'Berlin', 'Rio de Janeiro', 'Istanbul', 'Toronto', 'Hong Kong', 'Mexico City', 'Barcelona', 'Shanghai', 'Delhi', 'Buenos Aires'];

    const fetchWeatherData = cities.map(city =>
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
        .then(response => response.json())
        .catch(error => {
          console.error(`Error fetching weather data for ${city}:`, error);
          return null;
        })
    );

    Promise.all(fetchWeatherData)
      .then(results => {
        const successfulResults = results.filter(result => result !== null);
        setWeatherData(successfulResults);
        if (successfulResults.length === 0) {
          setWeatherError('No weather data could be fetched.');
        }
      })
      .catch(() => {
        setWeatherError('Failed to fetch weather data.');
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-blue-500 text-white text-center py-6">
        <h3 className="text-2xl font-bold">Welcome to the ClimaticEdge</h3>
      </section>
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* News Section */}
        <section className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          {news.length > 0 ? (
            <ul>
              {news.map((article, index) => (
                <li key={index} className="mb-4">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    <h3 className="font-bold">{article.title}</h3>
                    <p>{article.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading news...</p>
          )}
        </section>

        {/* Weather Data Section */}
        <section className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Weather</h2>
          {weatherError ? (
            <p className="text-red-500">{weatherError}</p>
          ) : weatherData.length > 0 ? (
            weatherData.map((cityWeather, index) => (
              <div key={index}>
                <p>{cityWeather.name}, {cityWeather.sys?.country}</p>
                <p>Temperature: {Math.round(cityWeather.main.temp - 273.15)}°C</p>
                <p>Weather: {cityWeather.weather[0]?.description}</p>
                <p>Humidity: {cityWeather.main.humidity}%</p>
                <hr className="my-4" />
              </div>
            ))
          ) : (
            <p>Loading weather...</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
