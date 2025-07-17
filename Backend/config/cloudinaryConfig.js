// cloudinaryConfig.js
require('dotenv').config(); // Load .env variables

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};

// Helper function to extract public ID from Cloudinary URL
const extractPublicId = (url) => {
    if (!url) return null;

    // Remove query params (in case)
    const cleanUrl = url.split('?')[0];

    // Extract path between 'upload/' and extension
    const matches = cleanUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)$/);
    return matches ? matches[1] : null;
};


module.exports = {
    cloudinary,
    deleteFromCloudinary,
    extractPublicId
};