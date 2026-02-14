import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const Profile = ({ t, setLang, currentLang }) => {
    const navigate = useNavigate();

    // Dummy user data aligned with your schema
    const user = {
        name: "Rajesh Farmer",
        phone: "+91 98765 43210",
        city: "Kolhapur, MH",
        image: "https://placehold.co/150x150?text=RF"
    };

    return (
        <MobileLayout t={t}>
            <div className="pb-6">
                {/* 1. Profile Header */}
                <div className="bg-white p-6 mb-4 rounded-b-3xl shadow-sm flex flex-col items-center">
                    <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full border-4 border-green-50 object-cover mb-4" />
                    <h2 className="text-xl font-black text-gray-800">{user.name}</h2>
                    <p className="text-sm text-gray-500 font-medium mt-1">{user.phone}</p>
                    <div className="mt-2 inline-flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full text-xs font-bold text-green-700">
                        <span>📍 {user.city}</span>
                    </div>
                </div>

                <div className="px-4 space-y-3">
                    {/* 2. My Orders Button - Added back */}
                    <button
                        onClick={() => navigate('/my-orders')}
                        className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center justify-between active:scale-95 transition-transform"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                <ShoppingBag size={20} />
                            </div>
                            <span className="font-bold text-gray-700">{t('orders')}</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-300" />
                    </button>

                    {/* 3. Language Selection Section */}
                    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
                        <div className="flex items-center gap-4 text-orange-600">
                            <Globe size={20} />
                            <span className="font-bold text-gray-700">{t('language')}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                            {['en', 'hi', 'mr'].map((l) => (
                                <button
                                    key={l}
                                    onClick={() => setLang(l)}
                                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${currentLang === l ? 'bg-green-700 text-white border-green-700' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
                                >
                                    {l === 'en' ? 'English' : l === 'hi' ? 'हिंदी' : 'मराठी'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 4. Help & Support */}
                    <button className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center justify-between active:scale-95 transition-transform">
                        <div className="flex items-center gap-4">
                            <HelpCircle size={20} className="text-purple-600" />
                            <span className="font-bold text-gray-700">{t('help')}</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-300" />
                    </button>

                    {/* 5. Logout */}
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-red-50 text-red-600 p-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 active:scale-95 transition-all"
                    >
                        <LogOut size={20} /> {t('logout')}
                    </button>
                    <p className="text-center text-xs text-gray-300 mt-4">App Version 1.0.0</p>
                </div>
            </div>
        </MobileLayout>
    );
};

export default Profile;