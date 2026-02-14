import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Camera } from 'lucide-react';

const PostEquipment = ({ t }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || 'rent';

    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        city: '',
        price: '',
        priceUnit: 'day'
    });

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages([...images, ...newImages]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", { ...formData, type, images });
        alert(t('alert_success')); // Translated Alert
        navigate('/home');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* Header - Dynamic Title */}
            <div className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
                <button onClick={() => navigate(-1)} className="text-gray-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-gray-800">
                    {type === 'rent' ? t('rent_equipment') : t('sell_equipment')}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-6">

                {/* 1. IMAGE UPLOAD - Translated */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-700 mb-3">{t('upload_photos')}</h3>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        <label className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-green-300 rounded-lg flex flex-col items-center justify-center bg-green-50 text-green-700 cursor-pointer">
                            <Camera size={24} />
                            <span className="text-xs font-bold mt-1">{t('add_photo')}</span>
                            <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                        </label>
                        {images.map((img, index) => (
                            <div key={index} className="flex-shrink-0 w-24 h-24 relative">
                                <img src={img} alt="preview" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. BASIC DETAILS - Translated */}
                <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-700">{t('details')}</h3>

                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase">{t('title')}</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Mahindra 475 DI"
                            className="w-full p-3 border-b outline-none focus:border-green-600 font-medium"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase">{t('select_category')}</label>
                        <select
                            className="w-full p-3 border-b outline-none bg-white"
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="">{t('select_category')}</option>
                            <option value="tractor">Tractor</option>
                            <option value="harvester">Harvester</option>
                            <option value="tools">Farming Tools</option>
                            <option value="seeds">Seeds/Fertilizer</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase">{t('description')}</label>
                        <textarea
                            rows="3"
                            placeholder="..."
                            className="w-full p-3 border rounded-lg mt-1 outline-none focus:border-green-600 bg-gray-50"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                {/* 3. PRICE & LOCATION - Translated */}
                <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 font-bold uppercase">
                                {type === 'rent' ? t('price_rent') : t('price_sell')}
                            </label>
                            <input
                                required
                                type="number"
                                placeholder="00"
                                className="w-full p-3 border-b outline-none focus:border-green-600 font-bold text-lg"
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        {type === 'rent' && (
                            <div className="w-1/3">
                                <label className="text-xs text-gray-400 font-bold uppercase">{t('unit')}</label>
                                <select
                                    className="w-full p-3 border-b outline-none bg-white"
                                    onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
                                >
                                    <option value="day">/ Day</option>
                                    <option value="hour">/ Hour</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 font-bold uppercase mb-1 flex items-center gap-1">
                            <MapPin size={12} /> {t('city_village')}
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="..."
                            className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-1 focus:ring-green-500"
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-4 rounded-xl font-black shadow-lg hover:bg-green-800 active:scale-95 transition-transform"
                >
                    {t('post_now')}
                </button>

            </form>
        </div>
    );
};

export default PostEquipment;