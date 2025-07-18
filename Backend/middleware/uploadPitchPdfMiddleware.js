const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinaryPdfConfig'); 

const createPitchPdfUploadMiddleware = (
  fieldName = "pitch",
  allowedExtensions = ["pdf"],
  maxFiles = 1,
  customPath = "uploads/pitches",
  useCloudinary = true
) => {
  let storage;

  if (useCloudinary) {
    // Cloudinary storage configuration
    storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: customPath, // Use customPath as Cloudinary folder
        allowed_formats: allowedExtensions,
        resource_type: 'auto', // Important: allows PDF uploads
        public_id: (req, file) => {
          const title = req.body.title || "pitch";
          const startupId = req.user?.id || "unknown";
          
          const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 30);
          const safeStartupId = startupId.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20);
          
          return `${safeTitle}_${safeStartupId}_${Date.now()}`;
        },
      },
    });
  } else {
    // Local storage configuration (your existing code)
    const uploadPath = path.join(__dirname, `../${customPath}`);

    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        const title = req.body.title || "pitch";
        const startupId = req.user?.id || "unknown";

        const safeTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 30);
        const safeStartupId = startupId.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20);

        const ext = path.extname(file.originalname).toLowerCase(); // .pdf
        const fileName = `${safeTitle}_${safeStartupId}_${Date.now()}${ext}`;

        cb(null, fileName);
      },
    });
  }

  return multer({
    storage,
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDF files are allowed"), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  });
};

module.exports = createPitchPdfUploadMiddleware;