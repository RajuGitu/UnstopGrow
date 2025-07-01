const express = require("express");
const {
  updateFormController,
  recentUpdatesController,
  pitchFormController,
  getFounderProfileController,
  updateProfileController,
  uploadImageController,
  deleteLogoController,
} = require("../controller/founderController");
const authMiddleware = require("../middleware/authMiddleware");
const createUploadMiddleware = require("../middleware/uploadImageMiddleware");
const createPitchPdfUploadMiddleware = require("../middleware/uploadPitchPdfMiddleware");
const pitchUpload = createPitchPdfUploadMiddleware("pitch");

const router = express.Router();

const uploadFounderPost = createUploadMiddleware(
  undefined,
  ["jpg", "jpeg", "png", "webp"],
  1, // maxFiles (not used in this example but available)
  "uploads/postImages"
);

//Routes for founder post to post the updates in component updateForm

router.post(
  "/updateForm",
  authMiddleware,
  uploadFounderPost.single("media"),
  updateFormController
);

router.get("/recentUpdates", authMiddleware, recentUpdatesController);
router.get("/getprofile", authMiddleware, getFounderProfileController);
router.put("/updateprofile", authMiddleware, updateProfileController);

const uploadProfileImage = createUploadMiddleware(
  undefined,
  ["jpg", "jpeg", "png", "webp"],
  1,
  "uploads/FounderProfileImage"
);
router.post("/logoUpload", authMiddleware,uploadProfileImage.single('logo'),uploadImageController);
router.delete("/logoUpload",authMiddleware,deleteLogoController);

router.post('/pitchForm', authMiddleware, pitchUpload.single("pitch"), pitchFormController);
module.exports = router;
