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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = { id: Date.now(), text: input, sender: 'user', isKey: false };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: "Thank you for your message. Our expert will contact you soon.",
                sender: 'bot',
                isKey: false
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className={`fixed bottom-24 right-4 z-[60] flex flex-col items-end gap-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {isOpen && (
                /* Updated Chat Window with Green-White Gradient */
                <div className="bg-gradient-to-b from-green-50 to-white w-80 h-96 rounded-2xl shadow-2xl border border-green-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto">
                    <div className="bg-green-700 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-white p-1 rounded-full flex items-center justify-center">
                                <img src="/logo.jpeg" alt="Bot Logo" className="w-5 h-5 object-contain" />
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

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-transparent">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium ${msg.sender === 'user'
                                    ? 'bg-green-700 text-white rounded-tr-none'
                                    : 'bg-white text-gray-700 border border-green-50 rounded-tl-none shadow-sm'
                                    }`}>
                                    {msg.isKey ? t(msg.text) : msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-green-50 px-3 py-2 rounded-2xl rounded-tl-none shadow-sm text-gray-400 text-[10px]">typing...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white border-t border-green-50 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('type_message')}
                            className="flex-1 bg-green-50/50 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                        />
                        <button onClick={handleSend} disabled={!input.trim()} className="bg-green-700 text-white p-2 rounded-full disabled:opacity-50 hover:scale-105 transition-transform">
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto bg-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all border-2 border-green-700 overflow-hidden"
            >
                {isOpen ? <X size={28} className="text-green-700" /> : <img src="/logo.jpeg" className="w-full h-full object-contain" alt="Open Bot" />}
            </button>
        </div>
    );
};

export default Chatbot;