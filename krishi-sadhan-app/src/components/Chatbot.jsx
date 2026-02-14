import React, { useState } from 'react';

const Chatbot = ({ t }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {/* Chat Window Container */}
            {isOpen && (
                <div className="mb-4 bg-white w-80 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col animate-fade-in">

                    {/* Header - Translated */}
                    <div className="bg-green-700 p-4 flex justify-between items-center text-white">
                        <h3 className="font-bold flex items-center gap-2">
                            <span className="text-xl">🤖</span> {t('krishi_bot')}
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-200">
                            ✖
                        </button>
                    </div>

                    {/* Chat Messages Area */}
                    <div className="p-4 h-72 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                        {/* Bot Greeting - Translated */}
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm border border-gray-100 self-start max-w-[90%] text-gray-700">
                            {t('bot_greeting')}
                        </div>

                        {/* Interactive Buttons - Translated */}
                        <div className="flex flex-col gap-2 mt-auto">
                            <button className="bg-green-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-green-700 transition shadow-sm text-left">
                                🔍 {t('find_equipment')}
                            </button>

                            <button className="bg-green-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-green-700 transition shadow-sm text-left">
                                ➕ {t('list_tool')}
                            </button>

                            <button className="bg-green-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-green-700 transition shadow-sm text-left">
                                📊 {t('orders')}
                            </button>
                        </div>
                    </div>

                    {/* Input Area - Translated */}
                    <div className="p-4 border-t border-gray-100 bg-white">
                        <input
                            type="text"
                            placeholder={t('type_message')}
                            className="w-full text-sm outline-none px-3 py-2 bg-gray-100 rounded-xl"
                            disabled
                        />
                    </div>
                </div>
            )}

            {/* Main Toggle Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center w-16 h-16 active:scale-95"
            >
                {isOpen ? <span className="text-xl">✖</span> : <span className="text-2xl">💬</span>}
            </button>
        </div>
    );
};

export default Chatbot;