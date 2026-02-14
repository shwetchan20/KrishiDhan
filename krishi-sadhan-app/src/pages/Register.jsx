import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ t }) => {
    const navigate = useNavigate();

    // State matching strict schema: name, phone, city, email, password
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleRegister = (e) => {
        e.preventDefault();

        // Validation using translation keys
        if (formData.password !== formData.confirmPassword) {
            setError(t('passwords_not_match'));
            return;
        }

        if (!formData.name || !formData.phone || !formData.city || !formData.email) {
            setError(t('all_fields_required'));
            return;
        }

        // Prepare data for backend createUser function
        console.log("Registering with schema:", formData);
        alert("Registration Successful!");
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10 font-sans">
            <div className="w-full max-w-sm">

                {/* Header UI - Translated */}
                <div className="text-center mb-10">
                    <img
                        src="https://raw.githubusercontent.com/shwetchan20/KrishiDhan-Assets/main/logo.png"
                        alt="Logo"
                        className="w-24 mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-black text-gray-800">{t('register')}</h2>
                    <p className="text-gray-400 text-sm mt-1">Join the KrishiDhan marketplace</p>
                </div>

                {/* Error Message UI */}
                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl text-center font-bold">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleRegister}>
                    {/* Schema: Full Name */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('full_name')}</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors"
                            placeholder="John Doe"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Schema: Email */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('email_address')}</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors"
                            placeholder="name@example.com"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Schema: Phone */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('mobile_label')}</label>
                        <input
                            type="tel"
                            name="phone"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors"
                            placeholder="9876543210"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Schema: City */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('city_village')}</label>
                        <input
                            type="text"
                            name="city"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors"
                            placeholder="Kolhapur"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Auth: Password */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('password')}</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('confirm_password')}</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white font-black py-4 rounded-xl mt-4 shadow-lg active:scale-95 transition-all"
                    >
                        {t('register').toUpperCase()}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="text-green-700 font-bold hover:underline ml-1">{t('login')}</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;