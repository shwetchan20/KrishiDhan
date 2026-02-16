import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithEmail } from '../services';

const Login = ({ t }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        const result = await loginWithEmail({ email, password });
        setLoading(false);

        if (!result.ok) {
            setError(result.message || 'Login failed');
            return;
        }

        localStorage.setItem('kd_uid', result.data.uid);
        localStorage.setItem('kd_user', JSON.stringify(result.data.profile || {}));
        navigate('/home');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
            <img
                src="/logo.jpeg"
                alt="KrishiDhan Logo"
                className="w-48 mb-8 object-contain mx-auto"
            />

            <div className="w-full max-w-sm">
                <div className="flex border-b mb-8">
                    <button className="flex-1 pb-2 border-b-2 border-green-700 font-bold text-green-700">{t('login')}</button>
                    <Link to="/register" className="flex-1 pb-2 text-gray-400 text-center font-medium">{t('register')}</Link>
                </div>

                <div className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl text-center font-bold">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t('email_address')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="contact@gmail.com"
                            className="w-full border-b py-3 outline-none focus:border-green-700 transition-colors font-medium"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t('password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="........"
                            className="w-full border-b py-3 outline-none focus:border-green-700 transition-colors font-medium"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-green-700 text-white py-4 rounded-xl font-black shadow-lg hover:bg-green-800 active:scale-95 transition-all disabled:opacity-60"
                    >
                        {loading ? (t('loading') || 'Loading...') : t('login').toUpperCase()}
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <button
                        type="button"
                        disabled
                        className="w-full border-2 border-gray-100 py-3 rounded-xl flex items-center justify-center gap-3 font-bold text-gray-500 bg-gray-50 cursor-not-allowed"
                    >
                        Google Login (Coming Soon)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
