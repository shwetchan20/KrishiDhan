import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, HelpCircle, LogOut, ChevronRight, Edit2, ShoppingBag, Phone, MapPin, Package } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { getUser, logout as logoutUser, updateUser, uploadImages } from '../services';

const Profile = ({ t, setLang, currentLang }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({ uid: '', name: '', phone: '', city: '', photoURL: '', role: 'farmer' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            const uid = localStorage.getItem('kd_uid');
            if (!uid) { navigate('/login'); return; }
            const result = await getUser(uid);
            if (result.ok) {
                const profile = {
                    uid: result.data.uid || uid,
                    name: result.data.name || '',
                    phone: result.data.phone || '',
                    city: result.data.city || '',
                    photoURL: result.data.photoURL || '',
                    role: result.data.role || 'farmer', // Default role is farmer
                };
                setUser(profile);
            } else { setMessage(result.message || 'Failed to load profile'); }
            setLoading(false);
        };
        loadProfile();
    }, [navigate]);

    const onSave = async () => {
        setSaving(true);
        const result = await updateUser(user);
        setSaving(false);
        if (result.ok) {
            setMessage('Profile updated successfully');
            setIsEditing(false);
        } else { setMessage(result.message || 'Failed to save profile'); }
    };

    return (
        <MobileLayout t={t}>
            <div className="pb-32">
                {/* Profile Header Card */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center text-center mb-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-green-50 to-white z-0"></div>

                    {/* Photo Upload Section */}
                    <div className="relative z-10 mb-4">
                        <img
                            src={user.photoURL || 'https://placehold.co/150x150?text=User'}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
                        />
                        <label className="absolute bottom-1 right-1 bg-green-700 text-white p-2 rounded-full border-2 border-white shadow-lg cursor-pointer">
                            <Edit2 size={14} />
                            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setSaving(true);
                                const upload = await uploadImages([file]);
                                setSaving(false);
                                if (upload.ok) setUser(prev => ({ ...prev, photoURL: upload.data[0] }));
                            }} />
                        </label>
                    </div>

                    <div className="relative z-10 w-full px-4">
                        {isEditing ? (
                            <div className="space-y-3">
                                <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="text-lg font-bold text-center w-full border-b-2 border-green-200 outline-none pb-1" placeholder="Name" />
                                <input value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} className="text-sm font-medium text-center w-full border-b border-gray-200 outline-none pb-1" placeholder="Phone" />
                                <input value={user.city} onChange={(e) => setUser({ ...user, city: e.target.value })} className="text-sm font-medium text-center w-full border-b border-gray-200 outline-none pb-1" placeholder="City" />
                                <button onClick={onSave} className="mt-2 bg-green-700 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md w-full uppercase">
                                    {saving ? t('loading') : t('save_profile')}
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                {/* CHANGED: Using t() for name to support multi-language name display for presentation */}
                                <h2 className="text-2xl font-black text-gray-800">{t('user_name') || user.name || 'User Name'}</h2>
                                <p className="text-gray-500 font-medium mt-1 flex items-center gap-1"><Phone size={14} /> {user.phone || '0000000000'}</p>
                                <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1">
                                    <MapPin size={12} /> {user.city || 'Location'}
                                </div>
                                <button onClick={() => setIsEditing(true)} className="mt-4 flex items-center gap-1 text-green-700 text-xs font-black uppercase tracking-wider">
                                    <Edit2 size={12} /> {t('edit')}
                                </button>
                            </div>
                        )}
                        {message && <p className="text-[10px] text-green-600 font-bold mt-2">{message}</p>}
                    </div>
                </div>

                {/* Navigation Options Section */}
                <div className="space-y-3 px-1">

                    {/* UPDATED: Only show 'My Listed Tools' if user role is 'owner' */}
                    {user.role === 'owner' && (
                        <button onClick={() => navigate('/my-listings')} className="w-full bg-white p-4 rounded-2xl border border-green-50 shadow-sm flex items-center justify-between active:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-50 p-3 rounded-xl text-green-700"><Package size={20} /></div>
                                <span className="font-bold text-gray-700">{t('my_listed_tools')}</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-300" />
                        </button>
                    )}

                    <button onClick={() => navigate('/my-orders')} className="w-full bg-white p-4 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between active:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><ShoppingBag size={20} /></div>
                            <span className="font-bold text-gray-700">{t('orders')}</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-300" />
                    </button>

                    <div className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-50 p-3 rounded-xl text-orange-600"><Globe size={20} /></div>
                            <span className="font-bold text-gray-700">{t('language')}</span>
                        </div>
                        <div className="flex gap-2 pl-2">
                            {['en', 'hi', 'mr'].map((l) => (
                                <button key={l} onClick={() => setLang(l)} className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all ${currentLang === l ? 'bg-green-700 text-white border-green-700 shadow-lg' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                    {t(`lang_${l}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-white p-4 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-purple-50 p-3 rounded-xl text-purple-600"><HelpCircle size={20} /></div>
                            <span className="font-bold text-gray-700">{t('help')}</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-300" />
                    </button>

                    <button onClick={async () => { await logoutUser(); navigate('/login'); }} className="w-full bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 font-black flex items-center justify-center gap-2 mt-4">
                        <LogOut size={20} /> {t('logout')}
                    </button>
                </div>
            </div>
        </MobileLayout>
    );
};

export default Profile;