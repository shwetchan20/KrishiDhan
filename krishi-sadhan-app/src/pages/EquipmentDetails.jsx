import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, ShieldCheck, Trash2 } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { createRequest, deleteListing, getListingById, getRentRateByCategory, getUser } from '../services';

const DAY_MS = 24 * 60 * 60 * 1000;

const EquipmentDetails = ({ t }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [ownerName, setOwnerName] = useState('Owner');
    const [ownerPhone, setOwnerPhone] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [bookingMode, setBookingMode] = useState('day');
    const [dayStartDate, setDayStartDate] = useState('');
    const [dayEndDate, setDayEndDate] = useState('');
    const [hourDate, setHourDate] = useState('');
    const [hourStartTime, setHourStartTime] = useState('');
    const [hourCount, setHourCount] = useState(1);
    const [acreDate, setAcreDate] = useState('');
    const [acreCount, setAcreCount] = useState(1);
    const [requestMessage, setRequestMessage] = useState('');

    const currentUid = localStorage.getItem('kd_uid') || '';
    const isOwner = !!item && currentUid === item.ownerId;

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const result = await getListingById(id);
            setLoading(false);

            if (!result.ok) {
                setError(result.message || 'Listing not found');
                return;
            }

            setItem(result.data);

            if (result.data?.ownerId) {
                const owner = await getUser(result.data.ownerId);
                if (owner.ok) {
                    setOwnerName(owner.data?.name || 'Owner');
                    setOwnerPhone(owner.data?.phone || '');
                }
            }
        };

        load();
    }, [id]);

    const rateCard = getRentRateByCategory(item?.category);
    const hourlyRate = Number(item?.pricePerDay) || Number(rateCard.hour);
    const dayRate = Math.round(hourlyRate * 8);
    const acreRate = Number(rateCard.acre);

    const computed = useMemo(() => {
        if (!item || item.listingType !== 'rent') {
            const amount = Number(item?.sellPrice) || 0;
            return {
                bookingType: null,
                quantity: 0,
                selectedRate: 0,
                startDate: null,
                endDate: null,
                hoursBooked: null,
                daysBooked: null,
                acresBooked: null,
                extraMessage: '',
                baseCost: amount,
                travelCost: 0,
                platformFee: 0,
                totalCost: amount,
            };
        }

        if (bookingMode === 'day') {
            const start = dayStartDate ? new Date(dayStartDate) : null;
            const end = dayEndDate ? new Date(dayEndDate) : null;
            const validRange = start && end && end >= start;
            const days = validRange ? Math.floor((end.getTime() - start.getTime()) / DAY_MS) + 1 : 0;
            const baseCost = days * dayRate;
            const platformFee = Math.round(baseCost * 0.05);
            return {
                bookingType: 'day',
                quantity: days,
                selectedRate: dayRate,
                startDate: dayStartDate || null,
                endDate: dayEndDate || null,
                hoursBooked: null,
                daysBooked: days || null,
                acresBooked: null,
                extraMessage: '',
                baseCost,
                travelCost: 0,
                platformFee,
                totalCost: baseCost + platformFee,
            };
        }

        if (bookingMode === 'hour') {
            const hours = Number(hourCount) > 0 ? Number(hourCount) : 0;
            const baseCost = hours * hourlyRate;
            const platformFee = Math.round(baseCost * 0.05);
            return {
                bookingType: 'hour',
                quantity: hours,
                selectedRate: hourlyRate,
                startDate: hourDate || null,
                endDate: hourDate || null,
                hoursBooked: hours || null,
                daysBooked: null,
                acresBooked: null,
                extraMessage: hourStartTime ? `Start time: ${hourStartTime}` : '',
                baseCost,
                travelCost: 0,
                platformFee,
                totalCost: baseCost + platformFee,
            };
        }

        const acres = Number(acreCount) > 0 ? Number(acreCount) : 0;
        const baseCost = acres * acreRate;
        const platformFee = Math.round(baseCost * 0.05);
        return {
            bookingType: 'acre',
            quantity: acres,
            selectedRate: acreRate,
            startDate: acreDate || null,
            endDate: acreDate || null,
            hoursBooked: null,
            daysBooked: null,
            acresBooked: acres || null,
            extraMessage: '',
            baseCost,
            travelCost: 0,
            platformFee,
            totalCost: baseCost + platformFee,
        };
    }, [item, bookingMode, dayStartDate, dayEndDate, hourDate, hourStartTime, hourCount, dayRate, hourlyRate, acreRate]);

    const getWhatsAppPhone = (phone) => {
        const digits = String(phone || '').replace(/\D/g, '');
        if (!digits) return '';
        if (digits.length === 10) return `91${digits}`;
        return digits;
    };

    const handleWhatsAppBooking = () => {
        if (!item) return;

        const whatsappPhone = getWhatsAppPhone(ownerPhone);
        if (!whatsappPhone) {
            setError('Owner phone is not available for WhatsApp.');
            return;
        }

        const renter = JSON.parse(localStorage.getItem('kd_user') || '{}');
        const renterName = renter?.name || 'Customer';
        const text = item.listingType === 'rent'
            ? `Hello, I want to book ${item.title}. Type: ${computed.bookingType}, Qty: ${computed.quantity}, Total: Rs ${computed.totalCost}. My name is ${renterName}.`
            : `Hello, I want to buy ${item.title}. My name is ${renterName}.`;
        const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const handleDeleteListing = async () => {
        if (!item || !isOwner) return;
        const confirmed = window.confirm('Delete this listing? This action cannot be undone.');
        if (!confirmed) return;

        setDeleting(true);
        const result = await deleteListing({ listingId: item.id, actorId: currentUid });
        setDeleting(false);

        if (!result.ok) {
            setError(result.message || 'Failed to delete listing');
            return;
        }

        navigate('/home');
    };

    const validateRentInputs = () => {
        if (bookingMode === 'day') {
            if (!dayStartDate || !dayEndDate) return 'Please select start and end date.';
            if (new Date(dayEndDate) < new Date(dayStartDate)) return 'End date cannot be before start date.';
            if (computed.quantity <= 0) return 'Please select a valid day range.';
            return '';
        }
        if (bookingMode === 'hour') {
            if (!hourDate) return 'Please select booking date.';
            if (!hourStartTime) return 'Please select start time.';
            if (!Number.isFinite(Number(hourCount)) || Number(hourCount) <= 0) return 'Please enter valid hours.';
            return '';
        }
        if (!acreDate) return 'Please select booking date.';
        if (!Number.isFinite(Number(acreCount)) || Number(acreCount) <= 0) return 'Please enter valid acres.';
        return '';
    };

    const handleCreateRequest = async () => {
        if (!item) return;

        const renterId = localStorage.getItem('kd_uid');
        if (!renterId) {
            navigate('/login');
            return;
        }
        if (renterId === item.ownerId) {
            setError('You cannot request your own listing.');
            return;
        }

        if (item.listingType === 'rent') {
            const validationMessage = validateRentInputs();
            if (validationMessage) {
                setError(validationMessage);
                return;
            }
        }

        setError('');
        setSuccess('');
        setSubmitting(true);

        const bookingSummary = item.listingType === 'rent'
            ? `Type:${computed.bookingType}, Qty:${computed.quantity}, Base:${computed.baseCost}, Platform:${computed.platformFee}, Total:${computed.totalCost}`
            : '';
        const result = await createRequest({
            listingId: item.id,
            ownerId: item.ownerId,
            renterId,
            requestType: item.listingType === 'rent' ? 'rent' : 'buy',
            bookingType: item.listingType === 'rent' ? computed.bookingType : null,
            startDate: item.listingType === 'rent' ? computed.startDate : null,
            endDate: item.listingType === 'rent' ? computed.endDate : null,
            hoursBooked: item.listingType === 'rent' ? computed.hoursBooked : null,
            daysBooked: item.listingType === 'rent' ? computed.daysBooked : null,
            acresBooked: item.listingType === 'rent' ? computed.acresBooked : null,
            baseCost: item.listingType === 'rent' ? computed.baseCost : Number(item.sellPrice) || 0,
            travelCost: item.listingType === 'rent' ? computed.travelCost : 0,
            platformFee: item.listingType === 'rent' ? computed.platformFee : 0,
            totalCost: item.listingType === 'rent' ? computed.totalCost : Number(item.sellPrice) || 0,
            farmerMessage: [requestMessage, computed.extraMessage].filter(Boolean).join(' | '),
            message: [requestMessage, computed.extraMessage, bookingSummary].filter(Boolean).join(' | '),
            paymentStatus: 'pending',
            status: 'pending',
        });
        setSubmitting(false);

        if (!result.ok) {
            setError(result.message || 'Failed to create request');
            return;
        }

        setSuccess(item.listingType === 'rent'
            ? 'Booking request sent. Wait for owner approval in My Orders.'
            : 'Purchase request sent. Wait for owner approval in My Orders.');
    };

    if (loading) {
        return (
            <MobileLayout t={t}>
                <div className="p-4 text-sm text-gray-500">{t('loading')}</div>
            </MobileLayout>
        );
    }

    if (error && !item) {
        return (
            <MobileLayout t={t}>
                <div className="p-4">
                    <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm mb-4 border">
                        <ArrowLeft size={20} />
                    </button>
                    <p className="text-sm text-red-500">{error}</p>
                </div>
            </MobileLayout>
        );
    }

    const displayPrice = item.listingType === 'rent' ? hourlyRate : item.sellPrice;

    return (
        <MobileLayout t={t}>
            <div className="pb-10">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm border">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="font-bold text-gray-800 truncate">{item.title}</h2>
                </div>

                <div className="relative w-full h-64 bg-gray-200 rounded-3xl overflow-hidden mb-6 shadow-md">
                    <img src={item.images?.[0] || 'https://placehold.co/600x400?text=No+Image'} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase text-white ${item.listingType === 'rent' ? 'bg-blue-600' : 'bg-red-500'}`}>
                            {item.listingType === 'rent' ? t('rent_badge') : t('sell_badge')}
                        </span>
                    </div>
                </div>

                <div className="px-2 mb-6 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800">{item.title}</h1>
                        <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                            <MapPin size={14} />
                            <span>{item.city}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-green-700">Rs {displayPrice}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                            {item.listingType === 'rent' ? '/ hour' : t('price_on_sale')}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                            {ownerName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[9px] text-gray-400 font-bold uppercase">{t('owner')}</p>
                            <p className="font-bold text-gray-800 text-sm">{ownerName}</p>
                        </div>
                    </div>
                    {isOwner && (
                        <button
                            onClick={handleDeleteListing}
                            disabled={deleting}
                            className="text-xs px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-100 font-bold disabled:opacity-60 flex items-center gap-1"
                        >
                            <Trash2 size={14} />
                            {deleting ? t('deleting') : t('delete_listing')}
                        </button>
                    )}
                </div>

                <div className="px-2 mb-6">
                    <h3 className="font-black text-gray-800 mb-2 uppercase text-xs tracking-widest">{t('description')}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* --- SPECIFICATIONS SECTION WITH FULL TRANSLATION --- */}
                <div className="px-2 mb-8">
                    <h3 className="font-black text-gray-800 mb-3 uppercase text-xs tracking-widest">{t('specifications')}</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {/* Translate Category Label and the dynamic value (e.g. tools -> अवजारे) */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-xl font-medium">
                            <ShieldCheck size={16} className="text-green-600" />
                            <span>{t('category_label')}: {t(item.category?.toLowerCase()) || item.category}</span>
                        </div>
                        {/* Translate Location Label */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-xl font-medium">
                            <ShieldCheck size={16} className="text-green-600" />
                            <span>{t('location_label')}: {item.city}</span>
                        </div>
                    </div>
                </div>

                <div className="px-2 mb-8">
                    {item.listingType === 'rent' && (
                        <>
                            <div className="bg-white p-4 rounded-xl border border-gray-100 mb-3 shadow-sm">
                                <p className="text-xs font-bold text-gray-500 mb-2 uppercase">{t('booking_type')}</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {['day', 'hour', 'acre'].map((mode) => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => setBookingMode(mode)}
                                            className={`p-2 rounded-lg text-xs font-bold border transition-all ${bookingMode === mode ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
                                        >
                                            {t(`by_${mode}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {bookingMode === 'day' && (
                                <div className="bg-white p-4 rounded-xl border border-gray-100 mb-3 shadow-sm">
                                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">{t('select_days')}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="date" value={dayStartDate} onChange={(e) => setDayStartDate(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
                                        <input type="date" value={dayEndDate} onChange={(e) => setDayEndDate(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
                                    </div>
                                </div>
                            )}

                            {bookingMode === 'hour' && (
                                <div className="bg-white p-4 rounded-xl border border-gray-100 mb-3 shadow-sm">
                                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">{t('select_hour_details')}</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        <input type="date" value={hourDate} onChange={(e) => setHourDate(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
                                        <input type="time" value={hourStartTime} onChange={(e) => setHourStartTime(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
                                        <input type="number" min="1" value={hourCount} onChange={(e) => setHourCount(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" placeholder="Hours" />
                                    </div>
                                </div>
                            )}

                            {bookingMode === 'acre' && (
                                <div className="bg-white p-4 rounded-xl border border-gray-100 mb-3 shadow-sm">
                                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">{t('select_acreage')}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="date" value={acreDate} onChange={(e) => setAcreDate(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
                                        <input type="number" min="1" value={acreCount} onChange={(e) => setAcreCount(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" placeholder="Acres" />
                                    </div>
                                </div>
                            )}

                            <div className="bg-white p-4 rounded-xl border border-gray-100 mb-3 shadow-sm">
                                <p className="text-xs font-bold text-gray-500 mb-2 uppercase">{t('fare_estimate')}</p>
                                <div className="text-[11px] text-gray-600 space-y-1">
                                    <p>{t('rate')}: Rs {computed.selectedRate}/{t(`by_${computed.bookingType}`)}</p>
                                    <p>{t('quantity')}: {computed.quantity || 0}</p>
                                    <p>{t('base_cost')}: Rs {computed.baseCost}</p>
                                    <p>{t('platform_fee')}: Rs {computed.platformFee}</p>
                                    <p className="font-bold text-green-700">{t('estimated_total')}: Rs {computed.totalCost}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* --- MESSAGE SECTION WITH TRANSLATED PLACEHOLDER --- */}
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase">{t('message_optional')}</p>
                        <textarea
                            value={requestMessage}
                            onChange={(e) => setRequestMessage(e.target.value)}
                            rows="3"
                            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
                            placeholder={t('add_request_note')}
                        />
                    </div>

                    {!isOwner && (
                        <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{t('total_estimate')}</span>
                                <span className="text-2xl font-black text-gray-800">Rs {item.listingType === 'rent' ? computed.totalCost : displayPrice}</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleCreateRequest}
                                    disabled={submitting}
                                    className="w-full bg-green-700 text-white py-5 rounded-2xl font-black shadow-lg active:scale-95 transition-all uppercase tracking-wider text-sm"
                                >
                                    {submitting ? t('loading') : item.listingType === 'rent' ? t('book_now') : t('buy_now')}
                                </button>

                                <button
                                    onClick={handleWhatsAppBooking}
                                    className="w-full bg-white text-[#25D366] border-2 border-[#25D366] py-4 rounded-2xl font-black active:scale-95 transition-all flex items-center justify-center gap-2 text-sm uppercase"
                                >
                                    {t('whatsapp_owner')}
                                </button>
                            </div>

                            <p className="text-[9px] text-center text-gray-400 font-medium px-4 leading-relaxed">
                                * Final availability and pricing will be confirmed by the owner after the request is sent.
                            </p>
                        </div>
                    )}

                    {error && <p className="text-red-500 text-xs mt-2 font-bold text-center">{error}</p>}
                    {success && <p className="text-green-600 text-xs mt-2 font-bold text-center">{success}</p>}
                </div>
            </div>
        </MobileLayout>
    );
};

export default EquipmentDetails;