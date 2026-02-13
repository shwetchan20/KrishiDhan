import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-8">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} KrishiDhan. All rights reserved.</p>
                <p className="text-gray-400 text-sm mt-2">Empowering Farmers, Enabling Growth.</p>
            </div>
        </footer>
    );
};

export default Footer;
