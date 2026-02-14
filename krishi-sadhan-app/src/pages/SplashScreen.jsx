import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = ({ t }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // UI Logic: Wait 3 seconds, then go to Login
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            {/* Logo Only - No text below as requested */}
            <div onClick={() => navigate('/login')} className="cursor-pointer">
                <img
                    src="https://raw.githubusercontent.com/shwetchan20/KrishiDhan-Assets/main/logo.png"
                    alt="KrishiDhan Logo"
                    className="w-64 md:w-80 h-auto animate-pulse"
                />
            </div>
        </div>
    );
};

export default SplashScreen;