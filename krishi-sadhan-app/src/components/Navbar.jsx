
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Krishi <span className="text-green-700">Dhan</span>
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-green-700 font-medium">Home</Link>
          <Link to="/booking" className="text-gray-600 hover:text-green-700 font-medium">My Bookings</Link>
          <button className="text-gray-600 hover:text-green-700 font-medium">Chat</button>
          <Link to="/login" className="bg-green-800 text-white px-5 py-2 rounded-md hover:bg-green-900 font-medium transition-colors">
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

