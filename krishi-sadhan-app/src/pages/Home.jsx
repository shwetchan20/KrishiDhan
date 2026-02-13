import React from 'react';
import { Link } from 'react-router-dom';

// 1. We added '{ t }' here to accept the translation tool
const Home = ({ t }) => {
    return (
        <div className="text-center py-12">
            {/* 2. Replaced "Welcome..." with {t('welcome')} */}
            <h1 className="text-4xl font-bold text-green-700 mb-4">{t('welcome')}</h1>

            {/* 3. I added a fallback here. If you add "subtitle" to your translation file later, it will work. 
                 For now, it shows the English text automatically. */}
            <p className="text-xl text-gray-600 mb-8">
                {t('subtitle') || "Rent Farm Equipment Easily or Verify and Earn."}
            </p>

            <div className="flex justify-center gap-4">
                {/* 4. Replaced button text with translation keys */}
                <Link to="/equipment" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700">
                    {t('findEquipment')}
                </Link>

                <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
                    {t('listEquipment')}
                </Link>
            </div>
        </div>
    );
};

export default Home;