import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, Plus, ShoppingBag, User } from 'lucide-react';

const MobileLayout = ({ children, t }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to color active icons green
    const isActive = (path) => location.pathname === path ? "text-green-700" : "text-gray-400";

    return (
        <div className="bg-gray-50 min-h-screen pb-24">

            {/* --- TOP HEADER UI --- */}
            <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 px-4 py-3 flex justify-between items-center">
                <div className="w-10"></div> {/* Spacer */}
                <img
                    src="https://raw.githubusercontent.com/shwetchan20/KrishiDhan-Assets/main/logo.png"
                    alt="KrishiDhan"
                    className="h-8 object-contain"
                />
                <div className="w-10 flex justify-end">
                    {/* Location UI - Translated */}
                    <div className="flex flex-col items-end leading-none">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{t('location')}</span>
                        <span className="text-xs font-bold text-green-700 flex items-center">📍 Kolhapur</span>
                    </div>
                </div>
            </header>

            {/* --- MAIN PAGE CONTENT --- */}
            <main className="pt-16 px-4">
                {children}
            </main>

            {/* --- BOTTOM NAVIGATION UI --- */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">

                <button onClick={() => navigate('/home')} className={`flex flex-col items-center gap-1 ${isActive('/home')}`}>
                    <Home size={22} />
                    <span className="text-[10px] font-bold uppercase">{t('home')}</span>
                </button>

                <button onClick={() => navigate('/categories')} className={`flex flex-col items-center gap-1 ${isActive('/categories')}`}>
                    <Grid size={22} />
                    <span className="text-[10px] font-bold uppercase">{t('category')}</span>
                </button>

                {/* Floating Plus Button - Visual only, no translation needed */}
                <div className="relative -top-5">
                    <button
                        onClick={() => navigate('/post-choice')}
                        className="bg-white p-1.5 rounded-full shadow-lg border border-gray-100"
                    >
                        <div className="bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform text-xl font-bold">
                            +
                        </div>
                    </button>
                </div>

                <button onClick={() => navigate('/my-orders')} className={`flex flex-col items-center gap-1 ${isActive('/my-orders')}`}>
                    <ShoppingBag size={22} />
                    <span className="text-[10px] font-bold uppercase">{t('orders')}</span>
                </button>

                <button onClick={() => navigate('/profile')} className={`flex flex-col items-center gap-1 ${isActive('/profile')}`}>
                    <User size={22} />
                    <span className="text-[10px] font-bold uppercase">{t('profile')}</span>
                </button>

            </nav>
        </div>
    );
};

export default MobileLayout;