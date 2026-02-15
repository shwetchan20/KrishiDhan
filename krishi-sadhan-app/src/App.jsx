import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { translations } from './utils/translations';

// --- PAGE IMPORTS ---
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PostChoice from './pages/PostChoice';
import PostEquipment from './pages/PostEquipment';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import Categories from './pages/Categories';
import EquipmentDetails from './pages/EquipmentDetails';
import Schemes from './pages/Schemes'; // <--- Imported Schemes Page
import Chatbot from './components/Chatbot';

function App() {
    // 1. Language State
    const [lang, setLang] = useState('en');

    // 2. Translation Helper
    const t = (key) => translations[lang][key] || key;

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans relative">
                <Routes>
                    <Route path="/" element={<SplashScreen t={t} />} />
                    <Route path="/login" element={<Login t={t} />} />
                    <Route path="/register" element={<Register t={t} />} />

                    {/* Main App Flow */}
                    <Route path="/home" element={<Home t={t} />} />

                    <Route path="/post-choice" element={<PostChoice t={t} />} />
                    <Route path="/post-equipment" element={<PostEquipment t={t} />} />

                    {/* Equipment Details Route */}
                    <Route path="/equipment/:id" element={<EquipmentDetails t={t} />} />

                    {/* Profile & Settings */}
                    <Route path="/profile" element={<Profile t={t} setLang={setLang} currentLang={lang} />} />
                    <Route path="/my-orders" element={<MyOrders t={t} />} />
                    <Route path="/categories" element={<Categories t={t} />} />

                    {/* Schemes Route - Connects to 'View All' button */}
                    <Route path="/schemes" element={<Schemes t={t} />} />
                </Routes>

                {/* --- REAL TRANSLATED CHATBOT --- */}
                <Chatbot t={t} />
            </div>
        </Router>
    );
}

// Frontend UI complete - Ready for backend
export default App;