import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, HelpCircle, LogOut, ChevronRight, Edit2, ShoppingBag, Phone, MapPin } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Profile = ({ t, setLang, currentLang }) => {
    const navigate = useNavigate();

    // Dummy User Data
    const user = {
        name: "Rajesh Farmer",
        phone: "+91 98765 43210",
        location: "Kolhapur, MH",
        image: "https://placehold.co/150x150?text=RF" // You can replace with local asset later
    };

    return (
        <MobileLayout t={t}>
            <div className="pb-6">

                {/* 1. Profile Header Card */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center mb-6 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-20 bg-green-50 z-0"></div>

                    {/* Profile Image */}
                    <div className="relative z-10">
                        <img
                            src={user.image}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover mb-3"
                        />
                        <button className="absolute bottom-2 right-0 bg-green-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                            <Edit2 size={12} />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="relative z-10">
                        <h2 className="text-xl font-black text-gray-800">{user.name}</h2>
                        <div className="flex items-center justify-center gap-4 mt-2 text-sm text-gray-500 font-medium">
                            <span className="flex items-center gap-1"><Phone size={14} /> {user.phone}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 mt-1 text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full inline-flex mx-auto">
                            <MapPin size={12} /> {user.location}
                        </div>
                    </div>
                </div>

                {/* 2. Menu Options */}
                <div className="space-y-3 px-1">

                    {/* My Orders Link */}
                    <button
                        onClick={() => navigate('/my-orders')}
                        className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between active:scale-98 transition-transform"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                                <ShoppingBag size={20} />
                            </div>
                            <span className="font-bold text-gray-700">{t('orders')}</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-300" />
                    </button>

                    {/* Language Settings */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-50 p-2.5 rounded-xl text-orange-600">
                                <Globe size={20} />
                            </div>
                            <span className="font-bold text-gray-700">{t('language')}</span>
                        </div>

                        {/* Language Buttons */}
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

                    {/* Help & Support */}
                    <button className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between active:scale-98 transition-transform">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600">
                                <HelpCircle size={20} />
                            </div>
                            <span className="font-bold text-gray-700">{t('help')}</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-300" />
                    </button>

                    {/* Logout Button */}
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
    );
};

export default Profile;