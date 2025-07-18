const express = require("express");
const {
  updateFormController,
  recentUpdatesController,
  pitchFormController,
  getFounderProfileController,
  updateProfileController,
  uploadImageController,
  deleteLogoController,
  getPitchsController,
  deletePitchController,
  deletePostController,
  getAllFounderController,
  postMergeRequest,
  getSentRequest,
  deleteSentRequest,
  getRequestController,
  updateStatusRequest,
  getAllInterestedController,
  logoutController,
} = require("../controller/founderController");
const authMiddleware = require("../middleware/authMiddleware");
const createUploadMiddleware = require("../middleware/uploadImageMiddleware");
const createPitchPdfUploadMiddleware = require("../middleware/uploadPitchPdfMiddleware");
const pitchUpload = createPitchPdfUploadMiddleware(
  "pitch",
  ["pdf"],
  1,
  "pitches",
  true
);
const multer = require("multer");
const upload = multer();
const router = express.Router();

const uploadFounderPost = createUploadMiddleware(
  undefined,
  ["jpg", "jpeg", "png", "webp"],
  1,
  "uploads/postImages"
);

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
router.post(
  "/logoUpload",
  authMiddleware,
  uploadProfileImage.single("logo"),
  uploadImageController
);
router.delete("/logoUpload", authMiddleware, deleteLogoController);

router.post(
  "/pitchForm",
  authMiddleware,
  pitchUpload.single("pitch"),
  pitchFormController
);
router.get("/getPitch", authMiddleware, getPitchsController);
router.delete("/deletePitch/:id", authMiddleware, deletePitchController);
router.delete("/deletePost/:id", authMiddleware, deletePostController);

router.get("/allFounderProfile", authMiddleware, getAllFounderController);

router.post("/mergeRequest", authMiddleware, upload.none(), postMergeRequest);
router.get("/getsentrequest", authMiddleware, getSentRequest);
router.get("/getrequest", authMiddleware, getRequestController);
router.put("/updaterequest/:id", authMiddleware, updateStatusRequest);
router.delete("/deleterequest/:id", authMiddleware, deleteSentRequest);

router.get("/getinterestedfounder", authMiddleware, getAllInterestedController);

router.post("/logout", logoutController);
module.exports = router;
