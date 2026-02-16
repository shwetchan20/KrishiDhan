import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User, MapPin, Plus } from 'lucide-react';

const MobileLayout = ({ children, t }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "text-green-600 scale-110" : "text-gray-400";

    const locationLabel = (() => {
        try {
            const user = JSON.parse(localStorage.getItem('kd_user') || '{}');
            if (user?.city) return user.city;

            const coords = JSON.parse(localStorage.getItem('kd_user_coords') || 'null');
            if (coords?.lat && coords?.lng) {
                return `${Number(coords.lat).toFixed(2)}, ${Number(coords.lng).toFixed(2)}`;
            }
        } catch {
            // no-op
        }
        return 'Location';
    })();

    return (
        <div className="bg-[#F8FAFC] min-h-screen font-sans max-w-md mx-auto shadow-2xl overflow-x-hidden relative">
            <header className="fixed top-0 max-w-md w-full bg-white/80 backdrop-blur-md z-40 px-4 py-3 flex justify-between items-center border-b border-gray-50 shadow-sm">
                <div className="w-12"></div>

                <div className="flex flex-col items-center">
                    <img
                        src="/logo.jpeg"
                        alt="KrishiDhan Logo"
                        className="h-9 object-contain"
                    />
                </div>

                <div className="w-12 flex justify-end">
                    <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-2xl border border-green-100/50">
                        <MapPin size={10} className="text-green-700" />
                        <span className="text-[9px] font-black text-green-800 uppercase tracking-tight truncate max-w-14">{locationLabel}</span>
                    </div>
                </div>
            </header>

            <main className="pt-20 pb-32 px-4 bg-transparent">
                {children}
            </main>

            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-50">
                <nav className="bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[32px] px-2 py-3 flex items-center justify-around relative">
                    <button onClick={() => navigate('/home')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive('/home')}`}>
                        <div className={`p-2 rounded-xl ${location.pathname === '/home' ? 'bg-green-50' : ''}`}>
                            <Home size={22} strokeWidth={location.pathname === '/home' ? 2.5 : 2} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">{t('home')}</span>
                    </button>

                    <button onClick={() => navigate('/categories')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive('/categories')}`}>
                        <div className={`p-2 rounded-xl ${location.pathname === '/categories' ? 'bg-green-50' : ''}`}>
                            <Grid size={22} strokeWidth={location.pathname === '/categories' ? 2.5 : 2} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">{t('category')}</span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => navigate('/post-choice')}
                            className="absolute -top-14 left-1/2 -translate-x-1/2 w-16 h-16 bg-green-600 text-white rounded-full shadow-lg shadow-green-900/30 flex items-center justify-center border-4 border-[#F8FAFC] active:scale-90 transition-transform"
                        >
                            <Plus size={32} strokeWidth={3} />
                        </button>
                        <div className="w-12 h-8"></div>
                    </div>

                    <button onClick={() => navigate('/my-orders')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive('/my-orders')}`}>
                        <div className={`p-2 rounded-xl ${location.pathname === '/my-orders' ? 'bg-green-50' : ''}`}>
                            <ShoppingBag size={22} strokeWidth={location.pathname === '/my-orders' ? 2.5 : 2} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">{t('orders')}</span>
                    </button>

                    <button onClick={() => navigate('/profile')} className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive('/profile')}`}>
                        <div className={`p-2 rounded-xl ${location.pathname === '/profile' ? 'bg-green-50' : ''}`}>
                            <User size={22} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">{t('profile')}</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default MobileLayout;
