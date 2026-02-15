import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = ({ t }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Automatically navigate to Login after 3 seconds
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div onClick={() => navigate('/login')} className="cursor-pointer flex flex-col items-center">
                {/* Official Brand Logo - Enlarged and using local path */}
                <img
                    src="/logo.jpeg"
                    alt="KrishiDhan Logo"
                    className="w-80 h-auto animate-pulse"
                />
            </div>
        </div>
    );
};

export default SplashScreen;