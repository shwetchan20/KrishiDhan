import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const EquipmentDetails = ({ t }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Static dummy data for equipment details
    const item = {
        title: "Mahindra 475 DI",
        listingType: "rent",
        price: 800,
        city: "Kolhapur",
        owner: "Suresh Patil",
        description: "Well maintained Mahindra tractor, 42 HP. Ideal for plowing and heavy haulage.",
        specs: ["42 HP Engine", "8 Forward Gears", "Oil Immersed Brakes"],
        images: ["https://placehold.co/600x400?text=Tractor+View"]
    };

    return (
        <MobileLayout t={t}>
            <div className="pb-24">
                {/* Back Navigation */}
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm border">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="font-bold text-gray-800 truncate">{item.title}</h2>
                </div>

                {/* Product Image Section */}
                <div className="relative w-full h-64 bg-gray-200 rounded-3xl overflow-hidden mb-6 shadow-md">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase text-white ${item.listingType === 'rent' ? 'bg-blue-600' : 'bg-red-500'}`}>
                            {item.listingType === 'rent' ? t('rent_badge') : t('sell_badge')}
                        </span>
                    </div>
                </div>

                {/* Price and Location Information */}
                <div className="px-2 mb-6 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800">{item.title}</h1>
                        <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                            <MapPin size={14} />
                            <span>{item.city}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-green-700">₹{item.price}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                            {item.listingType === 'rent' ? t('per_day') : t('price_on_sale')}
                        </p>
                    </div>
                </div>

                {/* Owner Interaction Bar */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                            {item.owner.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[9px] text-gray-400 font-bold uppercase">Owner</p>
                            <p className="font-bold text-gray-800 text-sm">{item.owner}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Phone size={18} /></button>
                        <button className="p-2 bg-green-50 text-green-600 rounded-lg"><MessageCircle size={18} /></button>
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
};

export default EquipmentDetails;