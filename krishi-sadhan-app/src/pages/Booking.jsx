import React from 'react';

const Booking = () => {
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Confirm Booking</h2>
            <div className="mb-6">
                <h3 className="font-semibold">Selected Equipment:</h3>
                <p className="text-gray-600">John Deere Tractor</p>
            </div>
            <form className="space-y-4">
                <div>
                    <label className="block mb-1">Start Date</label>
                    <input type="date" className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block mb-1">Duration (Days)</label>
                    <input type="number" min="1" className="w-full border p-2 rounded" defaultValue="1" />
                </div>
                <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total Amount:</span>
                        <span>₹1200</span>
                    </div>
                </div>
                <button type="button" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 mt-6 font-bold">
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default Booking;
