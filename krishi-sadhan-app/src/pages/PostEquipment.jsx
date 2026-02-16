import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Camera, IndianRupee, Tag, CheckCircle2 } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { createListingFlow, getAllowedRentUnits, getRentRateByCategory } from '../services';

const CITY_COORDINATES = {
    kolhapur: { lat: 16.705, lng: 74.2433 },
    pune: { lat: 18.5204, lng: 73.8567 },
    satara: { lat: 17.6805, lng: 74.0183 },
    sangli: { lat: 16.8524, lng: 74.5815 },
    nashik: { lat: 19.9975, lng: 73.7898 },
};

const getCoordinates = (city) => CITY_COORDINATES[(city || '').trim().toLowerCase()] || { lat: 0, lng: 0 };

const CATEGORY_OPTIONS = [
    { value: 'tractor', label: 'Tractor' },
    { value: 'harvester', label: 'Harvester' },
    { value: 'tools', label: 'Tools' },
    { value: 'blower', label: 'Blower' },
    { value: 'trolly', label: 'Trolly' },
    { value: 'sowing_machine', label: 'Sowing Machine' },
    { value: 'thresing_machine', label: 'Thresing Machine' },
    { value: 'rotar', label: 'Rotar' },
];

const PostEquipment = ({ t }) => {
    // Ensuring translations are loaded
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'rent';

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        city: '',
        imagePreview: null
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Get the rates from services logic
    const rentRate = getRentRateByCategory(formData.category);
    const allowedRentUnits = getAllowedRentUnits(formData.category);
    const availableCategories = CATEGORY_OPTIONS.filter((option) => {
        if (type === 'rent') return option.value !== 'tractor';
        return true;
    });

    const buildStandardRateRows = () => {
        if (type !== 'rent' || !formData.category) return [];
        return allowedRentUnits
            .map((unit) => {
                const value = rentRate[unit];
                if (typeof value !== 'number') return null;
                const labelMap = {
                    hour: '/hour',
                    acre: '/acre',
                    liter: '/liter',
                    distance: '/km',
                    kg: '/kg',
                    ton: '/ton',
                    quintal: '/quintal',
                };
                return `Rs ${value}${labelMap[unit] || `/${unit}`}`;
            })
            .filter(Boolean);
    };
    const rateRows = buildStandardRateRows();

    useEffect(() => {
        const uid = localStorage.getItem('kd_uid');
        if (!uid) {
            navigate('/login');
        }
    }, [navigate]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        setImageFiles(files);
        setFormData({ ...formData, imagePreview: URL.createObjectURL(files[0]) });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        const uid = localStorage.getItem('kd_uid');
        if (!uid) {
            navigate('/login');
            return;
        }
        const coords = getCoordinates(formData.city);

        const listingData = {
            ownerId: uid,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            city: formData.city,
            lat: coords.lat,
            lng: coords.lng,
            listingType: type,
            pricePerDay: type === 'rent' ? Number(rentRate[allowedRentUnits[0]] || 0) : null,
            priceUnit: type === 'rent' ? allowedRentUnits[0] || null : null,
            sellPrice: type === 'sell' ? Number(formData.price) : null,
            isAvailable: true,
        };

        const result = await createListingFlow({ listingData, files: imageFiles });
        setSubmitting(false);

        if (!result.ok) {
            setError(result?.details?.message || result.message || 'Failed to post listing');
            return;
        }

        setIsSubmitted(true);
        setTimeout(() => {
            navigate('/my-orders');
        }, 1500);
    };

    return (
        <MobileLayout t={t}>
            <div className="flex items-center gap-3 mb-6 pt-2">
                <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm border">
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h1 className="text-xl font-black text-gray-800">
                    {type === 'rent' ? t('rent_item') : t('sell_item')}
                </h1>
            </div>

            {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in zoom-in duration-300">
                    <div className="bg-green-100 p-6 rounded-full mb-4">
                        <CheckCircle2 size={48} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800">{t('success')}</h2>
                    <p className="text-gray-500 mt-2">{t('alert_success')}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5 pb-8 px-1">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl text-center font-bold">
                            {error}
                        </div>
                    )}

                    <div className="relative">
                        <input type="file" id="image-upload" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
                        <label htmlFor="image-upload" className={`flex flex-col items-center justify-center h-48 w-full rounded-3xl border-2 border-dashed transition-all cursor-pointer ${formData.imagePreview ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                            {formData.imagePreview ? (
                                <img src={formData.imagePreview} alt="Preview" className="h-full w-full object-cover rounded-3xl" />
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
                        <input type="text" placeholder={t('example_tractor')} className="w-full bg-white p-4 rounded-2xl border border-gray-100 outline-none font-bold text-gray-800 focus:border-green-600 shadow-sm" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">{t('city_village')}</label>
                        <input type="text" placeholder={t('example_city')} className="w-full bg-white p-4 rounded-2xl border border-gray-100 outline-none font-bold text-gray-800 focus:border-green-600 shadow-sm" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase ml-1">{t('select_category')}</label>
                            <div className="relative">
                                <Tag size={18} className="absolute left-4 top-4 text-gray-400" />
                                <select className="w-full bg-white p-4 pl-11 rounded-2xl border border-gray-100 outline-none font-bold text-gray-800 appearance-none shadow-sm" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                    <option value="">{t('select_category')}</option>
                                    <option value="tractor">{t('tractors')}</option>
                                    <option value="harvester">{t('harvesters')}</option>
                                    <option value="tools">{t('farming_tools')}</option>
                                    <option value="seeds">{t('seeds')}</option>
                                    {availableCategories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase ml-1">{type === 'rent' ? t('standard_app_rate') : t('price_sell')}</label>
                            {type === 'rent' ? (
                                <div className="w-full bg-green-50 p-4 rounded-2xl border border-green-100 font-bold text-gray-800 shadow-sm">
                                    <p className="text-sm">रु. {rentRate.hour}/{t('by_hour')}</p>
                                    <p className="text-xs text-gray-500 mt-1">रु. {rentRate.acre}/{t('by_acre')}</p>
                                    <p className="text-[10px] text-green-700 mt-2">{t('owner_cannot_edit')}</p>
                                    {rateRows.length === 0 && <p className="text-xs text-gray-500">Select category to view standard rate.</p>}
                                    {rateRows.map((row, index) => (
                                        <p key={row} className={index === 0 ? 'text-sm' : 'text-xs text-gray-500 mt-1'}>
                                            {row}
                                        </p>
                                    ))}
                                    {formData.category === 'blower' && (
                                        <p className="text-[10px] text-gray-500 mt-1">Minimum: {rentRate.minLiter || 100} liter</p>
                                    )}
                                    <p className="text-[10px] text-green-700 mt-2">Owner cannot edit this rate.</p>
                                </div>
                            ) : (
                                <div className="relative">
                                    <IndianRupee size={18} className="absolute left-4 top-4 text-gray-400" />
                                    <input type="number" placeholder="000" className="w-full bg-white p-4 pl-10 rounded-2xl border border-gray-100 outline-none font-bold text-gray-800 shadow-sm" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase ml-1">{t('description')}</label>
                        <textarea placeholder={t('condition_model_details')} rows="3" className="w-full bg-white p-4 rounded-2xl border border-gray-100 outline-none font-medium text-gray-600 resize-none shadow-sm" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>

                    <button type="submit" disabled={submitting} className="w-full bg-green-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-100 active:scale-95 transition-all mt-4 disabled:opacity-60">
                        {submitting ? t('loading') : t('submit_ad').toUpperCase()}
                    </button>
                </form>
            )}
        </MobileLayout>
    );
};

export default PostEquipment;