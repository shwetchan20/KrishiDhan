import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { translations } from './utils/translations';

// --- ROUTE COMPONENTS ---
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
import Schemes from './pages/Schemes';
import Chatbot from './components/Chatbot';

function App() {
    // Persistent Language State
    const [lang, setLang] = useState('en');

    // Translation Utility Function
    const t = (key) => {
        if (!translations[lang] || !translations[lang][key]) {
            return translations['en'][key] || key;
        }
        return translations[lang][key];
    };

    return (
        <Router>
            {/* Added Green-White Gradient Background globally */}
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-900 font-sans relative overflow-x-hidden">
                <Routes>
                    {/* Splash Screen Intro */}
                    <Route path="/" element={<SplashScreen t={t} />} />

                    {/* Authentication Flow */}
                    <Route path="/login" element={<Login t={t} />} />
                    <Route path="/register" element={<Register t={t} />} />

                    {/* Main Application Routes */}
                    <Route path="/home" element={<Home t={t} />} />
                    <Route path="/categories" element={<Categories t={t} />} />
                    <Route path="/post-choice" element={<PostChoice t={t} />} />
                    <Route path="/post-equipment" element={<PostEquipment t={t} />} />

                    {/* Dynamic Equipment Route */}
                    <Route path="/equipment/:id" element={<EquipmentDetails t={t} />} />

                    {/* Personal & Records */}
                    <Route path="/profile" element={<Profile t={t} setLang={setLang} currentLang={lang} />} />
                    <Route path="/my-orders" element={<MyOrders t={t} />} />

                    {/* External Content */}
                    <Route path="/schemes" element={<Schemes t={t} />} />
                </Routes>

                {/* AI Assistant - Always Available */}
                <Chatbot t={t} />
            </div>
        </Router>
    );
}

export default App;