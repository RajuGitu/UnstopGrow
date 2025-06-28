const express = require("express");
const { updateFormController } = require("../controller/founderController");
const authMiddleware = require("../middleware/authMiddleware");
const createUploadMiddleware = require("../middleware/uploadImageMiddleware");

const router = express.Router();

const uploadFounderPost = createUploadMiddleware(
  "founderPostMedia",
  ["jpg", "jpeg", "png", "webp"],
  1, // maxFiles (not used in this example but available)
  "uploads/postImages"
);

router.post(
  "/updateForm",
  authMiddleware,
  uploadFounderPost.single("media"),
  updateFormController
);

module.exports = router;