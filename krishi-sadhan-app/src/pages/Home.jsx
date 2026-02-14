import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Home = ({ t }) => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // --- DUMMY DATA: GOVERNMENT SCHEMES ---
    const schemes = [
        { id: 1, name: 'Krishi Nivesh', img: 'https://placehold.co/100x100/orange/white?text=KN' },
        { id: 2, name: 'Krishi DSS', img: 'https://placehold.co/100x100/green/white?text=DSS' },
        { id: 3, name: 'Sathi Portal', img: 'https://placehold.co/100x100/blue/white?text=SP' },
        { id: 4, name: 'Kisan Call', img: 'https://placehold.co/100x100/purple/white?text=KCC' },
        { id: 5, name: 'Agri Market', img: 'https://placehold.co/100x100/red/white?text=AM' },
    ];

    // --- DUMMY DATA: LISTINGS ---
    const listings = [
        {
            id: '1',
            title: 'Mahindra 475 DI',
            listingType: 'rent',
            pricePerDay: 800,
            city: 'Kolhapur',
            image: 'https://placehold.co/300x200?text=Tractor'
        },
        {
            id: '2',
            title: 'Rotavator 6ft',
            listingType: 'sell',
            sellPrice: 45000,
            city: 'Sangli',
            image: 'https://placehold.co/300x200?text=Rotavator'
        },
        {
            id: '3',
            title: 'Power Tiller',
            listingType: 'rent',
            pricePerDay: 400,
            city: 'Satara',
            image: 'https://placehold.co/300x200?text=Tiller'
        },
        {
            id: '4',
            title: 'JCB 3DX',
            listingType: 'rent',
            pricePerDay: 2500,
            city: 'Pune',
            image: 'https://placehold.co/300x200?text=JCB'
        }
    ];

    return (
        <MobileLayout t={t}>

            {/* 1. SEARCH BAR (Sticky Top) */}
            <div className="sticky top-14 z-30 bg-gray-50 pt-2 pb-2 mb-4">
                <div
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm active:bg-gray-50 transition-colors"
                >
                    <Search size={20} className="text-gray-500" />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{t('search_placeholder')}</span>
                        <span className="text-[10px] text-gray-400">Try "Tractor", "Harvester"</span>
                    </div>
                </div>
            </div>

            {/* 2. GOVERNMENT SCHEMES (Horizontal Scroll) */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2 px-1">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('govt_schemes')}</h3>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {schemes.map((scheme) => (
                        <div key={scheme.id} className="flex-shrink-0 flex flex-col items-center w-20">
                            <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 p-2 shadow-sm flex items-center justify-center mb-1">
                                <img src={scheme.img} alt={scheme.name} className="w-full h-full object-contain rounded-full" />
                            </div>
                            <span className="text-[10px] font-bold text-center text-gray-600 leading-tight">{scheme.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. PRODUCT GRID */}
            <div className="pb-4">
                <h3 className="text-lg font-black text-gray-800 mb-4 px-1">{t('recommendations')}</h3>
                <div className="grid grid-cols-2 gap-4">
                    {listings.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/equipment/${item.id}`)} // <--- NAVIGATION ADDED HERE
                            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                            {/* Image Section */}
                            <div className="relative h-32 bg-gray-200">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />

                                {/* Badge: RENT or SELL */}
                                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white ${item.listingType === 'rent' ? 'bg-blue-600' : 'bg-red-500'}`}>
                                    {item.listingType === 'rent' ? t('rent_badge') : t('sell_badge')}
                                </div>

                                {/* Favorite Heart (Visual) */}
                                <button className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-gray-400">
                                    ♥
                                </button>
                            </div>

                            {/* Details Section */}
                            <div className="p-3">
                                <h4 className="font-bold text-gray-800 text-sm truncate">{item.title}</h4>

                                {/* Dynamic Price Display */}
                                <p className="text-green-700 font-black text-lg mt-1">
                                    ₹{item.listingType === 'rent' ? item.pricePerDay : item.sellPrice}
                                    {item.listingType === 'rent' && <span className="text-xs font-normal text-gray-500">{t('per_day')}</span>}
                                </p>

                                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                                    <MapPin size={12} />
                                    <span>{item.city}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- FULL SCREEN SEARCH OVERLAY --- */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-bottom-5">
                    <div className="flex items-center gap-2 p-4 border-b shadow-sm">
                        <button onClick={() => setIsSearchOpen(false)} className="p-2 bg-gray-100 rounded-full">
                            <X size={20} />
                        </button>
                        <div className="flex-1 flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                            <Search size={18} className="text-gray-500 mr-2" />
                            <input
                                autoFocus
                                type="text"
                                placeholder={t('search_placeholder')}
                                className="bg-transparent outline-none w-full text-gray-800"
                            />
                        </div>
                    </div>

                    <div className="p-4">
                        <p className="text-xs font-bold text-gray-400 mb-4 uppercase">Popular Searches</p>
                        <div className="flex flex-wrap gap-2">
                            {['Mahindra Tractor', 'Rotavator', 'Harvester', 'Seeds', 'Plow'].map((tag) => (
                                <button key={tag} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </MobileLayout>
    );
};

export default Home;