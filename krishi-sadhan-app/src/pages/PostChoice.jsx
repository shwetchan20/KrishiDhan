import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote, CalendarClock, ChevronRight } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const PostChoice = ({ t }) => {
    const navigate = useNavigate();

    return (
        <MobileLayout t={t}>
            {/* Header with Back Button */}
            <div className="flex items-center gap-3 mb-8 pt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-white rounded-full shadow-sm border border-gray-100 active:scale-90 transition-transform"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h1 className="text-xl font-black text-gray-800">
                    {t('post_ad')}
                </h1>
            </div>

            <div className="flex flex-col gap-6">

                {/* Text Prompt */}
                <div className="px-1">
                    <p className="text-2xl font-black text-gray-800 leading-tight">
                        What would you like to do today?
                    </p>
                    <p className="text-sm text-gray-400 mt-2 font-medium">
                        Select an option to list your equipment.
                    </p>
                </div>

                {/* OPTION 1: RENT (Blue Theme) */}
                <button
                    onClick={() => navigate('/post-equipment?type=rent')}
                    className="group relative overflow-hidden bg-blue-600 rounded-3xl p-6 text-left shadow-lg shadow-blue-200 active:scale-98 transition-all"
                >
                    {/* Background Decoration */}
                    <div className="absolute -right-4 -top-4 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>

                    <div className="relative z-10 flex justify-between items-start">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                            <CalendarClock size={32} className="text-white" />
                        </div>
                        <div className="bg-white/20 p-2 rounded-full">
                            <ChevronRight size={20} className="text-white" />
                        </div>
                    </div>

                    <div className="relative z-10 mt-6">
                        <h2 className="text-2xl font-black text-white">
                            {t('rent_item')}
                        </h2>
                        <p className="text-blue-100 text-sm mt-1 font-medium">
                            Earn daily income by renting out your tractor or tools.
                        </p>
                    </div>
                </button>

                {/* OPTION 2: SELL (Orange Theme) */}
                <button
                    onClick={() => navigate('/post-equipment?type=sell')}
                    className="group relative overflow-hidden bg-orange-500 rounded-3xl p-6 text-left shadow-lg shadow-orange-200 active:scale-98 transition-all"
                >
                    {/* Background Decoration */}
                    <div className="absolute -right-4 -top-4 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>

                    <div className="relative z-10 flex justify-between items-start">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                            <Banknote size={32} className="text-white" />
                        </div>
                        <div className="bg-white/20 p-2 rounded-full">
                            <ChevronRight size={20} className="text-white" />
                        </div>
                    </div>

                    <div className="relative z-10 mt-6">
                        <h2 className="text-2xl font-black text-white">
                            {t('sell_item')}
                        </h2>
                        <p className="text-orange-100 text-sm mt-1 font-medium">
                            Sell your old equipment instantly for a good price.
                        </p>
                    </div>
                </button>

            </div>
        </MobileLayout>
    );
};

export default PostChoice;