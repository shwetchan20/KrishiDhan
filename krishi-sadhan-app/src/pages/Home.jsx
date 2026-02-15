import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Home = ({ t }) => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Scheme keys mapped to translations
    const schemes = [
        { id: 1, name: 'pm_kisan', img: 'https://placehold.co/150x150/orange/white?text=PMK', url: 'https://pmkisan.gov.in/' },
        { id: 2, name: 'pmfby', img: 'https://placehold.co/150x150/green/white?text=PMFBY', url: 'https://pmfby.gov.in/' },
        { id: 3, name: 'kcc', img: 'https://placehold.co/150x150/blue/white?text=KCC', url: 'https://kcc.pmkisan.gov.in/' },
        { id: 4, name: 'namo_shetkari', img: 'https://placehold.co/150x150/purple/white?text=NS', url: 'https://nsmny.mahait.org/' },
        { id: 5, name: 'magel_tyala', img: 'https://placehold.co/150x150/red/white?text=MTS', url: 'https://mahadbt.maharashtra.gov.in/' },
        { id: 6, name: 'mahadbt', img: 'https://placehold.co/150x150/brown/white?text=DBT', url: 'https://mahadbt.maharashtra.gov.in/' },
    ];

    const listings = [
        { id: '1', title: 'Mahindra 475 DI', listingType: 'rent', pricePerDay: 800, image: 'https://placehold.co/300x200?text=Tractor' },
        { id: '2', title: 'Rotavator 6ft', listingType: 'sell', sellPrice: 45000, image: 'https://placehold.co/300x200?text=Rotavator' },
        { id: '3', title: 'Power Tiller', listingType: 'rent', pricePerDay: 400, image: 'https://placehold.co/300x200?text=Tiller' },
        { id: '4', title: 'JCB 3DX', listingType: 'rent', pricePerDay: 2500, image: 'https://placehold.co/300x200?text=JCB' }
    ];

    return (
        <MobileLayout t={t}>
            {/* Search Trigger */}
            <div className="mb-6 px-1">
                <div onClick={() => setIsSearchOpen(true)} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm active:bg-gray-50 transition-colors">
                    <Search size={22} className="text-green-700" />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{t('search_placeholder')}</span>
                        <span className="text-[10px] text-gray-400">Try "Tractor", "Harvester"</span>
                    </div>
                </div>
            </div>

            {/* Scrolling Government Schemes */}
            <div className="mb-8 overflow-hidden">
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2 border-l-4 border-green-600">{t('govt_schemes')}</h3>
                    <button onClick={() => navigate('/schemes')} className="flex items-center gap-1 text-xs font-bold text-green-700">
                        {t('view_all')} <ChevronRight size={14} />
                    </button>
                </div>

                <div className="flex overflow-x-auto no-scrollbar pb-2">
                    <div className="flex gap-4 animate-scroll-slow hover:pause-animation pl-1">
                        {[...schemes, ...schemes].map((scheme, index) => (
                            <a key={`${scheme.id}-${index}`} href={scheme.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex flex-col items-center w-20">
                                <div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 p-2 shadow-sm flex items-center justify-center mb-2">
                                    <img src={scheme.img} alt="scheme" className="w-full h-full object-contain rounded-lg" />
                                </div>
                                <span className="text-[9px] font-bold text-center text-gray-600 leading-tight">
                                    {t(scheme.name)}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommendations Section */}
            <div className="pb-4 px-1">
                <h3 className="text-lg font-black text-gray-800 mb-4">{t('recommendations')}</h3>
                <div className="grid grid-cols-2 gap-4">
                    {listings.map((item) => (
                        <div key={item.id} onClick={() => navigate(`/equipment/${item.id}`)} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm active:scale-95 transition-all cursor-pointer">
                            <div className="relative h-32 bg-gray-100">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase text-white ${item.listingType === 'rent' ? 'bg-blue-600' : 'bg-red-500'}`}>
                                    {item.listingType === 'rent' ? t('rent_badge') : t('sell_badge')}
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="font-bold text-gray-800 text-xs truncate">{item.title}</h4>
                                <p className="text-green-700 font-black text-sm mt-1">₹{item.listingType === 'rent' ? item.pricePerDay : item.sellPrice}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search Modal */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-white z-[60] flex flex-col">
                    <div className="flex items-center gap-2 p-4 border-b">
                        <button onClick={() => setIsSearchOpen(false)} className="p-2 bg-gray-100 rounded-full">
                            <X size={20} />
                        </button>
                        <input
                            autoFocus
                            type="text"
                            placeholder={t('search_placeholder')}
                            className="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none font-bold text-gray-800"
                        />
                    </div>
                </div>
            )}
        </MobileLayout>
    );
};

export default Home;