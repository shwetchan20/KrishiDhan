import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EquipmentListing = ({ t }) => {
    // 1. Mock Data (Later replace this with Firebase Fetch)
    const equipmentList = [
        { id: 1, name: 'Mahindra 475 DI Tractor', type: 'Tractor', price: 500, unit: 'Hour', location: 'Nashik', image: 'https://via.placeholder.com/300x200?text=Tractor' },
        { id: 2, name: 'Rotavator', type: 'Tillage', price: 300, unit: 'Hour', location: 'Pune', image: 'https://via.placeholder.com/300x200?text=Rotavator' },
        { id: 3, name: 'Harvesting Machine', type: 'Harvester', price: 1200, unit: 'Day', location: 'Nagpur', image: 'https://via.placeholder.com/300x200?text=Harvester' },
        { id: 4, name: 'Water Pump', type: 'Irrigation', price: 200, unit: 'Hour', location: 'Satara', image: 'https://via.placeholder.com/300x200?text=Pump' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [date, setDate] = useState('');

    // 2. Search Logic: Filtering based on location
    const filteredEquipment = equipmentList.filter(item =>
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="relative bg-green-50 py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                        {t('find_equipment_title')}
                    </h1>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto bg-white p-2 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-2">
                        <div className="flex-1 w-full flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200 py-2">
                            <span className="text-gray-400 mr-2">📍</span>
                            <input
                                type="text"
                                placeholder={t('placeholder_location')}
                                className="w-full outline-none text-gray-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                            {t('search')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="container mx-auto px-4">
                {/* 3. Logic: Show message if no results found */}
                {filteredEquipment.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No equipment found in this location.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredEquipment.map(item => (
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
                                    <p className="text-sm text-gray-500 mb-1">{item.type}</p>
                                    <p className="text-xs text-green-700 font-medium mb-3">📍 {item.location}</p>
                                    <div className="flex justify-between items-center border-t pt-3">
                                        <p className="text-gray-900 font-bold">
                                            ₹{item.price} <span className="text-xs text-gray-500 font-normal">/ {item.unit}</span>
                                        </p>
                                        <Link
                                            to={`/equipment/${item.id}`}
                                            className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800"
                                        >
                                            {t('book_now')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EquipmentListing;