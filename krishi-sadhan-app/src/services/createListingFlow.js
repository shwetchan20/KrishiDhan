import { uploadImages } from "./cloudinaryService";
import { createListing } from "./listingService";

export async function createListingWithImages(formData, files) {

    const imageUrls = await uploadImages(files);

    const listingData = {
        ...formData,
        images: imageUrls
    };

    return await createListing(listingData);

}

// Alias for backward compatibility
export const createListingFlow = createListingWithImages;