const pitchModel = require("../models/Global/Pitchmodel");
const founderProfilemodel = require("../models/Global/FounderProfilemodel");
const SupporterLikesPitch = require("../models/Supporter/SupporterLikesPitchSchema");
const SupporterFollows = require('../models/Supporter/SupporterFollowsSchema');
const Founder = require('../models/foundermodel');
const SupporterLikesPost = require('../models/Supporter/SupporterLikesPostSchema');
const postModel = require("../models/Global/Postmodel");
const supporterLikesPostsModel = require("../models/Supporter/SupporterLikesPostSchema")
const supporterFollowPostModel = require("../models/Supporter/SupporterFollowsSchema")
const founderModel = require("../models/foundermodel")
const mongoose = require('mongoose');

const logoutController = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({ success: true, message: "Logged out" });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

const getTrendingStartup = async (req, res) => {
    try {
        const investorId = req.user.id;

        if (!investorId) {
            return res.status(401).json({
                success: false,
                error: "Investor authentication required.",
            });
        }

        const topPitchStartups = await pitchModel.aggregate([
            {
                $group: {
                    _id: "$startupId",
                    pitchCount: { $sum: 1 },
                    totalLikes: { $sum: { $size: "$likes" } },
                },
            },
            { $sort: { totalLikes: -1, pitchCount: -1 } },
            { $limit: 3 },
        ]);

        const topStartupIds = topPitchStartups.map((startup) => startup._id);

        const founderProfiles = await founderProfilemodel.find({
            startupId: { $in: topStartupIds },
        });

        const trendingStartups = founderProfiles.map((profile) => ({
            startupId: profile.startupId,
            founderProfile: profile,
        }));

        res.status(200).json({
            success: true,
            message: "Trending startups retrieved successfully",
            data: trendingStartups,
            totalCount: trendingStartups.length,
        });
    } catch (error) {
        console.error("Trending Startup error:", error.message);
        res.status(500).json({
            error: "Server error while fetching trending startups",
        });
    }
};

const getSupporterExploreAllPostController = async (req, res) => {
    try {
        const SupporterId = req.user.id;
        if (!SupporterId) {
            return res.status(401).json({ error: "Unauthorized person" });
        }

        // Get all posts sorted by creation date
        const recentAllPosts = await postModel.find().sort({ createdAt: -1 });

        // Check if posts exist
        if (!recentAllPosts || recentAllPosts.length === 0) {
            return res.status(404).json({
                message: "No recent updates found for this startup",
            });
        }

        // Get the supporter's liked posts
        const supporterLikes = await supporterLikesPostsModel.findOne({
            supporterId: SupporterId
        });

        // Get the supporter's followed startups
        const supporterFollows = await supporterFollowPostModel.findOne({
            supporterId: SupporterId
        });

        // Create a Set of liked post IDs for efficient lookup
        const likedPostIds = new Set(
            supporterLikes ? supporterLikes.postIds.map(id => id.toString()) : []
        );

        // Create a Set of followed startup IDs for efficient lookup
        const followedStartupIds = new Set(
            supporterFollows ? supporterFollows.startupIds.map(id => id.toString()) : []
        );
        const founder = await Founder.find({});

        // Add isLiked and isFollowed fields to each post
        const postsWithLikeFollowStatus = recentAllPosts.map(post => {
            const postObj = post.toObject();
            const startupIdStr = post.startupId.toString();
            postObj.isLiked = likedPostIds.has(post._id.toString());
            postObj.isFollowed = followedStartupIds.has(post.startupId.toString());

            const matchingFounder = founder.find(f => f._id.toString() === startupIdStr);
            if (matchingFounder) {
                postObj.companyName = matchingFounder.companyName;
                postObj.ownerName = matchingFounder.ownerName;
            } else {
                postObj.companyName = "Unknown";
                postObj.ownerName = "Unknown";
            }
            return postObj;
        });

        // Return successful response
        res.status(200).json({
            success: true,
            count: postsWithLikeFollowStatus.length,
            data: postsWithLikeFollowStatus,
        });
    } catch (error) {
        console.log("Recent Update Error:", error.message);
        res.status(500).json({ error: "Server error while getting recent Update" });
    }
};

