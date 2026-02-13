import React, { useState } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 bg-white w-80 rounded-lg shadow-xl overflow-hidden border border-gray-100 flex flex-col">
                    <div className="bg-green-700 p-4 flex justify-between items-center text-white">
                        <h3 className="font-bold flex items-center gap-2">
                            <span>🤖</span> Krishi Bot
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
                            ✖
                        </button>
                    </div>
                    <div className="p-4 h-64 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm border border-gray-100 self-start max-w-[85%]">
                            Namaste! How can I assist you today?
                        </div>
                        {/* Simulated options */}
                        <div className="flex flex-col gap-2 mt-auto">
                            <button className="bg-green-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-green-700 transition text-left">
                                Find Equipment
                            </button>
                            <button className="bg-green-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-green-700 transition text-left">
                                My Bookings
                            </button>
                            <button className="bg-green-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-green-700 transition text-left">
                                Rental Info
                            </button>
                        </div>
                    </div>
                    <div className="p-3 border-t border-gray-100 bg-white">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full text-sm outline-none px-2 py-1"
                            disabled
                        />
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center w-14 h-14"
            >
                {isOpen ? '✖' : '💬'}
            </button>
        </div>
    );
};

export default Chatbot;
