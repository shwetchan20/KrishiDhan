import React, { useState } from 'react';
import { Package, Calendar } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const MyOrders = ({ t }) => {
    const [activeTab, setActiveTab] = useState('active');
    const orders = [
        { id: '101', title: 'Mahindra 475 DI', type: 'Rent', status: 'approved', price: 800, date: '15 Feb - 18 Feb', image: 'https://placehold.co/150x150?text=Tractor' },
    ];

    const filteredOrders = orders.filter(order =>
        activeTab === 'active' ? ['approved', 'pending'].includes(order.status) : ['completed', 'cancelled'].includes(order.status)
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <MobileLayout t={t}>
                <div className="pb-6">
                    <h1 className="text-xl font-black text-gray-800 mb-4 px-1">{t('orders')}</h1>
                    <div className="flex p-1 bg-white/50 backdrop-blur-sm rounded-xl mb-6 mx-1 border border-green-50 shadow-sm">
                        <button onClick={() => setActiveTab('active')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'active' ? 'bg-green-700 text-white shadow-sm' : 'text-gray-500'}`}>
                            {t('active_pending')}
                        </button>
                        <button onClick={() => setActiveTab('history')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-green-700 text-white shadow-sm' : 'text-gray-500'}`}>
                            {t('history')}
                        </button>
                    </div>

                    <div className="space-y-4 px-1">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((item) => (
                                <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-green-50 flex gap-3">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                                            <span className="text-[9px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase">{item.status}</span>
                                        </div>
                                        <div className="flex justify-between items-end mt-2">
                                            <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1"><Calendar size={12} /> {item.date}</p>
                                            <p className="text-green-700 font-black">₹{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 opacity-50">
                                <Package size={40} className="text-gray-400 mb-2" />
                                <p className="text-xs font-bold">No orders found</p>
                            </div>
                        )}
                    </div>
                </div>
            </MobileLayout>
        </div>
    );
};

export default MyOrders;