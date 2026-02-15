import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, HelpCircle, LogOut, ChevronRight, Edit2, ShoppingBag, Phone, MapPin } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Profile = ({ t, setLang, currentLang }) => {
    const navigate = useNavigate();

    // Dummy user data - To be replaced with Firebase Auth data later
    const user = {
        name: "Rajesh Farmer",
        phone: "+91 98765 43210",
        location: "Kolhapur, MH",
        // Profile placeholder image
        image: "https://placehold.co/150x150?text=RF"
    };

    return (
        /* Added Green-White Gradient Background to match the new theme */
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <MobileLayout t={t}>
                <div className="pb-6">

                    {/* 1. Profile Header Card - Displays user identity */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-50 flex flex-col items-center text-center mb-6 relative overflow-hidden">
                        {/* Visual background decoration updated to matching green gradient */}
                        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-green-100 to-white z-0"></div>

                        {/* Profile Avatar with Edit Button */}
                        <div className="relative z-10">
                            <img
                                src={user.image}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover mb-3"
                            />
                            <button className="absolute bottom-2 right-0 bg-green-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm active:scale-90 transition-transform">
                                <Edit2 size={12} />
                            </button>
                        </div>

                        {/* User Contact Details */}
                        <div className="relative z-10">
                            <h2 className="text-xl font-black text-gray-800">{user.name}</h2>
                            <div className="flex items-center justify-center gap-4 mt-2 text-sm text-gray-500 font-medium">
                                <span className="flex items-center gap-1"><Phone size={14} /> {user.phone}</span>
                            </div>
                            {/* Location Badge using 'location' translation key */}
                            <div className="flex items-center justify-center gap-1 mt-1 text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full inline-flex mx-auto">
                                <MapPin size={12} /> {user.location}
                            </div>
                        </div>
                    </div>

                    {/* 2. Profile Menu Options */}
                    <div className="space-y-3 px-1">

                        {/* Navigation to Orders Page */}
                        <button
                            onClick={() => navigate('/my-orders')}
                            className="w-full bg-white p-4 rounded-2xl border border-green-50 shadow-sm flex items-center justify-between active:scale-98 transition-transform"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-green-50 p-2.5 rounded-xl text-green-700">
                                    <ShoppingBag size={20} />
                                </div>
                                <span className="font-bold text-gray-700">{t('orders')}</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-300" />
                        </button>

                        {/* Multi-language selection settings */}
                        <div className="bg-white p-4 rounded-2xl border border-green-50 shadow-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-50 p-2.5 rounded-xl text-green-700">
                                    <Globe size={20} />
                                </div>
                                <span className="font-bold text-gray-700">{t('language')}</span>
                            </div>

                            {/* Toggle buttons for English, Hindi, and Marathi */}
                            <div className="flex gap-2 pl-12">
                                {['en', 'hi', 'mr'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLang(l)}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${currentLang === l ? 'bg-green-700 text-white border-green-700 shadow-md' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
                                    >
                                        {l === 'en' ? 'English' : l === 'hi' ? 'हिंदी' : 'मराठी'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Support and Help section */}
                        <button className="w-full bg-white p-4 rounded-2xl border border-green-50 shadow-sm flex items-center justify-between active:scale-98 transition-transform">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-50 p-2.5 rounded-xl text-green-700">
                                    <HelpCircle size={20} />
                                </div>
                                <span className="font-bold text-gray-700">{t('help')}</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-300" />
                        </button>

                        {/* Logout and Exit Action */}
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 font-bold flex items-center justify-center gap-2 mt-4 active:scale-95 transition-all"
                        >
                            <LogOut size={20} /> {t('logout')}
                        </button>

                        <p className="text-center text-[10px] text-gray-400 mt-6 pb-4">
                            KrishiDhan App v1.0.0
                        </p>
                    </div>
                </div>
            </MobileLayout>
        </div>
    );
};

export default Profile;