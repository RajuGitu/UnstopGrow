const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {updateInvestorDomainInterestController, updateinvestorProfileController, getinvestorProfileController , getInvestorDomainInterestController, deleteInvestorProfileImgController } = require('../controller/investorController');
const createUploadMiddleware = require("../middleware/uploadImageMiddleware");
const uploadInvestorProfileImg = createUploadMiddleware(
  undefined,
  ["jpg", "jpeg", "png", "webp"],
  1, // maxFiles (not used in this example but available)
  "uploads/investorProfileImage"
);

const router = express.Router();

//router to put the profile information of the investor in investorProfile component

router.put('/investorProfile',authMiddleware,uploadInvestorProfileImg.single('image'),updateinvestorProfileController);

//router to get the updated profile information  in investorProfile component

router.get('/investorProfile',authMiddleware,getinvestorProfileController);

//router to put the domain Invesest of the investor in investorDomainInterest component

router.put('/investorDomainInterest',authMiddleware,updateInvestorDomainInterestController);

//router to get the updated domain Invesest of the investor in investorDomainInterest component

router.get('/investorDomainInterest',authMiddleware,getInvestorDomainInterestController);

//router to delete the profile img  of investor before updating in investorProfile component

router.delete('/investorProfile',authMiddleware,deleteInvestorProfileImgController);




module.exports = router;