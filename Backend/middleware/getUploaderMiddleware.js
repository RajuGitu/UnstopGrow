// utils/uploadProof.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Base uploads directory
const baseUploadPath = path.join(__dirname, '../uploads');

// Helper to sanitize Aadhaar to safe filename
const sanitizeAadhaar = (aadhaar) => {
    return aadhaar ? aadhaar.replace(/[^0-9]/g, '') : 'unknown';
};

// Dynamic Multer config generator
const getUploader = (role) => {
    const roleMap = {
        founder: 'founderProofs',
        investor: 'investorProofs',
        supporter: 'supporterProofs',
    };

    const folderName = roleMap[role.toLowerCase()];
    if (!folderName) {
        throw new Error('Invalid role provided for upload');
    }

    const uploadPath = path.join(baseUploadPath, folderName);
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const safeAadhaar = sanitizeAadhaar(req.body.aadhaar);
            cb(null, `${safeAadhaar}_${Date.now()}.pdf`);
        }
    });

    const upload = multer({
        storage,
        fileFilter: function (req, file, cb) {
            const ext = path.extname(file.originalname).toLowerCase();
            if (ext !== '.pdf') {
                return cb(new Error('Only PDF files are allowed'), false);
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 } // 5MB
    });

    return upload;
};

module.exports = getUploader;
