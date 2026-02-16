import { ServiceErrorCode, fail } from './errors';

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const asTrimmed = (value) => (typeof value === 'string' ? value.trim() : '');
const asNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : NaN;
};

export const validateUserPayload = (input) => {
    const payload = {
        uid: asTrimmed(input?.uid),
        name: asTrimmed(input?.name),
        phone: asTrimmed(input?.phone),
        city: asTrimmed(input?.city),
        photoURL: asTrimmed(input?.photoURL),
        role: asTrimmed(input?.role) || 'farmer',
    };

    if (!isNonEmptyString(payload.uid)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'uid is required');
    if (!isNonEmptyString(payload.name)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'name is required');
    if (!isNonEmptyString(payload.phone)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'phone is required');
    if (!isNonEmptyString(payload.city)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'city is required');

    return { ok: true, data: payload };
};

export const validateListingPayload = (input) => {
    const listingType = asTrimmed(input?.listingType);
    const lat = asNumber(input?.lat);
    const lng = asNumber(input?.lng);

    const payload = {
        id: asTrimmed(input?.id),
        ownerId: asTrimmed(input?.ownerId),
        title: asTrimmed(input?.title),
        description: asTrimmed(input?.description),
        category: asTrimmed(input?.category),
        city: asTrimmed(input?.city),
        lat,
        lng,
        images: Array.isArray(input?.images) ? input.images.filter(isNonEmptyString) : [],
        listingType,
        pricePerDay: input?.pricePerDay == null ? null : asNumber(input?.pricePerDay),
        priceUnit: input?.priceUnit == null ? null : asTrimmed(input?.priceUnit),
        sellPrice: input?.sellPrice == null ? null : asNumber(input?.sellPrice),
        isAvailable: typeof input?.isAvailable === 'boolean' ? input.isAvailable : true,
    };

    if (!isNonEmptyString(payload.ownerId)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'ownerId is required');
    if (!isNonEmptyString(payload.title)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'title is required');
    if (!isNonEmptyString(payload.description)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'description is required');
    if (!isNonEmptyString(payload.category)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'category is required');
    if (!isNonEmptyString(payload.city)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'city is required');
    if (!Number.isFinite(payload.lat)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'lat must be a number');
    if (!Number.isFinite(payload.lng)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'lng must be a number');

    if (!['rent', 'sell'].includes(payload.listingType)) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'listingType must be rent or sell');
    }

    if (!Array.isArray(input?.images)) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'images must be an array');
    }

    if (payload.listingType === 'rent') {
        if (!Number.isFinite(payload.pricePerDay) || payload.pricePerDay <= 0) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'pricePerDay is required for rent listings');
        }
        if (!['hour', 'day'].includes(payload.priceUnit)) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'priceUnit must be hour or day for rent listings');
        }
        payload.sellPrice = null;
    }

    if (payload.listingType === 'sell') {
        if (!Number.isFinite(payload.sellPrice) || payload.sellPrice <= 0) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'sellPrice is required for sell listings');
        }
        payload.pricePerDay = null;
        payload.priceUnit = null;
    }

    return { ok: true, data: payload };
};

export const validateRequestPayload = (input) => {
    const requestType = asTrimmed(input?.requestType);
    const bookingType = input?.bookingType == null ? null : asTrimmed(input?.bookingType);
    const asOptionalNumber = (value) => (value == null ? null : asNumber(value));

    const payload = {
        id: asTrimmed(input?.id),
        listingId: asTrimmed(input?.listingId),
        ownerId: asTrimmed(input?.ownerId),
        renterId: asTrimmed(input?.renterId),
        requestType,
        bookingType,
        startDate: input?.startDate ?? null,
        endDate: input?.endDate ?? null,
        hoursBooked: asOptionalNumber(input?.hoursBooked),
        acresBooked: asOptionalNumber(input?.acresBooked),
        daysBooked: asOptionalNumber(input?.daysBooked),
        baseCost: asOptionalNumber(input?.baseCost),
        travelCost: asOptionalNumber(input?.travelCost),
        platformFee: asOptionalNumber(input?.platformFee),
        totalCost: asOptionalNumber(input?.totalCost),
        farmerMessage: asTrimmed(input?.farmerMessage),
        ownerResponse: asTrimmed(input?.ownerResponse),
        paymentStatus: asTrimmed(input?.paymentStatus) || 'pending',
        message: asTrimmed(input?.message), // backward-compatible field
        status: asTrimmed(input?.status) || 'pending',
    };

    if (!isNonEmptyString(payload.listingId)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'listingId is required');
    if (!isNonEmptyString(payload.ownerId)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'ownerId is required');
    if (!isNonEmptyString(payload.renterId)) return fail(ServiceErrorCode.VALIDATION_ERROR, 'renterId is required');

    if (!['rent', 'buy'].includes(payload.requestType)) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'requestType must be rent or buy');
    }

    if (payload.requestType === 'rent') {
        if (!isNonEmptyString(payload.startDate) || !isNonEmptyString(payload.endDate)) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'startDate and endDate are required for rent requests');
        }
        if (!['hour', 'day', 'acre'].includes(payload.bookingType)) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'bookingType must be hour/day/acre for rent requests');
        }
        if (!Number.isFinite(payload.totalCost) || payload.totalCost <= 0) {
            return fail(ServiceErrorCode.VALIDATION_ERROR, 'totalCost is required for rent requests');
        }
    }

    if (payload.requestType === 'buy') {
        payload.bookingType = null;
        payload.startDate = null;
        payload.endDate = null;
        payload.hoursBooked = null;
        payload.acresBooked = null;
        payload.daysBooked = null;
    }

    if (!['pending', 'paid', 'cod'].includes(payload.paymentStatus)) {
        return fail(ServiceErrorCode.VALIDATION_ERROR, 'paymentStatus must be pending/paid/cod');
    }

    return { ok: true, data: payload };
};
