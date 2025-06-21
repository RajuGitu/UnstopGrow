const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadPath = path.join(__dirname, '../uploads/founderProofs');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Helper to sanitize Aadhaar to safe filename
const sanitizeAadhaar = (aadhaar) => {
    return aadhaar.replace(/[^0-9]/g, ''); // Only digits allowed
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const safeAadhaar = sanitizeAadhaar(req.body.aadhaar); // Must be available before file field
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
    limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB
});

module.exports = upload;
