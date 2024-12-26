# ClimaticEdge

ClimaticEdge is a web-based application that provides real-time weather updates, stock market data, and news from around the globe. Built with React and Typescript and integrated with external APIs, ClimaticEdge delivers accurate weather forecasts, stock market trends, and the latest news, making it the perfect platform for keeping up-to-date with global events.

## Features

- **Global Weather Forecast:** View current weather information, including temperature, humidity, wind speed, pressure, and more for multiple cities around the world.
- **Stock Market Trends:** Get real-time stock data and market trends for top companies.
- **Latest News:** Stay informed with the latest news headlines from trusted sources.
- **Add and Track Weather:** Add multiple locations and receive weather updates for your selected cities.

## Tech Stack

- **Frontend:** Typescript, React.js, Tailwind CSS
- **APIs:** OpenWeather API (for weather data), News API (for news updates), Stock Market API (for stock data)

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sudhantechie/climatic-edge.git
   cd climatic-edge

2. **Create a `.env` file** in the root of the project and add the necessary environment variables. Below is an example of the environment variables you might need:

   ```
   REACT_APP_WEATHER_API_KEY=your_openweather_api_key
   REACT_APP_NEWS_API_KEY=your_news_api_key
   REACT_APP_STOCK_API_KEY=your_stock_market_api_key
   ```

   Replace `your_openweather_api_key`, `your_news_api_key`, and `your_stock_api_key` with your actual API keys.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

