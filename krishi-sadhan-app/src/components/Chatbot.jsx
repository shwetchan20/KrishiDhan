import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minus, RefreshCw } from 'lucide-react';

const Chatbot = ({ t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "bot_greeting", sender: 'bot', isKey: true }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user', isKey: false };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate Bot Response
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "Thank you for your message. Our expert will contact you soon.", // Placeholder logic
                sender: 'bot',
                isKey: false
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    // --- POSITION FIX IS HERE ---
    // Changed 'bottom-4' to 'bottom-24' to stay above the Navigation Bar
    return (
        <div className={`fixed bottom-24 right-4 z-[60] flex flex-col items-end gap-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto">

                    {/* Header */}
                    <div className="bg-green-700 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-full">
                                <MessageCircle size={18} />
                            </div>
                            <span className="font-bold text-sm">{t('krishi_bot')}</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setMessages([{ id: 1, text: "bot_greeting", sender: 'bot', isKey: true }])} className="hover:bg-white/20 p-1 rounded transition">
                                <RefreshCw size={16} />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
                                <Minus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${msg.sender === 'user'
                                        ? 'bg-green-700 text-white rounded-tr-none'
                                        : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none shadow-sm'
                                    }`}>
                                    {msg.isKey ? t(msg.text) : msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 px-3 py-2 rounded-2xl rounded-tl-none shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('type_message')}
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="bg-green-700 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto bg-green-700 text-white w-14 h-14 rounded-full shadow-lg shadow-green-200 flex items-center justify-center hover:scale-105 transition-all border-4 border-white"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default Chatbot;