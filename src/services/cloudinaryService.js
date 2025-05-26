const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;

export const getProductImagesByUser = async (userId) => {
	try {
		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image?prefix=productos/${userId}_product&max_results=100`,
			{
				headers: {
					'Authorization': `Basic ${btoa(`${CLOUDINARY_API_KEY}:${import.meta.env.VITE_CLOUDINARY_API_SECRET}`)}`
				}
			}
		);

		const data = await response.json();
		return data.resources;
	} catch (error) {
		console.error('Error fetching user product images:', error);
		return [];
	}
};

export const deleteProductImage = async (publicId) => {
	try {
		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Basic ${btoa(`${CLOUDINARY_API_KEY}:${import.meta.env.VITE_CLOUDINARY_API_SECRET}`)}`
				},
				body: JSON.stringify({
					public_id: publicId
				})
			}
		);

		return await response.json();
	} catch (error) {
		console.error('Error deleting product image:', error);
		throw error;
	}
};