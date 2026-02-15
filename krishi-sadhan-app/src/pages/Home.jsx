import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Home = ({ t }) => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // येथे फक्त KEYS ठेवा, t() फंक्शन वापरू नका
    const schemes = [
        { id: 1, name: 'pm_kisan', img: 'https://placehold.co/150x150/orange/white?text=PMK', url: 'https://pmkisan.gov.in/' },
        { id: 2, name: 'pmfby', img: 'https://placehold.co/150x150/green/white?text=PMFBY', url: 'https://pmfby.gov.in/' },
        { id: 3, name: 'kcc', img: 'https://placehold.co/150x150/blue/white?text=KCC', url: '#' },
        { id: 4, name: 'namo_shetkari', img: 'https://placehold.co/150x150/purple/white?text=NS', url: '#' },
        { id: 5, name: 'magel_tyala', img: 'https://placehold.co/150x150/red/white?text=MTS', url: '#' },
        { id: 6, name: 'mahadbt', img: 'https://placehold.co/150x150/brown/white?text=DBT', url: '#' },
    ];

    const listings = [
        { id: '1', title: 'Mahindra 475 DI', listingType: 'rent', pricePerDay: 800, city: 'Kolhapur', image: 'https://placehold.co/300x200?text=Tractor' },
        { id: '2', title: 'Rotavator 6ft', listingType: 'sell', sellPrice: 45000, city: 'Sangli', image: 'https://placehold.co/300x200?text=Rotavator' },
        { id: '3', title: 'Power Tiller', listingType: 'rent', pricePerDay: 400, city: 'Satara', image: 'https://placehold.co/300x200?text=Tiller' },
        { id: '4', title: 'JCB 3DX', listingType: 'rent', pricePerDay: 2500, city: 'Pune', image: 'https://placehold.co/300x200?text=JCB' }
    ];

    return (
        <MobileLayout t={t}>
            {/* Search Bar */}
            <div className="mb-6">
                <div onClick={() => setIsSearchOpen(true)} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm active:bg-gray-50 transition-colors">
                    <Search size={24} className="text-green-700" />
                    <div className="flex flex-col">
                        <span className="text-base font-bold text-gray-800">{t('search_placeholder')}</span>
                        <span className="text-xs text-gray-400">Try "Tractor", "Harvester"</span>
                    </div>
                </div>
            </div>

            {/* --- INFINITE MOVING SCHEMES SECTION --- */}
            <div className="mb-8 overflow-hidden">
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">{t('govt_schemes')}</h3>
                    <button onClick={() => navigate('/schemes')} className="flex items-center gap-1 text-xs font-bold text-green-700 hover:underline">
                        {t('view_all')} <ChevronRight size={14} />
                    </button>
                </div>

                <div className="flex w-full overflow-x-auto no-scrollbar pb-2 cursor-grab active:cursor-grabbing">
                    <div className="flex gap-4 animate-scroll-slow hover:pause-animation min-w-max pl-4">
                        {[...schemes, ...schemes, ...schemes].map((scheme, index) => (
                            <a
                                key={`${scheme.id}-${index}`}
                                href={scheme.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 flex flex-col items-center w-24"
                            >
                                <div className="w-20 h-20 bg-white rounded-2xl border-2 border-gray-100 p-2 shadow-sm flex items-center justify-center mb-2 transition-transform active:scale-95">
                                    <img src={scheme.img} alt="scheme" className="w-full h-full object-cover rounded-xl" />
                                </div>
                                {/* येथे बदल केला आहे: t() फंक्शनमध्ये scheme.name टाकला आहे */}
                                <span className="text-[10px] font-bold text-center text-gray-700 leading-tight">
                                    {t(scheme.name)}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommendations Grid */}
            <div className="pb-4">
                <h3 className="text-lg font-black text-gray-800 mb-4 px-1">{t('recommendations')}</h3>
                <div className="grid grid-cols-2 gap-4">
                    {listings.map((item) => (
                        <div key={item.id} onClick={() => navigate(`/equipment/${item.id}`)} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="relative h-36 bg-gray-200">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white ${item.listingType === 'rent' ? 'bg-blue-600' : 'bg-red-500'}`}>{item.listingType === 'rent' ? t('rent_badge') : t('sell_badge')}</div>
                            </div>
                            <div className="p-3">
                                <h4 className="font-bold text-gray-800 text-sm truncate">{item.title}</h4>
                                <p className="text-green-700 font-black text-lg mt-1">₹{item.listingType === 'rent' ? item.pricePerDay : item.sellPrice}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-bottom-5">
                    <div className="flex items-center gap-2 p-4 border-b shadow-sm">
                        <button onClick={() => setIsSearchOpen(false)} className="p-2 bg-gray-100 rounded-full">
                            <X size={20} />
                        </button>
                        <input
                            autoFocus
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('search_placeholder')}
                            className="flex-1 bg-gray-100 rounded-lg px-4 py-2 outline-none font-bold text-gray-800"
                        />
                    </div>
                </div>
            )}
        </MobileLayout>
    );
};

export default Home;