import React from 'react';

// 1. Accept the 't' prop passed from App.jsx
const Footer = ({ t }) => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-8">
            <div className="container mx-auto px-4 text-center">
                {/* 2. Using t() for the rights reserved text */}
                <p>
                    &copy; {new Date().getFullYear()} KrishiDhan. {t('all_rights_reserved') || 'All rights reserved.'}
                </p>

                {/* 3. Using t() for your project slogan */}
                <p className="text-gray-400 text-sm mt-2">
                    {t('footer_slogan') || 'Empowering Farmers, Enabling Growth.'}
                </p>
            </div>
        </footer>
    );
};

export default Footer;