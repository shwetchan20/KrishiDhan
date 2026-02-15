import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Sprout, Hammer, Truck, Shovel, Droplets, ChevronRight } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Categories = ({ t }) => {
    const navigate = useNavigate();

    // Categories Data
    const categories = [
        { id: 1, name: 'Tractors', icon: <Tractor size={28} />, color: 'bg-orange-50 text-orange-600 border-orange-100', items: '120+' },
        { id: 2, name: 'Harvesters', icon: <Truck size={28} />, color: 'bg-green-50 text-green-600 border-green-100', items: '45+' },
        { id: 3, name: 'Farming Tools', icon: <Hammer size={28} />, color: 'bg-blue-50 text-blue-600 border-blue-100', items: '200+' },
        { id: 4, name: 'Seeds', icon: <Sprout size={28} />, color: 'bg-yellow-50 text-yellow-600 border-yellow-100', items: '500+' },
        { id: 5, name: 'Irrigation', icon: <Droplets size={28} />, color: 'bg-cyan-50 text-cyan-600 border-cyan-100', items: '80+' },
        { id: 6, name: 'Tillage', icon: <Shovel size={28} />, color: 'bg-purple-50 text-purple-600 border-purple-100', items: '60+' },
    ];

    return (
        <MobileLayout t={t}>
            <div className="pb-6">

                {/* Header Section */}
                <div className="flex justify-between items-end mb-6 px-1">
                    <div>
                        <h2 className="text-xl font-black text-gray-800">{t('category')}</h2>
                        <p className="text-xs text-gray-400 font-medium mt-1">Explore equipment by type</p>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => navigate('/home')} // Redirects to home filtered by category (logic can be added later)
                            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-all flex flex-col items-center text-center group"
                        >
                            {/* Icon Circle */}
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border ${cat.color} group-hover:scale-110 transition-transform`}>
                                {cat.icon}
                            </div>

                            {/* Text */}
                            <h3 className="font-bold text-gray-800 text-sm">{cat.name}</h3>
                            <p className="text-[10px] text-gray-400 font-bold mt-1 bg-gray-50 px-2 py-0.5 rounded-full">
                                {cat.items} Items
                            </p>
                        </div>
                    ))}
                </div>

                {/* Trending Tags Section */}
                <div className="mt-8">
                    <h3 className="text-sm font-bold text-gray-800 mb-3 px-1">🔥 Trending Searches</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Mahindra', 'John Deere', 'Rotavator', 'Drone', 'Pesticide'].map((tag) => (
                            <button key={tag} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-gray-600 shadow-sm active:bg-gray-50">
                                # {tag}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </MobileLayout>
    );
};

export default Categories;