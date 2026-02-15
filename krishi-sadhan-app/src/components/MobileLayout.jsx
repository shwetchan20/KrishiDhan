import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User, MapPin } from 'lucide-react';

const MobileLayout = ({ children, t }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "text-green-700" : "text-gray-400";

    return (
        <div className="bg-gray-50 min-h-screen pb-24 font-sans">

            {/* --- TOP HEADER UI --- */}
            <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 px-4 py-3 flex justify-between items-center">

                {/* Left: Empty Spacer to balance the layout (फक्त जागा सोडण्यासाठी) */}
                <div className="w-16"></div>

                {/* Center: Logo & Title (मध्यभागी) */}
                <div className="flex flex-col items-center">
                    <img
                        src="https://raw.githubusercontent.com/shwetchan20/KrishiDhan-Assets/main/logo.png"
                        alt="KrishiDhan"
                        className="h-6 object-contain mb-1"
                    />
                    <h1 className="text-[10px] font-black text-gray-800 tracking-wide uppercase">
                        Welcome to KrishiDhan
                    </h1>
                </div>

                {/* Right: Location Badge */}
                <div className="w-16 flex justify-end">
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                        <MapPin size={12} className="text-green-700" />
                        <span className="text-[10px] font-bold text-green-800">Kolhapur</span>
                    </div>
                </div>
            </header>

            <main className="pt-20 px-4">
                {children}
            </main>

            {/* --- BOTTOM NAVIGATION (Same as before) --- */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
                <button onClick={() => navigate('/home')} className={`flex flex-col items-center gap-1 w-16 ${isActive('/home')}`}>
                    <Home size={22} strokeWidth={location.pathname === '/home' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold uppercase">{t('home')}</span>
                </button>
                <button onClick={() => navigate('/categories')} className={`flex flex-col items-center gap-1 w-16 ${isActive('/categories')}`}>
                    <Grid size={22} strokeWidth={location.pathname === '/categories' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold uppercase">{t('category')}</span>
                </button>
                <div className="relative -top-6">
                    <button onClick={() => navigate('/post-choice')} className="bg-gray-50 p-1.5 rounded-full">
                        <div className="bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-transform hover:bg-green-800">
                            <span className="text-3xl font-light mb-1">+</span>
                        </div>
                    </button>
                </div>
                <button onClick={() => navigate('/my-orders')} className={`flex flex-col items-center gap-1 w-16 ${isActive('/my-orders')}`}>
                    <ShoppingBag size={22} strokeWidth={location.pathname === '/my-orders' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold uppercase">{t('orders')}</span>
                </button>
                <button onClick={() => navigate('/profile')} className={`flex flex-col items-center gap-1 w-16 ${isActive('/profile')}`}>
                    <User size={22} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold uppercase">{t('profile')}</span>
                </button>
            </nav>
        </div>
    );
};

export default MobileLayout;