import React, { useState } from 'react';

const Login = ({ t }) => {
    // 1. Error state sathi navin variable
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Ithe tumche actual logic yeil (Firebase/Auth)
        // Sadhyasathi apan simulated error dakhvat ahot
        setError(t('error_invalid_credentials') || "Invalid login details.");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('login')}</h2>

            {/* 2. Error Message Display */}
            {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded text-center">
                    {error}
                </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        {t('email_phone')}
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                        placeholder={t('enter_email_phone')}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        {t('password')}
                    </label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                        placeholder={t('enter_password')}
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold transition duration-200">
                    {t('login')}
                </button>
            </form>
        </div>
    );
};

export default Login;