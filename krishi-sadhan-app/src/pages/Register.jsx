import React, { useState } from 'react';

const Register = ({ t }) => {
    const [role, setRole] = useState('farmer');
    // 1. Error state add kela
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulating a validation error
        setError(t('error_required') || "This field is required.");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('register')}</h2>

            {/* 2. Error Alert Box */}
            {error && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded text-center">
                    {error}
                </div>
            )}

            <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">{t('i_am_a') || 'I am a:'}</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                    >
                        <option value="farmer">{t('role_farmer') || 'Farmer'}</option>
                        <option value="owner">{t('role_owner') || 'Owner'}</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">{t('name') || 'Name'}</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                        placeholder={t('full_name') || 'Full Name'}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">{t('email_phone') || 'Email or Phone'}</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                        placeholder={t('enter_email_phone') || 'Enter email or phone'}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">{t('password')}</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                        placeholder={t('create_password') || 'Create password'}
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold transition duration-200">
                    {t('register')}
                </button>
            </form>
        </div>
    );
};

export default Register;