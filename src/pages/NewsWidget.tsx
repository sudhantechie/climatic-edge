// src/pages/NewsWidget.tsx
import React, { useState, useEffect } from 'react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

const NewsWidget = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY; 
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch news articles.');
        }
        return response.json();
      })
      .then((data) => {
        setNews(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-blue-100 p-4 rounded shadow">
      <h3 className="font-bold text-lg mb-4">Trending News</h3>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && news.length === 0 && <p>No news available.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading && !error && news.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between border border-gray-200 bg-white p-4 rounded-lg shadow-md h-72"
          >
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-blue-700 truncate mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.description || "No description available."}</p>
            </div>
            <div className="mt-auto">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition-all"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
