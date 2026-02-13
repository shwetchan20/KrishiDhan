import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome to KrishiDhan</h1>
            <p className="text-xl text-gray-600 mb-8">Rent Farm Equipment Easily or Verify and Earn.</p>
            <div className="flex justify-center gap-4">
                <Link to="/equipment" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700">Find Equipment</Link>
                <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">List Your Equipment</Link>
            </div>
        </div>
    );
};

export default Home;
