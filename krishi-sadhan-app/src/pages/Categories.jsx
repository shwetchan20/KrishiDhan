import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Sprout, Hammer, Truck, Shovel, Droplets } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Categories = ({ t }) => {
    const navigate = useNavigate();

    // --- DUMMY DATA: CATEGORIES ---
    const categories = [
        { id: 1, name: 'Tractors', icon: <Tractor size={32} />, color: 'bg-orange-100 text-orange-600', items: '120+ items' },
        { id: 2, name: 'Harvesters', icon: <Truck size={32} />, color: 'bg-green-100 text-green-600', items: '45+ items' },
        { id: 3, name: 'Farming Tools', icon: <Hammer size={32} />, color: 'bg-blue-100 text-blue-600', items: '200+ items' },
        { id: 4, name: 'Seeds & Fertilizers', icon: <Sprout size={32} />, color: 'bg-yellow-100 text-yellow-600', items: '500+ items' },
        { id: 5, name: 'Irrigation', icon: <Droplets size={32} />, color: 'bg-cyan-100 text-cyan-600', items: '80+ items' },
        { id: 6, name: 'Tillage', icon: <Shovel size={32} />, color: 'bg-purple-100 text-purple-600', items: '60+ items' },
    ];

    return (
        <MobileLayout t={t}>
            <div className="pb-6">

                {/* Header - Translated using 'category' key */}
                <h1 className="text-2xl font-black text-gray-800 mb-2 px-2">{t('category')}</h1>
                <p className="text-gray-500 text-sm mb-6 px-2">Select a category to view equipment.</p>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 gap-4 px-2">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => navigate('/home')}
                            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center active:scale-95 transition-transform"
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${cat.color}`}>
                                {cat.icon}
                            </div>
                            <h3 className="font-bold text-gray-800">{cat.name}</h3>
                            <p className="text-xs text-gray-400 mt-1">{cat.items}</p>
                        </div>
                    ))}
                </div>

                {/* Popular Tags Section */}
                <div className="mt-8 px-2">
                    <h3 className="font-bold text-gray-800 mb-3">Trending Searches</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Mahindra', 'John Deere', 'Rotavator', 'Drone', 'Pesticide'].map((tag) => (
                            <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </MobileLayout>
    );
};

export default Categories;