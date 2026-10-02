import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { loginWithEmail } from '../services';

const Login = ({ t }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError('');
        setSuccessMsg('');
        setLoading(true);

        const result = await loginWithEmail({ email, password });
        setLoading(false);

        if (!result.ok) {
            setError(result.message || 'Login failed');
            return;
        }

        localStorage.setItem('kd_uid', result.data.uid);
        localStorage.setItem('kd_user', JSON.stringify(result.data.profile || {}));
        setSuccessMsg(t('login_success') || 'Login Successful! Welcome to KrishiDhan...');
        
        setTimeout(() => {
            navigate('/home');
        }, 800);
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
                    {successMsg && (
                        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded-2xl flex items-center gap-3 font-bold shadow-sm animate-in fade-in zoom-in-95 duration-200">
                            <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs rounded-2xl flex items-center gap-3 font-bold shadow-sm animate-in fade-in zoom-in-95 duration-200">
                            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                            <span>{error}</span>
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
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="........"
                                className="w-full border-b py-3 pr-10 outline-none focus:border-green-700 transition-colors font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
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
