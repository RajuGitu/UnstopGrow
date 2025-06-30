const express = require("express");
const {
  updateFormController,
  recentUpdatesController,
  pitchFormController,
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

//Routes for founder post to get recent updates post in Recentupdates components

router.get("/recentUpdates", authMiddleware, recentUpdatesController);

//Routes for founder pitch to post the pitch in component pitchForm

router.post('/pitchForm',authMiddleware,pitchUpload.single("pitch"),pitchFormController);
module.exports = router;
