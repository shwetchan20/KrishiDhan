import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import MyListings from './pages/MyListings';
import Categories from './pages/Categories';
import EquipmentDetails from './pages/EquipmentDetails';
import Schemes from './pages/Schemes';
import ImpactDashboard from './pages/ImpactDashboard';
import PaymentDemo from './pages/PaymentDemo';
import Chatbot from './components/Chatbot';

const ProtectedRoute = ({ children }) => {
    const uid = localStorage.getItem('kd_uid');
    return uid ? children : <Navigate to="/login" replace />;
};

function App() {
    // Persistent Language State
    const [lang, setLang] = useState(() => localStorage.getItem('kd_lang') || 'en');

    // Translation Utility Function
    const formatFallbackLabel = (key) =>
        String(key || '')
            .replace(/_/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\b\w/g, (char) => char.toUpperCase());

    const t = (key) => translations[lang]?.[key] || translations.en?.[key] || formatFallbackLabel(key);

    useEffect(() => {
        localStorage.setItem('kd_lang', lang);
    }, [lang]);

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans relative overflow-x-hidden">
                <Routes>
                    {/* Splash Screen Intro */}
                    <Route path="/" element={<SplashScreen t={t} />} />

                    {/* Authentication Flow */}
                    <Route path="/login" element={<Login t={t} />} />
                    <Route path="/register" element={<Register t={t} />} />

                    {/* Main Application Routes */}
                    <Route path="/home" element={<ProtectedRoute><Home t={t} /></ProtectedRoute>} />
                    <Route path="/categories" element={<ProtectedRoute><Categories t={t} /></ProtectedRoute>} />
                    <Route path="/post-choice" element={<ProtectedRoute><PostChoice t={t} /></ProtectedRoute>} />
                    <Route path="/post-equipment" element={<ProtectedRoute><PostEquipment t={t} /></ProtectedRoute>} />

                    {/* Dynamic Equipment Route */}
                    <Route path="/equipment/:id" element={<ProtectedRoute><EquipmentDetails t={t} /></ProtectedRoute>} />

                    {/* Personal & Records */}
                    <Route path="/profile" element={<ProtectedRoute><Profile t={t} setLang={setLang} currentLang={lang} /></ProtectedRoute>} />
                    <Route path="/my-orders" element={<ProtectedRoute><MyOrders t={t} /></ProtectedRoute>} />
                    <Route path="/my-listings" element={<ProtectedRoute><MyListings t={t} /></ProtectedRoute>} />
                    <Route path="/payment" element={<ProtectedRoute><PaymentDemo t={t} /></ProtectedRoute>} />
                    <Route path="/impact" element={<ProtectedRoute><ImpactDashboard t={t} /></ProtectedRoute>} />

                    {/* External Content */}
                    <Route path="/schemes" element={<ProtectedRoute><Schemes t={t} /></ProtectedRoute>} />
                </Routes>

                {/* AI Assistant - Always Available */}
                <Chatbot t={t} />
            </div>
        </Router>
    );
}

export default App;
