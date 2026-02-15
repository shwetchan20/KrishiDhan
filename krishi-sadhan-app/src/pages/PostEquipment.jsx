import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, IndianRupee, Tag, CheckCircle2 } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const PostEquipment = ({ t }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'rent';

    // State for managing equipment details
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        city: '',
        image: null
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle local image preview
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Simulation of backend submission
        setTimeout(() => { navigate('/my-orders'); }, 2000);
    };

    return (
        <MobileLayout t={t}>
            <div className="flex items-center gap-3 mb-6 pt-2">
                <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm border">
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h1 className="text-xl font-black text-gray-800 capitalize">
                    {type === 'rent' ? t('rent_item') : t('sell_item')}
                </h1>
            </div>

            {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in zoom-in duration-300">
                    <div className="bg-green-100 p-6 rounded-full mb-4">
                        <CheckCircle2 size={48} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800">Success!</h2>
                    <p className="text-gray-500 mt-2">{t('alert_success')}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5 pb-8 px-1">
                    {/* Visual Photo Upload Box */}
                    <div className="relative">
                        <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageChange} />
                        <label htmlFor="image-upload" className={`flex flex-col items-center justify-center h-48 w-full rounded-3xl border-2 border-dashed transition-all cursor-pointer ${formData.image ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="h-full w-full object-cover rounded-3xl" />
                            ) : (
                                <>
                                    <div className="bg-white p-3 rounded-full shadow-sm mb-2"><Camera size={24} className="text-green-600" /></div>
                                    <span className="text-sm font-bold text-gray-400">{t('upload_text')}</span>
                                </>
                            )}
                        </label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">{t('title')}</label>
                        <input type="text" placeholder="e.g. Mahindra Tractor" className="w-full bg-white p-4 rounded-2xl border border-gray-100 outline-none font-bold text-gray-800 focus:border-green-600 shadow-sm" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase ml-1">{t('select_category')}</label>
                            <div className="relative">
                                <Tag size={18} className="absolute left-4 top-4 text-gray-400" />
                                <select className="w-full bg-white p-4 pl-11 rounded-2xl border border-gray-100 outline-none font-bold text-gray-800 appearance-none shadow-sm" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                    <option value="">{t('select_category')}</option>
                                    <option value="tractor">Tractor</option>
                                    <option value="tools">Tools</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase ml-1">{type === 'rent' ? t('price_rent') : t('price_sell')}</label>
                            <div className="relative">
                                <IndianRupee size={18} className="absolute left-4 top-4 text-gray-400" />
                                <input type="number" placeholder="000" className="w-full bg-white p-4 pl-10 rounded-2xl border border-gray-100 outline-none font-bold text-gray-800 shadow-sm" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">{t('description')}</label>
                        <textarea placeholder="Condition, model details..." rows="3" className="w-full bg-white p-4 rounded-2xl border border-gray-100 outline-none font-medium text-gray-600 resize-none shadow-sm" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>

                    <button type="submit" className="w-full bg-green-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-100 active:scale-95 transition-all mt-4">
                        {t('submit_ad').toUpperCase()}
                    </button>
                </form>
            )}
        </MobileLayout>
    );
};

export default PostEquipment;