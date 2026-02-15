import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = ({ t }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => { navigate('/login'); }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
            <div onClick={() => navigate('/login')} className="cursor-pointer flex flex-col items-center animate-in fade-in zoom-in duration-700">
                <img src="/logo.jpeg" alt="KrishiDhan Logo" className="w-80 h-auto animate-pulse" />
            </div>
        </div>
    );
};

export default SplashScreen;