import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, IndianRupee, Tag, CheckCircle2 } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';

const PostEquipment = ({ t }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'rent'; // Default to rent if not specified

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        city: '',
        image: null
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle Image Selection
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
        }
    };

    // Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Simulate API call
        setTimeout(() => {
            navigate('/my-orders'); // Redirect after success
        }, 2000);
    };

    return (
        <MobileLayout t={t}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-white rounded-full shadow-sm border border-gray-100 active:scale-90 transition-transform"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h1 className="text-xl font-black text-gray-800 capitalize">
                    {type === 'rent' ? t('rent_item') : t('sell_item')}
                </h1>
            </div>

            {/* Success Message Overlay */}
            {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in zoom-in duration-300">
                    <div className="bg-green-100 p-6 rounded-full mb-4">
                        <CheckCircle2 size={48} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800">Success!</h2>
                    <p className="text-gray-500 mt-2">Your ad has been posted successfully.</p>
                </div>
            ) : (
                /* MAIN FORM */
                <form onSubmit={handleSubmit} className="space-y-5 pb-8">

                    {/* 1. Image Upload Section */}
                    <div className="relative">
                        <input
                            type="file"
                            id="image-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="image-upload"
                            className={`flex flex-col items-center justify-center h-48 w-full rounded-3xl border-2 border-dashed transition-all cursor-pointer ${formData.image ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}
                        >
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="h-full w-full object-cover rounded-3xl" />
                            ) : (
                                <>
                                    <div className="bg-white p-3 rounded-full shadow-sm mb-2">
                                        <Camera size={24} className="text-green-600" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-400">Tap to upload photo</span>
                                </>
                            )}
                        </label>
                    </div>

                    {/* 2. Title Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Mahindra Tractor 475"
                            className="w-full bg-white p-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none font-bold text-gray-700 transition-all"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* 3. Category & Price Row */}
                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Category</label>
                            <div className="relative">
                                <Tag size={18} className="absolute left-4 top-4 text-gray-400" />
                                <select
                                    className="w-full bg-white p-4 pl-11 rounded-xl border border-gray-200 focus:border-green-500 outline-none font-bold text-gray-700 appearance-none"
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select</option>
                                    <option value="tractor">Tractor</option>
                                    <option value="harvester">Harvester</option>
                                    <option value="implements">Tools</option>
                                    <option value="seeds">Seeds</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                                {type === 'rent' ? 'Price / Day' : 'Selling Price'}
                            </label>
                            <div className="relative">
                                <IndianRupee size={18} className="absolute left-4 top-4 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="000"
                                    className="w-full bg-white p-4 pl-10 rounded-xl border border-gray-200 focus:border-green-500 outline-none font-bold text-gray-700"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4. Description */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Description</label>
                        <textarea
                            placeholder="Describe condition, model year, etc."
                            rows="3"
                            className="w-full bg-white p-4 rounded-xl border border-gray-200 focus:border-green-500 outline-none font-medium text-gray-600 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    {/* 5. City */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">City / Location</label>
                        <div className="relative">
                            <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. Kolhapur"
                                className="w-full bg-white p-4 pl-11 rounded-xl border border-gray-200 focus:border-green-500 outline-none font-bold text-gray-700"
                                required
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white font-black text-lg p-4 rounded-2xl shadow-lg shadow-green-200 active:scale-95 transition-all mt-4"
                    >
                        {t('submit_ad')}
                    </button>

                </form>
            )}
        </MobileLayout>
    );
};

export default PostEquipment;