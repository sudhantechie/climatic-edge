// src/App.tsx
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import NavBar from './pages/NavBar'; 
import WeatherWidget from './pages/WeatherWidget';
import NewsPage from './pages/NewsPage';
import StockMarketWidget from './pages/StockMarketWidget';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold">ClimaticEdge</Link>
            <NavBar />
          </div>
        </header>
        {/* Routes */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/stocks" element={<StockMarketWidget />} />
          <Route path="/weather" element={<WeatherWidget />} />
        </Routes>   
        <Footer />
      </div>
    </Router>
  );
};

export default App;
