import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ t }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
            {/* Top Center Logo */}
            <img
                src="https://raw.githubusercontent.com/shwetchan20/KrishiDhan-Assets/main/logo.png"
                alt="Logo"
                className="w-32 mb-10"
            />

            <div className="w-full max-w-sm">
                {/* UI Tabs - Translated */}
                <div className="flex border-b mb-8">
                    <button className="flex-1 pb-2 border-b-2 border-green-700 font-bold text-green-700">{t('login')}</button>
                    <Link to="/register" className="flex-1 pb-2 text-gray-400 text-center font-medium">{t('register')}</Link>
                </div>

                {/* Form UI - Translated */}
                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t('email_address')}</label>
                        <input
                            type="email"
                            placeholder="contact@gmail.com"
                            className="w-full border-b py-3 outline-none focus:border-green-700 transition-colors font-medium"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t('password')}</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full border-b py-3 outline-none focus:border-green-700 transition-colors font-medium"
                        />
                    </div>

                    <button
                        onClick={() => navigate('/home')}
                        className="w-full bg-green-700 text-white py-4 rounded-xl font-black shadow-lg hover:bg-green-800 active:scale-95 transition-all"
                    >
                        {t('login').toUpperCase()}
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <button className="w-full border-2 border-gray-100 py-3 rounded-xl flex items-center justify-center gap-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;