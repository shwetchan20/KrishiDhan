import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EquipmentListing from './pages/EquipmentListing';
import EquipmentDetails from './pages/EquipmentDetails';
import Booking from './pages/Booking';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// 1. ErrorBoundary Component Import kara
import ErrorBoundary from './components/ErrorBoundary';

// 2. Translations Import
import { translations } from './utils/translations';

function App() {
    const [language, setLanguage] = useState('en');

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans relative">

                {/* Navbar with Language Tools */}
                <Navbar language={language} setLanguage={setLanguage} t={t} />

                <main className="flex-grow container mx-auto px-4 py-8">
                    {/* 3. ErrorBoundary ne sagale Routes wrap kele aahet */}
                    {/* He mhnje safety net aahe, kahi chukle tar farmer la message disel */}
                    <ErrorBoundary t={t}>
                        <Routes>
                            <Route path="/" element={<Home t={t} />} />
                            <Route path="/login" element={<Login t={t} />} />
                            <Route path="/register" element={<Register t={t} />} />
                            <Route path="/dashboard" element={<Dashboard t={t} />} />
                            <Route path="/equipment" element={<EquipmentListing t={t} />} />
                            <Route path="/equipment/:id" element={<EquipmentDetails t={t} />} />
                            <Route path="/booking" element={<Booking t={t} />} />
                        </Routes>
                    </ErrorBoundary>
                </main>

                <Footer t={t} />
                <Chatbot t={t} />
            </div>
        </Router>
    );
}

export default App;