import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ t }) => {
    const navigate = useNavigate();

    // Form state handling basic user schema - Full Data Preserved
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

        // Basic password validation logic
        if (formData.password !== formData.confirmPassword) {
            setError(t('passwords_not_match'));
            return;
        }

        console.log("Registering user:", formData);
        alert("Registration Successful!");
        navigate('/login');
    };

    return (
        /* Added the full Green-White Gradient background here */
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-6 py-10 font-sans">
            <div className="w-full max-w-sm">

                <div className="text-center mb-8">
                    {/* Centered Brand Logo */}
                    <img
                        src="/logo.jpeg"
                        alt="KrishiDhan Logo"
                        className="w-32 mx-auto mb-4 object-contain"
                    />
                    <h2 className="text-2xl font-black text-gray-800">{t('register')}</h2>
                    <p className="text-gray-400 text-sm mt-1">Join the KrishiDhan marketplace</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl text-center font-bold">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleRegister}>
                    {/* Full Name Field */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('full_name')}</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors bg-transparent"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email Address Field */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('email_address')}</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors bg-transparent"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('phone_label')}</label>
                        <input
                            type="tel"
                            name="phone"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors bg-transparent"
                            placeholder="9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* City Field */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('city_label')}</label>
                        <input
                            type="text"
                            name="city"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors bg-transparent"
                            placeholder="Kolhapur"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('password')}</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors bg-transparent"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{t('confirm_password')}</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full border-b py-2 outline-none focus:border-green-700 font-medium transition-colors bg-transparent"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
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