import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Tag, ArrowLeft } from 'lucide-react';

const PostChoice = ({ t }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col">

            {/* Back Button */}
            <button
                onClick={() => navigate('/home')}
                className="self-start p-2 bg-white rounded-full shadow-sm mb-8 text-gray-600"
            >
                <ArrowLeft size={24} />
            </button>

            {/* Translated Header */}
            <h1 className="text-3xl font-black text-gray-800 mb-2">{t('post_ad')}</h1>
            <p className="text-gray-500 mb-8">{t('what_to_do')}</p>

            <div className="space-y-6">

                {/* OPTION 1: RENT - Translated */}
                <div
                    onClick={() => navigate('/post-equipment?type=rent')}
                    className="bg-white p-6 rounded-3xl shadow-sm border-2 border-transparent hover:border-green-500 transition-all cursor-pointer active:scale-95 group"
                >
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-green-700 group-hover:bg-green-700 group-hover:text-white transition-colors">
                        <Tractor size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{t('rent_equipment')}</h3>
                    <p className="text-sm text-gray-400 mt-2">
                        {t('rent_desc')}
                    </p>
                </div>

                {/* OPTION 2: SELL - Translated */}
                <div
                    onClick={() => navigate('/post-equipment?type=sell')}
                    className="bg-white p-6 rounded-3xl shadow-sm border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer active:scale-95 group"
                >
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                        <Tag size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{t('sell_equipment')}</h3>
                    <p className="text-sm text-gray-400 mt-2">
                        {t('sell_desc')}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PostChoice;