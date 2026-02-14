import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, MessageCircle, Calendar, ShieldCheck } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const EquipmentDetails = ({ t }) => {
    const navigate = useNavigate();
    const { id } = useParams(); // To be used for backend fetching later

    // --- DUMMY DATA: Matches Listing Schema ---
    const item = {
        title: "Mahindra 475 DI",
        listingType: "rent",
        price: 800,
        unit: "day",
        city: "Kolhapur",
        owner: "Suresh Patil",
        description: "Well maintained Mahindra tractor, 42 HP. Ideal for plowing and heavy haulage. Comes with a full tank of diesel.",
        specs: ["42 HP Engine", "8 Forward Gears", "Oil Immersed Brakes"],
        images: [
            "https://placehold.co/600x400?text=Tractor+View+1",
            "https://placehold.co/600x400?text=Tractor+View+2"
        ]
    };

    return (
        <MobileLayout t={t}>
            <div className="pb-24">
                {/* 1. TOP HEADER & BACK BUTTON */}
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="font-bold text-gray-800 truncate">{item.title}</h2>
                </div>

                {/* 2. IMAGE SLIDER (Visual Only) */}
                <div className="relative w-full h-64 bg-gray-200 rounded-3xl overflow-hidden mb-6 shadow-md">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase text-white ${item.listingType === 'rent' ? 'bg-blue-600' : 'bg-red-500'}`}>
                            {item.listingType === 'rent' ? t('rent_badge') : t('sell_badge')}
                        </span>
                    </div>
                </div>

                {/* 3. PRICE & TITLE SECTION */}
                <div className="px-2 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-black text-gray-800">{item.title}</h1>
                            <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                                <MapPin size={14} />
                                <span>{item.city}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-green-700">₹{item.price}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase">
                                {item.listingType === 'rent' ? t('per_day') : t('price_on_sale')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. OWNER DETAILS (Requirement 11) */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                            {item.owner.charAt(0)}
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-bold uppercase leading-none mb-1">Owner</p>
                            <p className="font-bold text-gray-800">{item.owner}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Phone size={20} /></button>
                        <button className="p-3 bg-green-50 text-green-600 rounded-xl"><MessageCircle size={20} /></button>
                    </div>
                </div>

                {/* 5. DESCRIPTION */}
                <div className="px-2 mb-6">
                    <h3 className="font-black text-gray-800 mb-2 uppercase text-xs tracking-widest">{t('description')}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* 6. SPECIFICATIONS */}
                <div className="px-2 mb-8">
                    <h3 className="font-black text-gray-800 mb-3 uppercase text-xs tracking-widest">Specifications</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {item.specs.map((spec, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-xl font-medium">
                                <ShieldCheck size={16} className="text-green-600" />
                                {spec}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. FIXED BOTTOM ACTION BAR */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 px-6 flex items-center gap-4 z-50">
                    <div className="flex-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Total Price</p>
                        <p className="text-xl font-black text-gray-800">₹{item.price}</p>
                    </div>
                    <button className="flex-[2] bg-green-700 text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all">
                        {item.listingType === 'rent' ? "BOOK NOW" : "CONTACT SELLER"}
                    </button>
                </div>
            </div>
        </MobileLayout>
    );
};

export default EquipmentDetails;