const postSupporterLikesPostsController = async (req, res) => {
    try {
        const supporterId = req.user.id; // Fixed: should be supporterId, not SupportId
        const { postId } = req.body;

        // Validation
        if (!postId) {
            return res.status(400).json({
                success: false,
                error: "Post ID is required.",
            });
        }

        if (!supporterId) {
            return res.status(401).json({
                success: false,
                error: "Supporter authentication required.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid post ID format.",
            });
        }

        const postObjectId = new mongoose.Types.ObjectId(postId);

        // Check if post exists
        const post = await postModel.findById(postObjectId);
        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Find or create supporter's likes document
        let supporterLikes = await supporterLikesPostsModel.findOne({
            supporterId: supporterId // Fixed: should be supporterId
        });

        if (!supporterLikes) {
            // Create new document if it doesn't exist
            supporterLikes = new supporterLikesPostsModel({
                supporterId: supporterId,
                postIds: [postObjectId]
            });
        } else {
            // Check if post is already liked
            const isAlreadyLiked = supporterLikes.postIds.some(
                id => id.toString() === postObjectId.toString()
            );

            if (isAlreadyLiked) {
                return res.status(400).json({
                    success: false,
                    error: "Post already liked",
                });
            }

            // Add postId to the array
            supporterLikes.postIds.push(postObjectId);
        }

        // Save the document
        await supporterLikes.save();

        // Optional: Update the Post model's likes array as well
        await postModel.findByIdAndUpdate(
            postObjectId,
            {
                $addToSet: {
                    likes: { userId: supporterId }
                }
            },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Post liked successfully",
            data: {
                supporterId: supporterId,
                postId: postObjectId,
                totalLikedPosts: supporterLikes.postIds.length
            },
        });

    } catch (error) {
        console.error("Like Post Error:", error);
        res.status(500).json({
            success: false,
            error: "Server error while liking post",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

const deleteSupporterlikesPostsController = async (req, res) => {
    try {
        const supporterId = req.user.id;
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).json({
                success: false,
                error: "Post ID is required.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid post ID format.",
            });
        }

        const postObjectId = new mongoose.Types.ObjectId(postId);

        // Find supporter's likes document
        const supporterLikes = await supporterLikesPostsModel.findOne({
            supporterId: supporterId
        });

        if (!supporterLikes) {
            return res.status(400).json({
                success: false,
                error: "Post not liked yet",
            });
        }

        // Check if post is in the liked posts
        const postIndex = supporterLikes.postIds.findIndex(
            id => id.toString() === postObjectId.toString()
        );

        if (postIndex === -1) {
            return res.status(400).json({
                success: false,
                error: "Post not liked yet",
            });
        }

        // Remove the post from liked posts
        supporterLikes.postIds.splice(postIndex, 1);
        await supporterLikes.save();

        // Update the Post model's likes array as well
        await postModel.findByIdAndUpdate(
            postObjectId,
            {
                $pull: {
                    likes: { userId: supporterId }
                }
            }
        );

        res.status(200).json({
            success: true,
            message: "Post unliked successfully",
            data: {
                supporterId: supporterId,
                postId: postObjectId,
                totalLikedPosts: supporterLikes.postIds.length
            },
        });

    } catch (error) {
        console.error("Unlike Post Error:", error);
        res.status(500).json({
            success: false,
            error: "Server error while unliking post",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

const postSupporterFollowPostController = async (req, res) => {
    try {
        const SupporterId = req.user.id;
        const { startupId } = req.body;

        // Validation
        if (!startupId) {
            return res.status(400).json({
                success: false,
                error: "Startup ID is required.",
            });
        }

        if (!SupporterId) {
            return res.status(401).json({
                success: false,
                error: "Supporter authentication required.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(startupId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid startup ID format.",
            });
        }

        const startupObjectId = new mongoose.Types.ObjectId(startupId);

        // Check if startup exists
        const startup = await founderModel.findById(startupObjectId);
        if (!startup) {
            return res.status(404).json({
                success: false,
                error: "Startup not found",
            });
        }

        // Find or create supporter's follows document
        let supporterFollows = await supporterFollowPostModel.findOne({
            supporterId: SupporterId
        });

        if (!supporterFollows) {
            // Create new document if it doesn't exist
            supporterFollows = new supporterFollowPostModel({
                supporterId: SupporterId,
                startupIds: [startupObjectId]
            });
        } else {
            // Check if startup is already followed
            const isAlreadyFollowed = supporterFollows.startupIds.some(
                id => id.toString() === startupObjectId.toString()
            );

            if (isAlreadyFollowed) {
                return res.status(400).json({
                    success: false,
                    error: "Startup already followed",
                });
            }

            // Add startupId to the array
            supporterFollows.startupIds.push(startupObjectId);
        }

        // Save the document
        await supporterFollows.save();

        // Optional: Update the Founder model's followers array as well
        await founderModel.findByIdAndUpdate(
            startupObjectId,
            {
                $addToSet: {
                    followers: { userId: SupporterId }
                }
            },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Startup followed successfully",
            data: {
                supporterId: SupporterId,
                startupId: startupObjectId,
                totalFollowedStartups: supporterFollows.startupIds.length
            },
        });

    } catch (error) {
        console.error("Follow Startup Error:", error);
        res.status(500).json({
            success: false,
            error: "Server error while following startup",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

const deleteSupporterFollowPostController = async (req, res) => {
    try {
        const supporterId = req.user.id;
        const { startupId } = req.body;

        // Validation
        if (!startupId) {
            return res.status(400).json({
                success: false,
                error: "Startup ID is required.",
            });
        }

        if (!supporterId) {
            return res.status(401).json({
                success: false,
                error: "Supporter authentication required.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(startupId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid startup ID format.",
            });
        }

        const startupObjectId = new mongoose.Types.ObjectId(startupId);

        // Check if startup exists
        const startup = await founderModel.findById(startupObjectId);
        if (!startup) {
            return res.status(404).json({
                success: false,
                error: "Startup not found",
            });
        }

        // Find supporter's follows document
        const supporterFollows = await supporterFollowPostModel.findOne({
            supporterId: supporterId
        });

        if (!supporterFollows) {
            return res.status(400).json({
                success: false,
                error: "You are not following any startups",
            });
        }

        // Check if startup is currently followed
        const isCurrentlyFollowed = supporterFollows.startupIds.some(
            id => id.toString() === startupObjectId.toString()
        );

        if (!isCurrentlyFollowed) {
            return res.status(400).json({
                success: false,
                error: "You are not following this startup",
            });
        }

        // Remove startupId from the array
        supporterFollows.startupIds = supporterFollows.startupIds.filter(
            id => id.toString() !== startupObjectId.toString()
        );

        // Save the document
        await supporterFollows.save();

        // Optional: Update the Founder model's followers array as well
        await founderModel.findByIdAndUpdate(
            startupObjectId,
            {
                $pull: {
                    followers: { userId: supporterId }
                }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Startup unfollowed successfully",
            data: {
                supporterId: supporterId,
                startupId: startupObjectId,
                totalFollowedStartups: supporterFollows.startupIds.length
            },
        });

    } catch (error) {
        console.error("Unfollow Startup Error:", error);
        res.status(500).json({
            success: false,
            error: "Server error while unfollowing startup",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

const getSupporterAllPitchesController = async (req, res) => {
    try {
        const supporterId = req.user.id;
        if (!supporterId) {
            return res.status(401).json({ error: "Unauthorized person" });
        }

        const likedPost = await SupporterLikesPitch.findOne({ supporterId });
        const likedPitches = likedPost?.pitchIds?.map(id => id.toString()) || [];

        const followPost = await SupporterFollows.findOne({ supporterId });
        const followedPostes = followPost?.startupIds?.map(id => id.toString()) || [];

        const founder = await Founder.find({}); // all founders

        const allPitchDocs = await pitchModel.find({});

        const allPitches = allPitchDocs.map(pitch => {
            const plainPitch = pitch.toObject();
            const startupIdStr = pitch.startupId.toString();

            plainPitch.isSaved = likedPitches.includes(pitch._id.toString());
            plainPitch.isFollow = followedPostes.includes(pitch._id.toString());

            const matchingFounder = founder.find(f => f._id.toString() === startupIdStr);
            if (matchingFounder) {
                plainPitch.companyName = matchingFounder.companyName;
                plainPitch.ownerName = matchingFounder.ownerName;
            } else {
                plainPitch.companyName = "Unknown";
                plainPitch.ownerName = "Unknown";
            }

            return plainPitch;
        });

        res.status(200).json({
            success: true,
            allPitches
        });

    } catch (error) {
        console.error("Supporter All Pitches error:", error.message);
        res.status(500).json({
            error: "Server error while fetching supporter pitches"
        });
    }
};

const postSupporterPitchLikes = async (req, res) => {
    try {
        const supporterId = req.user.id;
        if (!supporterId) {
            return res.status(401).json({ error: "Unauthorized person" });
        }

        const pitchId = req.params.id;
        const pitch = await pitchModel.findById(pitchId);

        if (!pitch) {
            return res.status(404).json({ success: false, message: "Pitch not found" });
        }

        const alreadyLiked = pitch.likes.some(
            like => like.userId.toString() === supporterId.toString()
        );

        if (alreadyLiked) {
            return res.status(400).json({ success: false, message: "Already liked this pitch" });
        }

        pitch.likes.push({ userId: supporterId });
        await pitch.save();
        const result = await SupporterLikesPitch.findOneAndUpdate(
            { supporterId },                         // match this supporter
            { $addToSet: { pitchIds: pitchId } },    // add only if not present
            { new: true, upsert: true }              // create doc if it doesn't exist
        );

        res.status(200).json({
            success: true,
            message: "Pitch liked successfully",
            likesCount: pitch.likes.length
        });

    } catch (error) {
        console.error("Supporter Pitch Likes error:", error.message);
        res.status(500).json({
            error: "Server error while liking the pitch"
        });
    }
};

const postSupporterPitchFollow = async (req, res) => {
    try {
        const supporterId = req.user.id;
        if (!supporterId) {
            return res.status(401).json({ error: "Unauthorized person" });
        }
        const followId = req.params.id;
        if (!followId) {
            return res.status(400).json({ error: "Missing startup id" });
        }

        const ans = await Founder.findByIdAndUpdate(
            followId,
            {
                $addToSet: {
                    followers: {
                        userId: supporterId,
                        followedAt: new Date(),
                    },
                },
            },
            { new: true }
        );
        const result = await SupporterFollows.findOneAndUpdate(
            { supporterId },                         // match this supporter
            { $addToSet: { startupIds: followId } },    // add only if not present
            { new: true, upsert: true }              // create doc if it doesn't exist
        );
        res.status(200).json({
            success: true,
            message: "Supporter Followed successfully",

        });
    } catch (error) {
        console.error("Supporter Pitch Follow error:", error.message);
        res.status(500).json({
            error: "Server error while Follow the pitch"
        });
    }
}

const deleteSupporterPitchUnlikes = async (req, res) => {
    try {
        const supporterId = req.user.id;
        if (!supporterId) {
            return res.status(401).json({ error: "Unauthorized person" });
        }

        const pitchId = req.params.id;

        const pitch = await pitchModel.findById(pitchId);
        if (!pitch) {
            return res.status(404).json({ success: false, message: "Pitch not found" });
        }

        // Remove like from pitch.likes array
        const originalLength = pitch.likes.length;
        pitch.likes = pitch.likes.filter(like => like.userId.toString() !== supporterId.toString());

        if (pitch.likes.length === originalLength) {
            return res.status(400).json({ success: false, message: "You have not liked this pitch yet" });
        }

        await pitch.save();

        // Remove pitchId from SupporterLikesPitch document
        const likedPitchesDoc = await SupporterLikesPitch.findOne({ supporterId });

        if (likedPitchesDoc) {
            likedPitchesDoc.pitchIds = likedPitchesDoc.pitchIds.filter(
                id => id.toString() !== pitchId.toString()
            );
            await likedPitchesDoc.save();
        }

        return res.status(200).json({
            success: true,
            message: "Pitch unliked successfully",
            likesCount: pitch.likes.length,
        });

    } catch (error) {
        console.error("Supporter Pitch Unlike error:", error.message);
        res.status(500).json({
            error: "Server error while unliking the pitch",
        });
    }
};

const deleteSupporterPitchUnfollow = async (req, res) => {
    try {
        const supporterId = req.user.id;
        if (!supporterId) {
            return res.status(401).json({ error: "Unauthorized person" });
        }
        const startupId = req.params.id;

        const startup = await Founder.findById(startupId);
        if (!startup) {
            return res.status(404).json({ success: false, message: "Founder not found" });
        }
        const originalLength = startup.followers.length;
        startup.followers = startup.followers.filter(follow => follow.userId.toString() !== supporterId.toString());

        if (startup.followers.length === originalLength) {
            return res.status(400).json({ success: false, message: "You have not Unfollow this pitch yet" });
        }
        await startup.save();
        const followPitchesDoc = await SupporterFollows.findOne({ supporterId });

        if (followPitchesDoc) {
            followPitchesDoc.startupIds = followPitchesDoc.startupIds.filter(
                id => id.toString() !== startupId.toString()
            )
            await followPitchesDoc.save();
        }
        return res.status(200).json({
            success: true,
            message: "founder unFollowed successfully",
            followCount: startup.followers.length,
        })
    } catch (error) {
        console.error("Supporter Pitch UnFollow error:", error.message);
        res.status(500).json({
            error: "Server error while Unfollow the pitch",
        });
    }
}

const getSupporterCountFollow = async (req, res) => {
    try {
        const supporterId = req.user.id;
        const followData = await SupporterFollows.findOne({ supporterId });
        const followCount = followData ? followData.startupIds.length : 0;

        res.status(200).json({
            success: true,
            data: { followCount }
        });
    } catch (error) {
        console.error("Error fetching follow count:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch follow count",
            error: error.message
        });
    }
};

const getSupporterCountLikes = async (req, res) => {
    try {
        const supporterId = req.user.id;

        const pitchlikes = await SupporterLikesPitch.findOne({ supporterId });
        const postlikes = await SupporterLikesPost.findOne({ supporterId });

        const PitchlikesCount = pitchlikes ? pitchlikes.pitchIds.length : 0;
        const PostlikesCount = postlikes ? postlikes.postIds.length : 0;

        const totalLikesCount = PitchlikesCount + PostlikesCount;

        res.status(200).json({
            success: true,
            data: { totalLikesCount }
        });
    } catch (error) {
        console.error("Error fetching follow count:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch follow count",
            error: error.message
        });
    }
};

const getSupporterLikesPostsController = async (req, res) => {
    try {
        const supporterId = req.user.id; // or req.user.id if from auth middleware

        // Validate supporterId
        if (!supporterId) {
            return res.status(400).json({
                success: false,
                message: 'Supporter ID is required'
            });
        }

        // Find the supporter's liked posts document
        const supporterLikes = await supporterLikesPostsModel.findOne({
            supporterId: supporterId
        });

        // If no likes document exists or no posts liked
        if (!supporterLikes || !supporterLikes.postIds || supporterLikes.postIds.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No liked posts found',
                data: []
            });
        }

        // Get full post information for all liked posts
        const likedPosts = await postModel.find({
            _id: { $in: supporterLikes.postIds }
        })
            .sort({ createdAt: -1 }); // Sort by newest first

        return res.status(200).json({
            success: true,
            message: 'Liked posts retrieved successfully',
            data: likedPosts,
            count: likedPosts.length
        });

    } catch (error) {
        console.error('Error getting supporter liked posts:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    logoutController,
    getTrendingStartup,
    getSupporterAllPitchesController,
    postSupporterPitchLikes,
    deleteSupporterPitchUnlikes,
    postSupporterPitchFollow,
    deleteSupporterPitchUnfollow,
    getSupporterCountFollow,
    getSupporterCountLikes,
    getSupporterExploreAllPostController,
    postSupporterLikesPostsController,
    deleteSupporterlikesPostsController,
    postSupporterFollowPostController,
    deleteSupporterFollowPostController,
    getSupporterLikesPostsController,
};
