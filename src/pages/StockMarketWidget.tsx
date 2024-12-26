// src/pages/StockMarketWidget.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const StockMarketWidget = () => {
  const [stockData, setStockData] = useState<any>(null);
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.REACT_APP_STOCK_API_KEY;

  const symbols = ['AAPL', 'GOOG', 'MSFT'];

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data['Time Series (5min)']) {
          setStockData(data['Time Series (5min)']);
        } else {
          setError('Error fetching stock data.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data.');
        setLoading(false);
      });
  }, [symbol]);

  const prepareChartData = () => {
    if (!stockData) return { labels: [], datasets: [] };
    const times = Object.keys(stockData);
    const closePrices = times.map(time => parseFloat(stockData[time]['4. close']));
    console.log({
      labels: times.reverse(),
      datasets: [
        {
          label: `${symbol} Stock Price (Close)`,
          data: closePrices.reverse(),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });

    return {
      labels: times.reverse(),
      datasets: [
        {
          label: `${symbol} Stock Price (Close)`,
          data: closePrices.reverse(),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="p-4 rounded shadow bg-white">
      <h3 className="font-bold text-lg mb-4">Stock Market Data</h3>
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="p-2 border rounded mb-4"
      >
        {symbols.map((symbolOption) => (
          <option key={symbolOption} value={symbolOption}>
            {symbolOption === 'AAPL' ? 'Apple (AAPL)' : symbolOption === 'GOOG' ? 'Google (GOOG)' : 'Microsoft (MSFT)'}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && stockData && stockData !== null && (
        
        <div>
          <h4 className="font-semibold text-xl">{symbol} Stock Data</h4>
          <Line
            data={prepareChartData()}
            options={{
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Time',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Price (USD)',
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StockMarketWidget;




