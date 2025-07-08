const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const { logoutController, getTrendingStartup, postSupporterLikesPostsController, getSupporterExploreAllPostController, deleteSupporterlikesPostsController, postSupporterFollowPostController, deleteSupporterFollowPostController, getSupporterLikesPostsController } = require('../controller/supporterController');
const router = express.Router();

router.get('/trending',authMiddleware,getTrendingStartup)
router.post('/logout', logoutController);

// router to get the all the post in the using context in SupporterAllPost page.

router.get("/supporterExploreAllPost",authMiddleware,getSupporterExploreAllPostController);

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



module.exports = router;