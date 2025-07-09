const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const { logoutController, getTrendingStartup, getSupporterAllPitchesController, postSupporterPitchLikes, deleteSupporterPitchUnlikes, postSupporterPitchFollow, deleteSupporterPitchUnfollow, getSupporterCountFollow, getSupporterCountLikes , postSupporterLikesPostsController, getSupporterExploreAllPostController, deleteSupporterlikesPostsController, postSupporterFollowPostController, deleteSupporterFollowPostController, getSupporterLikesPostsController , postSupporterCommentsPostController, deleteSupporterCommentsPostController , getSupporterAllLikedPitchController, getSupporterCountComments, getSupporterFollowStartup, getSupporterProfile, updateProfileSupporterController, deleteSupporterProfileImgController} = require('../controller/supporterController');
const createUploadMiddleware = require('../middleware/uploadImageMiddleware');

const router = express.Router();

router.post('/logout', logoutController);
router.get('/trending', authMiddleware, getTrendingStartup);
router.get('/supporterallPitches', authMiddleware, getSupporterAllPitchesController);
router.post('/supporterpitchlikes/:id', authMiddleware, postSupporterPitchLikes);
router.delete('/supporterpitchunlikes/:id', authMiddleware, deleteSupporterPitchUnlikes);
router.post('/supporterpitchfollow/:id', authMiddleware, postSupporterPitchFollow);
router.delete('/supporterpitchunfollow/:id', authMiddleware, deleteSupporterPitchUnfollow);
router.get("/getcountfollow", authMiddleware, getSupporterCountFollow);
router.get("/getCountLikes", authMiddleware, getSupporterCountLikes);
router.get("/getcountcomments", authMiddleware, getSupporterCountComments);

// router to get the all the post in the using context in SupporterAllPost page.

router.get("/supporterExploreAllPost", authMiddleware, getSupporterExploreAllPostController);

//router to post the likes to the post of the startups in Allpostlist components.

router.post(
  "/supporterLikesPosts",
  authMiddleware,
  postSupporterLikesPostsController,
);

router.delete(
  "/supporterLikesPosts",
  authMiddleware,
  deleteSupporterlikesPostsController,
);

router.get(
  "/supporterLikesPosts",
  authMiddleware,
  getSupporterLikesPostsController,
);

router.post(
  "/supporterFollowPosts",
  authMiddleware,
  postSupporterFollowPostController
)

router.delete(
  "/supporterFollowPosts",
  authMiddleware,
  deleteSupporterFollowPostController
)

router.post(
    "/supporterCommentsPosts",
    authMiddleware,
    postSupporterCommentsPostController
)

router.delete(
    "/supporterCommentsPosts",
    authMiddleware,
    deleteSupporterCommentsPostController
)


router.get('/alllikedpitch', authMiddleware, getSupporterAllLikedPitchController);

router.get('/allfollowedstartup',authMiddleware,getSupporterFollowStartup);

router.get('/supporterProfile',authMiddleware,getSupporterProfile);

const uploadSupporterProfileImg = createUploadMiddleware(
  undefined,
  ["jpg", "jpeg", "png", "webp"],
  1,
  "uploads/supporterProfileImage"
)

router.put(
  "/supporterProfile",
  authMiddleware,
  uploadSupporterProfileImg.single("image"),
  updateProfileSupporterController  
);

router.delete('/supporterProfile',authMiddleware,deleteSupporterProfileImgController);

module.exports = router;