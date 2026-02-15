import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight, Bell, MapPin } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Home = ({ t }) => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const schemes = [
        { id: 1, name: 'pm_kisan', img: '/schemes-logos/pm_kisan.jpeg', url: 'https://pmkisan.gov.in/' },
        { id: 2, name: 'pmfby', img: '/schemes-logos/pmfby.jpeg', url: 'https://pmfby.gov.in/' },
        { id: 3, name: 'kcc', img: '/schemes-logos/kcc.jpeg', url: 'https://kcc.pmkisan.gov.in/' },
        { id: 4, name: 'namo_shetkari', img: '/schemes-logos/namo_shetkari.png', url: 'https://nsmny.mahait.org/' },
        { id: 5, name: 'magel_tyala', img: '/schemes-logos/magel_tyala.jpeg', url: 'https://mahadbt.maharashtra.gov.in/' },
        { id: 6, name: 'mahadbt', img: '/schemes-logos/mahadbt.jpeg', url: 'https://mahadbt.maharashtra.gov.in/' },
    ];

    const listings = [
        { id: '1', title: 'Mahindra 475 DI', listingType: 'rent', pricePerDay: 800, image: 'https://placehold.co/300x200?text=Tractor' },
        { id: '2', title: 'Rotavator 6ft', listingType: 'sell', sellPrice: 45000, image: 'https://placehold.co/300x200?text=Rotavator' },
        { id: '3', title: 'Power Tiller', listingType: 'rent', pricePerDay: 400, image: 'https://placehold.co/300x200?text=Tiller' },
        { id: '4', title: 'JCB 3DX', listingType: 'rent', pricePerDay: 2500, image: 'https://placehold.co/300x200?text=JCB' }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24">
            <MobileLayout t={t}>
                {/* --- 1. PREMIUM PERSONALIZED HEADER (Dynamic Greeting) --- */}
                <div className="pt-4 pb-6 px-1 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight">
                            {t('greeting_prefix')}, <span className="text-green-600">{t('user_greeting') || 'User!'}</span>
                        </h2>
                        <div className="flex items-center gap-1 text-gray-500 mt-1">
                            <MapPin size={14} className="text-orange-500" />
                            <span className="text-xs font-bold tracking-wide uppercase">{t('city_village_name') || 'Kolhapur, Maharashtra'}</span>
                        </div>
                    </div>
                    <button className="relative p-2.5 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-90 transition-transform">
                        <Bell size={20} className="text-gray-700" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>

                {/* --- 2. GLASSMORPHISM SEARCH BAR --- */}
                <div className="mb-8 px-1">
                    <div
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center gap-4 bg-white/80 backdrop-blur-md p-4 rounded-[24px] border border-white shadow-xl shadow-green-900/5 active:bg-green-50 transition-all cursor-pointer group"
                    >
                        <div className="p-2 bg-green-100 rounded-xl group-active:bg-green-600 group-active:text-white transition-colors">
                            <Search size={20} className="text-green-700 group-active:text-inherit" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-extrabold text-gray-800">{t('search_placeholder')}</span>
                            <span className="text-[10px] font-medium text-gray-400">{t('search_subtext') || 'Find tractors or equipment...'}</span>
                        </div>
                    </div>
                </div>

                {/* --- 3. ENHANCED SCHEMES SECTION (Fully Translated) --- */}
                <div className="mb-10">
                    <div className="flex justify-between items-end mb-5 px-1">
                        <div>
                            <h3 className="text-[10px] font-black text-green-600 uppercase tracking-[2px] mb-1">
                                {t('govt_schemes_small') || 'Government Schemes'}
                            </h3>
                            <h4 className="text-lg font-black text-gray-900 leading-none">
                                {t('recommended_for_you') || 'Recommended For You'}
                            </h4>
                        </div>
                        <button
                            onClick={() => navigate('/schemes')}
                            className="px-3 py-1.5 bg-green-50 rounded-full text-[11px] font-extrabold text-green-700 flex items-center gap-1 active:bg-green-100 transition-colors"
                        >
                            {t('view_all')} <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="flex overflow-hidden -mx-4 px-4 no-scrollbar">
                        <div className="flex gap-4 animate-scroll-slow pause-animation pl-1">
                            {[...schemes, ...schemes].map((scheme, index) => (
                                <a
                                    key={`${scheme.id}-${index}`}
                                    href={scheme.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 flex flex-col items-center w-[84px] group"
                                >
                                    <div className="w-16 h-16 bg-white rounded-3xl border border-gray-50 shadow-sm flex items-center justify-center mb-2.5 overflow-hidden group-active:scale-90 transition-transform p-1">
                                        <img
                                            src={scheme.img}
                                            alt={t(scheme.name)}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-center text-gray-700 leading-tight line-clamp-2 px-1">
                                        {t(scheme.name)}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- 4. MODERN RECOMMENDATIONS GRID --- */}
                <div className="pb-6 px-1">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                        <h3 className="text-lg font-black text-gray-900">{t('recommendations')}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {listings.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/equipment/${item.id}`)}
                                className="bg-white rounded-[28px] overflow-hidden border border-gray-50 shadow-md shadow-gray-200/50 active:scale-95 transition-all cursor-pointer group"
                            >
                                <div className="relative h-36 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider shadow-sm text-white ${item.listingType === 'rent' ? 'bg-green-600' : 'bg-orange-500'}`}>
                                        {item.listingType === 'rent' ? t('rent') : t('sell')}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-extrabold text-gray-900 text-xs truncate mb-1">{item.title}</h4>
                                    <div className="flex items-baseline gap-0.5">
                                        <span className="text-green-700 font-black text-base">₹{item.listingType === 'rent' ? item.pricePerDay : item.sellPrice}</span>
                                        {item.listingType === 'rent' && <span className="text-[10px] font-bold text-gray-400">/{t('day') || 'day'}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search Modal */}
                {isSearchOpen && (
                    <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-300">
                        <div className="flex items-center gap-3 p-4 border-b">
                            <button onClick={() => setIsSearchOpen(false)} className="p-2.5 bg-gray-100 rounded-2xl active:scale-90 transition-transform"><X size={20} /></button>
                            <input
                                autoFocus
                                type="text"
                                placeholder={t('search_placeholder')}
                                className="flex-1 bg-gray-50 rounded-2xl px-5 py-3 outline-none font-bold text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                        <div className="p-6 text-center text-gray-400 font-bold">{t('search_modal_text') || 'Type to find equipment...'}</div>
                    </div>
                )}
            </MobileLayout>
        </div>
    );
};

export default Home;