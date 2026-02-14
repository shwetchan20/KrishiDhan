import React from 'react';

// 1. Props mein 't' accept karo
const Booking = ({ t }) => {
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            {/* 2. Translate Page Title */}
            <h2 className="text-2xl font-bold mb-6">{t('confirm_booking_title') || 'Confirm Booking'}</h2>

            <div className="mb-6">
                <h3 className="font-semibold">{t('selected_equipment') || 'Selected Equipment:'}</h3>
                <p className="text-gray-600">John Deere Tractor</p>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block mb-1">{t('start_date') || 'Start Date'}</label>
                    <input type="date" className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block mb-1">{t('duration_days') || 'Duration (Days)'}</label>
                    <input type="number" min="1" className="w-full border p-2 rounded" defaultValue="1" />
                </div>

                <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                        <span>{t('total_amount') || 'Total Amount:'}</span>
                        <span>₹1200</span>
                    </div>
                </div>

                <button type="button" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 mt-6 font-bold">
                    {t('confirm_booking_btn') || 'Confirm Booking'}
                </button>
            </form>
        </div>
    );
};

export default Booking;