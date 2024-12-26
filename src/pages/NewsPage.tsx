// src/pages/NewsPage.tsx
import NewsWidget from './NewsWidget';

const NewsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      <NewsWidget />
    </div>
  );
};

export default NewsPage;
