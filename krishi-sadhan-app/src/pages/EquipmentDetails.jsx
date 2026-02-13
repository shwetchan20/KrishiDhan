import React from 'react';
import { useParams, Link } from 'react-router-dom';

// 1. Accept the 't' prop
const EquipmentDetails = ({ t }) => {
    const { id } = useParams();

    // Mock data for display
    const equipment = {
        id: id,
        name: 'Mahindra 475 DI Tractor',
        image: 'https://via.placeholder.com/600x400?text=Tractor+Image',
        price: 500,
        unit: 'Hour',
        location: 'Nashik, Maharashtra',
        description: '42 HP Tractor, efficient for tillage and haulage operations. Well maintained and ready for field work.'
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Left Column: Image */}
                        <div className="h-64 md:h-auto bg-gray-200 relative">
                            <img
                                src={equipment.image}
                                alt={equipment.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Right Column: Details & Booking Form */}
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{equipment.name}</h1>
                            <div className="flex flex-col gap-1 mb-6 text-gray-600">
                                <p className="text-lg">
                                    <span className="font-semibold text-gray-800">{t('price') || 'Price'}:</span> ₹{equipment.price} / {equipment.unit}
                                </p>
                                <p className="text-lg">
                                    <span className="font-semibold text-gray-800">{t('location_label') || 'Location'}:</span> {equipment.location}
                                </p>
                            </div>

                            {/* Booking Form */}
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">{t('book_this_title') || 'Book This Equipment'}</h3>
                                <form className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                    <div className="relative">
                                        <select className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                                            <option value="">{t('select_time') || 'Select Time'}</option>
                                            <option value="morning">{t('time_morning') || 'Morning (8 AM - 12 PM)'}</option>
                                            <option value="afternoon">{t('time_afternoon') || 'Afternoon (12 PM - 4 PM)'}</option>
                                            <option value="evening">{t('time_evening') || 'Evening (4 PM - 8 PM)'}</option>
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            placeholder={t('enter_mobile') || 'Enter Mobile Number'}
                                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>

                                    <div className="pt-4 space-y-3">
                                        <button type="button" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg transition-colors shadow-sm">
                                            {t('confirm_booking') || 'Confirm Booking'}
                                        </button>
                                        <button type="button" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
                                            <span>💬</span> {t('chat_whatsapp') || 'Chat on WhatsApp'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentDetails;