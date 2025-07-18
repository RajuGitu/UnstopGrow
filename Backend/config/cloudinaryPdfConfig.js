// cloudinaryPdfConfig.js
require('dotenv').config(); // Load .env variables

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to delete PDF from Cloudinary
const deletePdfFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'raw' // PDFs are stored as 'raw' resource type
        });
        return result;
    } catch (error) {
        console.error('Error deleting PDF from Cloudinary:', error);
        throw error;
    }
};

// Helper function to extract public ID from Cloudinary PDF URL
const extractPdfPublicId = (url) => {
    if (!url) return null;

    // Remove query params (in case)
    const cleanUrl = url.split('?')[0];

    // Extract path between 'upload/' and .pdf extension
    const matches = cleanUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.pdf$/);
    return matches ? matches[1] : null;
};

// Helper function to get PDF info from Cloudinary
const getPdfInfo = async (publicId) => {
    try {
        const result = await cloudinary.api.resource(publicId, {
            resource_type: 'raw'
        });
        return result;
    } catch (error) {
        console.error('Error getting PDF info from Cloudinary:', error);
        throw error;
    }
};

// Helper function to generate PDF URL with transformations
const generatePdfUrl = (publicId, options = {}) => {
    try {
        const url = cloudinary.url(publicId, {
            resource_type: 'raw',
            ...options
        });
        return url;
    } catch (error) {
        console.error('Error generating PDF URL:', error);
        throw error;
    }
};

// Helper function to upload PDF directly (if needed)
const uploadPdfToCloudinary = async (filePath, options = {}) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',
            ...options
        });
        return result;
    } catch (error) {
        console.error('Error uploading PDF to Cloudinary:', error);
        throw error;
    }
};

// Helper function to list PDFs in a folder
const listPdfsInFolder = async (folderPath) => {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            resource_type: 'raw',
            prefix: folderPath,
            max_results: 100
        });
        return result.resources.filter(resource => 
            resource.format === 'pdf'
        );
    } catch (error) {
        console.error('Error listing PDFs from Cloudinary:', error);
        throw error;
    }
};

module.exports = {
    cloudinary,
    deletePdfFromCloudinary,
    extractPdfPublicId,
    getPdfInfo,
    generatePdfUrl,
    uploadPdfToCloudinary,
    listPdfsInFolder
};