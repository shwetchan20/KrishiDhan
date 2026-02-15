import React, { useState } from 'react';
import { Package, Calendar, ChevronRight, Clock, CheckCircle2, XCircle } from 'lucide-react';
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
            image: 'https://placehold.co/150x150?text=Tractor'
        },
        {
            id: '102',
            title: 'Seed Drill Machine',
            type: 'Rent',
            status: 'pending',
            price: 400,
            date: '20 Feb - 21 Feb',
            image: 'https://placehold.co/150x150?text=Drill'
        },
        {
            id: '103',
            title: 'Old Harrow Tool',
            type: 'Buy',
            status: 'completed',
            price: 2500,
            date: '10 Jan 2026',
            image: 'https://placehold.co/150x150?text=Harrow'
        },
        {
            id: '104',
            title: 'Sprayer Pump',
            type: 'Rent',
            status: 'cancelled',
            price: 200,
            date: '05 Jan 2026',
            image: 'https://placehold.co/150x150?text=Pump'
        }
    ];

    // Filter logic
    const filteredOrders = orders.filter(order =>
        activeTab === 'active'
            ? ['approved', 'pending'].includes(order.status)
            : ['completed', 'cancelled'].includes(order.status)
    );

    // Helper for Status Colors and Icons
    const getStatusStyle = (status) => {
        switch (status) {
            case 'approved': return { color: 'text-green-700 bg-green-50 border-green-100', icon: <CheckCircle2 size={12} /> };
            case 'pending': return { color: 'text-orange-700 bg-orange-50 border-orange-100', icon: <Clock size={12} /> };
            case 'completed': return { color: 'text-blue-700 bg-blue-50 border-blue-100', icon: <CheckCircle2 size={12} /> };
            case 'cancelled': return { color: 'text-red-700 bg-red-50 border-red-100', icon: <XCircle size={12} /> };
            default: return { color: 'text-gray-500 bg-gray-50', icon: null };
        }
    };

    return (
        <MobileLayout t={t}>
            <div className="pb-6">

                {/* Header */}
                <h1 className="text-xl font-black text-gray-800 mb-4 px-1">{t('orders')}</h1>

                {/* TABS (Segmented Control) */}
                <div className="flex p-1 bg-gray-200 rounded-xl mb-6 mx-1">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm ${activeTab === 'active' ? 'bg-white text-green-700' : 'bg-transparent text-gray-500 shadow-none'}`}
                    >
                        {t('active_pending')}
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm ${activeTab === 'history' ? 'bg-white text-green-700' : 'bg-transparent text-gray-500 shadow-none'}`}
                    >
                        {t('history')}
                    </button>
                </div>

                {/* ORDERS LIST */}
                <div className="space-y-4">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((item) => {
                            const statusStyle = getStatusStyle(item.status);
                            return (
                                <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 active:scale-98 transition-transform">
                                    {/* Image */}
                                    <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{item.type}</p>
                                            </div>
                                            {/* Status Badge */}
                                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${statusStyle.color}`}>
                                                {statusStyle.icon}
                                                <span>{item.status}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-end mt-2">
                                            <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                                                <Calendar size={12} />
                                                <span>{item.date}</span>
                                            </div>
                                            <p className="text-green-700 font-black text-base">₹{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        // Empty State
                        <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                            <div className="bg-gray-100 p-4 rounded-full mb-3">
                                <Package size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-gray-500 font-bold text-sm">No orders found</h3>
                            <p className="text-xs text-gray-400 max-w-[200px]">Looks like you haven't placed any orders in this category yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
};

export default MyOrders;