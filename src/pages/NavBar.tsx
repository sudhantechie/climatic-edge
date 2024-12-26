// src/pages/NavBar.tsx
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-end">
      <Link to="/" className="ml-4 hover:text-yellow-500">Home</Link>
      <Link to="/news" className="ml-4 hover:text-yellow-500">News</Link>
      <Link to="/stocks" className="ml-4 hover:text-yellow-500">Stocks</Link>
      <Link to="/weather" className="ml-4 hover:text-yellow-500">Weather</Link>
    </nav>
  );
};

export default NavBar;
