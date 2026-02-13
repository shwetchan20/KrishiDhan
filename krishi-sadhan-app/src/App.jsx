import React from 'react';
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

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans relative">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/equipment" element={<EquipmentListing />} />
                        <Route path="/equipment/:id" element={<EquipmentDetails />} />
                        <Route path="/booking" element={<Booking />} />
                    </Routes>
                </main>
                <Footer />
                <Chatbot />
            </div>
        </Router>
    );
}

export default App;
