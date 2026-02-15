import { uploadImages } from './cloudinaryService';
import { createListing } from './listingService';
import { ServiceErrorCode, fail } from './errors';

export async function createListingFlow({ listingData, files }) {
    const uploadResult = await uploadImages(files);
    if (!uploadResult.ok) return uploadResult;

    const images = uploadResult.data;
    if (!Array.isArray(images)) {
        return fail(ServiceErrorCode.UPLOAD_ERROR, 'uploadImages must return an array');
    }

    return createListing({ ...listingData, images });
}

export const createListingWithImages = createListingFlow;
