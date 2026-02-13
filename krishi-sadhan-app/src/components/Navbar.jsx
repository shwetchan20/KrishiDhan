import React from 'react';
import { Link } from 'react-router-dom';

// 1. Accept 't' along with language props
const Navbar = ({ language, setLanguage, t }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Krishi <span className="text-green-700">Dhan</span>
        </Link>
        <div className="flex items-center space-x-8">
          {/* 2. Using t() for navigation links */}
          <Link to="/" className="text-gray-600 hover:text-green-700 font-medium">
            {t('home') || 'Home'}
          </Link>
          <Link to="/booking" className="text-gray-600 hover:text-green-700 font-medium">
            {t('my_bookings') || 'My Bookings'}
          </Link>
          <button className="text-gray-600 hover:text-green-700 font-medium">
            {t('chat') || 'Chat'}
          </button>

          {/* --- LANGUAGE DROPDOWN --- */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-md text-gray-600 py-1 px-2 text-sm focus:outline-none focus:border-green-700 bg-white cursor-pointer"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>

          <Link to="/login" className="bg-green-800 text-white px-5 py-2 rounded-md hover:bg-green-900 font-medium transition-colors">
            {t('logout') || 'Log Out'}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;