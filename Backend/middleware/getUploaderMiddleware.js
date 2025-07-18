// utils/uploadProof.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinaryPdfConfig');

// Base uploads directory (for local storage)
const baseUploadPath = path.join(__dirname, '../uploads');

// Helper to sanitize Aadhaar to safe filename
const sanitizeAadhaar = (aadhaar) => {
    return aadhaar ? aadhaar.replace(/[^0-9]/g, '') : 'unknown';
};

// Dynamic Multer config generator
const getUploader = (role, useCloudinary = true) => {
    const roleMap = {
        founder: 'founderProofs',
        investor: 'investorProofs',
        supporter: 'supporterProofs',
    };

    const folderName = roleMap[role.toLowerCase()];
    if (!folderName) {
        throw new Error('Invalid role provided for upload');
    }

    let storage;

    if (useCloudinary) {
        // Cloudinary storage configuration
        storage = new CloudinaryStorage({
            cloudinary,
            params: {
                folder: `proofs/${folderName}`, // Organized folder structure in Cloudinary
                resource_type: 'raw', // Important for PDF files
                allowed_formats: ['pdf'],
                public_id: (req, file) => {
                    const safeAadhaar = sanitizeAadhaar(req.body.aadhaar);
                    return `${safeAadhaar}_${Date.now()}`;
                },
            },
        });
    } else {
        // Local storage configuration (your existing code)
        const uploadPath = path.join(baseUploadPath, folderName);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadPath);
            },
            filename: function (req, file, cb) {
                const safeAadhaar = sanitizeAadhaar(req.body.aadhaar);
                cb(null, `${safeAadhaar}_${Date.now()}.pdf`);
            }
        });
    }

    const upload = multer({
        storage,
        fileFilter: function (req, file, cb) {
            if (file.mimetype !== 'application/pdf') {
                return cb(new Error('Only PDF files are allowed'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 } // 5MB
    });

    return upload;
};

// Helper function to get uploader for specific role with Cloudinary
const getCloudinaryUploader = (role) => {
    return getUploader(role, true);
};

// Helper function to get uploader for specific role with local storage
const getLocalUploader = (role) => {
    return getUploader(role, false);
};

// Helper function to delete proof file from Cloudinary
const deleteProofFromCloudinary = async (publicId) => {
    try {
        const { deletePdfFromCloudinary } = require('../config/cloudinaryPdfConfig');
        return await deletePdfFromCloudinary(publicId);
    } catch (error) {
        console.error('Error deleting proof from Cloudinary:', error);
        throw error;
    }
};

// Helper function to extract public ID from proof URL
const extractProofPublicId = (url) => {
    try {
        const { extractPdfPublicId } = require('../config/cloudinaryPdfConfig');
        return extractPdfPublicId(url);
    } catch (error) {
        console.error('Error extracting proof public ID:', error);
        return null;
    }
};

module.exports = {
    getUploader,
    getCloudinaryUploader,
    getLocalUploader,
    deleteProofFromCloudinary,
    extractProofPublicId,
    sanitizeAadhaar
};