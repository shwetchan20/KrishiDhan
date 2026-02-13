import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EquipmentListing = () => {
    // Mock data matching the design
    const equipmentList = [
        { id: 1, name: 'Mahindra 475 DI Tractor', type: 'Tractor', price: 500, unit: 'Hour', location: 'Nashik', image: 'https://via.placeholder.com/300x200?text=Tractor' },
        { id: 2, name: 'Rotavator', type: 'Tillage', price: 300, unit: 'Hour', location: 'Pune', image: 'https://via.placeholder.com/300x200?text=Rotavator' },
        { id: 3, name: 'Harvesting Machine', type: 'Harvester', price: 1200, unit: 'Day', location: 'Nagpur', image: 'https://via.placeholder.com/300x200?text=Harvester' },
        { id: 4, name: 'Water Pump', type: 'Irrigation', price: 200, unit: 'Hour', location: 'Satara', image: 'https://via.placeholder.com/300x200?text=Pump' },
    ];

    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="relative bg-green-50 py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                        Find Farm Equipment Near You
                    </h1>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto bg-white p-2 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-2">
                        <div className="flex-1 w-full flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200 py-2">
                            <span className="text-gray-400 mr-2">📍</span>
                            <input
                                type="text"
                                placeholder="Location"
                                className="w-full outline-none text-gray-700"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 w-full flex items-center px-4 py-2">
                            <span className="text-gray-400 mr-2">📅</span>
                            <input
                                type="date"
                                className="w-full outline-none text-gray-700"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <button className="w-full md:w-auto bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                {/* Decorative Green Bottom Border/Background extension could go here */}
                <div className="absolute bottom-0 left-0 w-full h-4 bg-green-700/10"></div>
            </div>

            {/* Grid Section */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {equipmentList.map(item => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                            <div className="h-48 overflow-hidden bg-gray-100 relative group">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-sm text-gray-500 mb-3">{item.type}</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-900 font-bold">
                                        ₹{item.price} <span className="text-xs text-gray-500 font-normal">/ {item.unit}</span>
                                    </p>
                                    <Link
                                        to={`/equipment/${item.id}`}
                                        className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EquipmentListing;
