import React, { useState } from 'react';
import { Package, Calendar } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const MyOrders = ({ t }) => {
    const [activeTab, setActiveTab] = useState('active');

    // --- DUMMY DATA ---
    const orders = [
        {
            id: '101',
            title: 'Mahindra 475 DI',
            type: 'Rent',
            status: 'approved',
            price: 800,
            date: '15 Feb - 18 Feb',
            image: 'https://placehold.co/100x100?text=Tractor'
        },
        {
            id: '102',
            title: 'Seed Drill Machine',
            type: 'Rent',
            status: 'pending',
            price: 400,
            date: '20 Feb - 21 Feb',
            image: 'https://placehold.co/100x100?text=Drill'
        },
        {
            id: '103',
            title: 'Old Harrow Tool',
            type: 'Buy',
            status: 'completed',
            price: 2500,
            date: '10 Jan 2026',
            image: 'https://placehold.co/100x100?text=Harrow'
        }
    ];

    const filteredOrders = orders.filter(order =>
        activeTab === 'active'
            ? ['approved', 'pending'].includes(order.status)
            : ['completed', 'cancelled'].includes(order.status)
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'completed': return 'bg-gray-100 text-gray-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    return (
        <MobileLayout t={t}>
            <div className="pb-6">

                {/* Header - Translated using 'orders' key */}
                <h1 className="text-2xl font-black text-gray-800 mb-6 px-2">{t('orders')}</h1>

                {/* TABS: Active vs History - Translated using keys from translations.js */}
                <div className="flex p-1 bg-gray-200 rounded-xl mb-6 mx-2">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}
                    >
                        {t('active_pending')}
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}
                    >
                        {t('history')}
                    </button>
                </div>

                {/* ORDERS LIST */}
                <div className="space-y-4 px-2">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 font-bold mt-1 uppercase">{item.type}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                                        <Calendar size={12} />
                                        <span>{item.date}</span>
                                    </div>
                                    <p className="text-green-700 font-black text-lg mt-1">₹{item.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <Package size={32} />
                            </div>
                            <h3 className="text-gray-500 font-bold">No orders found</h3>
                        </div>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
};

export default MyOrders;