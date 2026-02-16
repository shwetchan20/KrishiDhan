import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minus, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Chatbot = ({ t }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "bot_greeting", sender: 'bot', isKey: true }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Automatically scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const appendBot = (text) => {
        setMessages((prev) => [...prev, { id: Date.now() + Math.random(), text, sender: 'bot', isKey: false }]);
    };

    const handleIntent = (rawText) => {
        const text = String(rawText || '').toLowerCase().trim();

        if (!text) {
            appendBot('Please type your question.');
            return;
        }

        if (text.includes('post') || text.includes('sell') || text.includes('rent out') || text.includes('list')) {
            appendBot('To post equipment: Tap + button -> choose Rent or Sell -> fill details -> upload images -> submit.');
            navigate('/post-choice');
            return;
        }

        if (text.includes('book') || text.includes('buy') || text.includes('request')) {
            appendBot('To book: Open a listing -> select dates (for rent) -> add message -> tap BOOK NOW. You can also use WhatsApp button.');
            navigate('/home');
            return;
        }

        if (text.includes('order') || text.includes('history') || text.includes('status')) {
            appendBot('You can track all pending and completed requests in My Orders.');
            navigate('/my-orders');
            return;
        }

        if (text.includes('profile') || text.includes('account') || text.includes('language')) {
            appendBot('Profile page lets you update name, city, phone, photo, and language.');
            navigate('/profile');
            return;
        }

        if (text.includes('category') || text.includes('tool') || text.includes('tractor') || text.includes('search')) {
            appendBot('Use Categories to filter tools, or use search on Home for quick results.');
            navigate('/categories');
            return;
        }

        if (text.includes('scheme') || text.includes('government') || text.includes('yojana')) {
            appendBot('Government schemes are available on the Home page and full list in Schemes.');
            navigate('/schemes');
            return;
        }

        appendBot('I can help with: Post listing, Book/Buy, Orders, Profile, Categories, and Schemes.');
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const outgoing = input.trim();
        const userMsg = { id: Date.now(), text: outgoing, sender: 'user', isKey: false };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            handleIntent(outgoing);
        }, 350);
    };

    const handleQuickAction = (text) => {
        setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'user', isKey: false }]);
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            handleIntent(text);
        }, 250);
    };

    return (
        <div className={`fixed bottom-32 right-4 z-[60] flex flex-col items-end gap-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>

            {/* Chat Interface Window */}
            {isOpen && (
                <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto">

                    {/* Chat Header with Branding */}
                    <div className="bg-green-700 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-white p-1 rounded-full flex items-center justify-center">
                                {/* Official Logo using local path */}
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
                                <div className="bg-white border border-gray-200 px-3 py-2 rounded-2xl rounded-tl-none shadow-sm text-gray-400 text-[10px]">typing...</div>
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2 pt-1">
                            <button onClick={() => handleQuickAction('Post listing')} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-full text-gray-700">Post listing</button>
                            <button onClick={() => handleQuickAction('How to book')} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-full text-gray-700">How to book</button>
                            <button onClick={() => handleQuickAction('My orders')} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-full text-gray-700">My orders</button>
                            <button onClick={() => handleQuickAction('Government schemes')} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-full text-gray-700">Schemes</button>
                        </div>
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('type_message')}
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                        />
                        <button onClick={handleSend} disabled={!input.trim()} className="bg-green-700 text-white p-2 rounded-full disabled:opacity-50 hover:scale-105 transition-transform">
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Floating Action Button */}
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
