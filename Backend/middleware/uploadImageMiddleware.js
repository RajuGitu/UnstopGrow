const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createUploadMiddleware = (
  fieldName = "image",
  allowedExtensions = ["jpg", "jpeg", "png", "webp"],
  maxFiles = 1,
  customPath = "uploads/images"
) => {
  const uploadPath = path.join(__dirname, `../${customPath}`);

  // Ensure directory exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const safeTitle = req.body.title
        ? req.body.title
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "_")
            .slice(0, 40)
        : fieldName;
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${safeTitle}_${Date.now()}${ext}`);
    },
  });

  const allowedMimes = allowedExtensions.map((ext) => {
    switch (ext.toLowerCase()) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "webp":
        return "image/webp";
      case "gif":
        return "image/gif";
      default:
        return `image/${ext}`;
    }
  });

  return multer({
    storage,
    fileFilter: function (req, file, cb) {
      if (!allowedMimes.includes(file.mimetype)) {
        return cb(
          new Error(`Only ${allowedExtensions.join(", ")} images allowed`),
          false
        );
      }
      cb(null, true);
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });
};

module.exports = createUploadMiddleware;
