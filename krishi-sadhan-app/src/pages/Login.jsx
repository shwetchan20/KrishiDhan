import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ t }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-6">
            <img src="/logo.jpeg" alt="KrishiDhan Logo" className="w-48 mb-8 object-contain mx-auto" />

            <div className="w-full max-w-sm bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-green-100">
                <div className="flex border-b border-green-50 mb-8">
                    <button className="flex-1 pb-2 border-b-2 border-green-700 font-bold text-green-700">{t('login')}</button>
                    <Link to="/register" className="flex-1 pb-2 text-gray-400 text-center font-medium">{t('register')}</Link>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t('email_address')}</label>
                        <input type="email" placeholder="contact@gmail.com" className="w-full border-b py-3 outline-none focus:border-green-700 bg-transparent font-medium" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t('password')}</label>
                        <input type="password" placeholder="••••••••" className="w-full border-b py-3 outline-none focus:border-green-700 bg-transparent font-medium" />
                    </div>

                    <button onClick={() => navigate('/home')} className="w-full bg-green-700 text-white py-4 rounded-xl font-black shadow-lg active:scale-95 transition-all">
                        {t('login').toUpperCase()}
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                    </div>

                    <button className="w-full border-2 border-green-50 py-3 rounded-xl flex items-center justify-center gap-3 font-bold text-gray-700 bg-white shadow-sm">
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;