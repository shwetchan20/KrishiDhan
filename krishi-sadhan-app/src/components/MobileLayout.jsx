import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User, MapPin } from 'lucide-react';

const MobileLayout = ({ children, t }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "text-green-700" : "text-gray-400";

    return (
        <div className="bg-gray-50 min-h-screen pb-24 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative">

            {/* --- STICKY TOP HEADER --- */}
            <header className="fixed top-0 max-w-md w-full bg-white shadow-sm z-40 px-4 py-3 flex justify-between items-center border-b">
                <div className="w-12"></div>

                <div className="flex flex-col items-center">
                    {/* Using local logo from public folder */}
                    <img
                        src="/logo.jpeg"
                        alt="KrishiDhan Logo"
                        className="h-10 object-contain"
                    />
                </div>

                <div className="w-12 flex justify-end">
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                        <MapPin size={10} className="text-green-700" />
                        <span className="text-[9px] font-black text-green-800 uppercase">Kolhapur</span>
                    </div>
                </div>
            </header>

            <main className="pt-20 px-4">
                {children}
            </main>

            {/* --- BOTTOM TAB NAVIGATION --- */}
            <nav className="fixed bottom-0 max-w-md w-full bg-white border-t border-gray-100 flex justify-around items-center py-2 z-50 shadow-inner">
                <button onClick={() => navigate('/home')} className={`flex flex-col items-center gap-1 w-16 ${isActive('/home')}`}>
                    <Home size={22} strokeWidth={location.pathname === '/home' ? 2.5 : 2} />
                    <span className="text-[9px] font-black uppercase tracking-tighter">{t('home')}</span>
                </button>

                <button onClick={() => navigate('/categories')} className={`flex flex-col items-center gap-1 w-16 ${isActive('/categories')}`}>
                    <Grid size={22} strokeWidth={location.pathname === '/categories' ? 2.5 : 2} />
                    <span className="text-[9px] font-black uppercase tracking-tighter">{t('category')}</span>
                </button>

                <div className="relative -top-6">
                    <button onClick={() => navigate('/post-choice')} className="bg-gray-50 p-2 rounded-full border-t">
                        <div className="bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                            <span className="text-2xl font-light">+</span>
                        </div>
                    </button>
                </div>

                <button onClick={() => navigate('/my-orders')} className={`flex flex-col items-center gap-1 w-16 ${isActive('/my-orders')}`}>
                    <ShoppingBag size={22} strokeWidth={location.pathname === '/my-orders' ? 2.5 : 2} />
                    <span className="text-[9px] font-black uppercase tracking-tighter">{t('orders')}</span>
                </button>

                <button onClick={() => navigate('/profile')} className={`flex flex-col items-center gap-1 w-16 ${isActive('/profile')}`}>
                    <User size={22} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
                    <span className="text-[9px] font-black uppercase tracking-tighter">{t('profile')}</span>
                </button>
            </nav>
        </div>
    );
};

export default MobileLayout;