const pitchModel = require("../models/Global/Pitchmodel");
const founderProfilemodel = require("../models/Global/FounderProfilemodel");
const SupporterLikesPitch = require("../models/Supporter/SupporterLikesPitchSchema");
const SupporterFollows = require('../models/Supporter/SupporterFollowsSchema');
const Founder = require('../models/foundermodel');
const SupporterLikesPost = require('../models/Supporter/SupporterLikesPostSchema');
const postModel = require("../models/Global/Postmodel");
const supporterLikesPostsModel = require("../models/Supporter/SupporterLikesPostSchema")
const supporterFollowPostModel = require("../models/Supporter/SupporterFollowsSchema")
const supporterCommentsPostsModel = require("../models/Supporter/SupporterPostComment")
const founderModel = require("../models/foundermodel")
const SupporterProfileModel = require('../models/Supporter/SupporterProfileSchema');
const supporterModel = require('../models/supportermodel');
const mongoose = require('mongoose');
const path = require("path");
const { deleteFromCloudinary,extractPublicId } = require('../config/cloudinaryConfig');

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
            plainPitch.isFollow = followedPostes.includes(startupIdStr);
            plainPitch.isFollow = followedPostes.includes(startupIdStr);

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
        const founderId = req.params.id;
        if (!founderId) {
            return res.status(400).json({ error: "Missing founder id" });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(founderId)) {
            return res.status(400).json({ error: "Invalid founder id format" });
        }

        // Check if founder exists
        const founder = await Founder.findById(founderId);
        if (!founder) {
            return res.status(404).json({ error: "Founder not found" });
        }

        // METHOD 1: Check using the founder document we already have
        const isAlreadyFollowing = founder.followers.some(
            follower => follower.userId.toString() === supporterId.toString()
        );

        if (isAlreadyFollowing) {
            return res.status(400).json({
                error: "You are already following this founder"
            });
        }

        // Alternative METHOD 2: Using aggregation (more reliable)
        const existingFollow = await Founder.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(founderId) } },
            { $unwind: "$followers" },
            { $match: { "followers.userId": new mongoose.Types.ObjectId(supporterId) } },
            { $limit: 1 }
        ]);

        if (existingFollow.length > 0) {
            return res.status(400).json({
                error: "You are already following this founder"
            });
        }

        // Alternative METHOD 3: Using findOne with proper ObjectId conversion
        const existingFollowQuery = await Founder.findOne({
            _id: new mongoose.Types.ObjectId(founderId),
            "followers.userId": new mongoose.Types.ObjectId(supporterId)
        });

        if (existingFollowQuery) {
            return res.status(400).json({
                error: "You are already following this founder"
            });
        }



        if (existingFollowQuery) {
            return res.status(400).json({
                error: "You are already following this founder"
            });
        }

        // Add follower to founder's followers array
        await Founder.findByIdAndUpdate(
            founderId,
            {
                $addToSet: {
                    followers: {
                        userId: new mongoose.Types.ObjectId(supporterId),
                        userId: new mongoose.Types.ObjectId(supporterId),
                        followedAt: new Date(),
                    },
                },
            },
            { new: true }
        );

        // Add founder to supporter's following list
        await SupporterFollows.findOneAndUpdate(
            { supporterId: new mongoose.Types.ObjectId(supporterId) },
            { $addToSet: { startupIds: new mongoose.Types.ObjectId(founderId) } },
            { new: true, upsert: true }

        )


        res.status(200).json({
            success: true,
            message: "Founder followed successfully",
            message: "Founder followed successfully",
        });


    } catch (error) {
        console.error("Full error:", error);
        res.status(500).json({
            error: "Server error while following the founder"
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
        const supporterId = req.user.id;

        // Validate supporterId
        if (!supporterId) {
            return res.status(401).json({ error: "Unauthorized person" });
            return res.status(401).json({ error: "Unauthorized person" });
        }

        // Find the supporter's liked posts document
        const supporterLikes = await supporterLikesPostsModel.findOne({
            supporterId: supporterId
        });

        // If no likes document exists or no posts liked
        if (!supporterLikes || !supporterLikes.postIds || supporterLikes.postIds.length === 0) {
            return res.status(404).json({
                message: "No liked posts found",
            })
        }

        // Get full post information for all liked posts sorted by creation date
        // Get full post information for all liked posts sorted by creation date
        const likedPosts = await postModel.find({
            _id: { $in: supporterLikes.postIds }
        }).sort({ createdAt: -1 });

        // Get the supporter's followed startups
        const supporterFollows = await supporterFollowPostModel.findOne({
            supporterId: supporterId
        });

        // Create a Set of liked post IDs for efficient lookup (all posts are liked in this case)
        const likedPostIds = new Set(
            supporterLikes ? supporterLikes.postIds.map(id => id.toString()) : []
        );

        // Create a Set of followed startup IDs for efficient lookup
        const followedStartupIds = new Set(
            supporterFollows ? supporterFollows.startupIds.map(id => id.toString()) : []
        );

        const founder = await Founder.find({});

        // Add isLiked and isFollowed fields to each post
        const postsWithLikeFollowStatus = likedPosts.map(post => {
            const postObj = post.toObject();
            const startupIdStr = post.startupId.toString();
            postObj.isLiked = likedPostIds.has(post._id.toString()); // Will always be true for liked posts
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
        console.log("Liked Posts Error:", error.message);
        res.status(500).json({ error: "Server error while getting liked posts" });
    }
};

// const postSupporterCommentsPostController = async (req, res) => {
//     try {
//         const supporterId = req.user.id;
//         const { postId, comment } = req.body;

//         // Validation
//         if (!postId) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Post ID is required.",
//             });
//         }

//         if (!comment || comment.trim() === '') {
//             return res.status(400).json({
//                 success: false,
//                 error: "Comment is required.",
//             });
//         }

//         if (!supporterId) {
//             return res.status(401).json({
//                 success: false,
//                 error: "Supporter authentication required.",
//             });
//         }

//         // Get supporter details
//         const supporter = await supporterModel.findById(supporterId);
//         if (!supporter) {
//             return res.status(404).json({
//                 success: false,
//                 error: "Supporter not found.",
//             });
//         }

//         if (!mongoose.Types.ObjectId.isValid(postId)) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Invalid post ID format.",
//             });
//         }

//         const postObjectId = new mongoose.Types.ObjectId(postId);

//         // Check if post exists
//         const post = await postModel.findById(postObjectId);
//         if (!post) {
//             return res.status(404).json({
//                 success: false,
//                 error: "Post not found",
//             });
//         }

//         // Find or create supporter's comment tracking document
//         let supporterComments = await supporterCommentsPostsModel.findOne({
//             supporterId: supporterId
//         });

//         if (!supporterComments) {
//             // Create new document if it doesn't exist
//             supporterComments = new supporterCommentsPostsModel({
//                 supporterId: supporterId,
//                 postIds: [postObjectId]
//             });
//         } else {
//             // Check if post is already in the array to avoid duplicates
//             const isAlreadyInArray = supporterComments.postIds.some(
//                 id => id.toString() === postObjectId.toString()
//             );

//             if (!isAlreadyInArray) {
//                 // Add postId to the array only if it's not already there
//                 supporterComments.postIds.push(postObjectId);
//             }
//         }

//         // Save the supporter comments tracking document
//         await supporterComments.save();

//         // Add comment to the post
//         const updatedPost = await postModel.findByIdAndUpdate(
//             postObjectId,
//             {
//                 $push: {
//                     comments: {
//                         userId: supporterId,
//                         comment: comment.trim(),
//                         username: supporter.username,
//                     }
//                 }
//             },
//             { new: true }
//         );

//         // Get the newly added comment (last comment in the array)
//         const newComment = updatedPost.comments[updatedPost.comments.length - 1];

//         res.status(201).json({
//             success: true,
//             message: "Comment added successfully",
//             data: {
//                 commentId: newComment._id,
//                 supporterId: supporterId,
//                 postId: postObjectId,
//                 comment: comment.trim(),
//                 username: supporter.username,
//                 totalComments: updatedPost.comments.length,
//                 totalCommentedPosts: supporterComments.postIds.length
//             },
//         });

//     } catch (error) {
//         console.error("Comment Post Error:", error);
//         res.status(500).json({
//             success: false,
//             error: "Server error while adding comment",
//             details: process.env.NODE_ENV === "development" ? error.message : undefined,
//         });
//     }
// };

// const deleteSupporterCommentsPostController = async (req, res) => {
//     try {
//         const supporterId = req.user.id;
//         const { postId, commentId } = req.body;

//         // Validation
//         if (!postId || !commentId) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Post ID and Comment ID are required.",
//             });
//         }

//         if (!supporterId) {
//             return res.status(401).json({
//                 success: false,
//                 error: "Authentication required.",
//             });
//         }

//         // Validate ObjectIds
//         if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Invalid post ID or comment ID format.",
//             });
//         }

//         const postObjectId = new mongoose.Types.ObjectId(postId);
//         const commentObjectId = new mongoose.Types.ObjectId(commentId);

//         // Check if post exists
//         const post = await postModel.findById(postObjectId);
//         if (!post) {
//             return res.status(404).json({
//                 success: false,
//                 error: "Post not found",
//             });
//         }

//         // Find the comment and verify ownership
//         const comment = post.comments.id(commentObjectId);
//         if (!comment) {
//             return res.status(404).json({
//                 success: false,
//                 error: "Comment not found",
//             });
//         }

//         // Check if the comment belongs to the requesting user
//         if (comment.userId.toString() !== supporterId.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 error: "You can only delete your own comments",
//             });
//         }

//         // Remove the comment from the post
//         const updatedPost = await postModel.findByIdAndUpdate(
//             postObjectId,
//             {
//                 $pull: {
//                     comments: { _id: commentObjectId }
//                 }
//             },
//             { new: true }
//         );

//         // Check if user has any more comments on this post
//         const userHasMoreComments = updatedPost.comments.some(
//             comment => comment.userId.toString() === supporterId.toString()
//         );

//         // If user has no more comments on this post, remove postId from tracking
//         if (!userHasMoreComments) {
//             await supporterCommentsPostsModel.findOneAndUpdate(
//                 { supporterId: supporterId },
//                 {
//                     $pull: {
//                         postIds: postObjectId
//                     }
//                 }
//             );
//         }

//         res.status(200).json({
//             success: true,
//             message: "Comment deleted successfully",
//             data: {
//                 postId: postObjectId,
//                 commentId: commentObjectId,
//                 totalComments: updatedPost.comments.length,
//                 userHasMoreComments: userHasMoreComments
//             },
//         });

//     } catch (error) {
//         console.error("Delete Comment Error:", error);
//         res.status(500).json({
//             success: false,
//             error: "Server error while deleting comment",
//             details: process.env.NODE_ENV === "development" ? error.message : undefined,
//         });
//     }
// };

// const getSupporterAllLikedPitchController = async (req, res) => {
//     try {
//         const supporterId = req.user.id; // or req.user.id if from auth middleware

//         if (!supporterId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Supporter ID is required'
//             });
//         }
//         const supporterLikes = await SupporterLikesPitch.findOne({
//             supporterId: supporterId
//         });

//         if (!supporterLikes || !supporterLikes.pitchIds || supporterLikes.pitchIds.length === 0) {
//             return res.status(200).json({
//                 success: true,
//                 message: 'No liked Pitch found',
//                 data: []
//             });
//         }
//         const likedPitchDoc = await pitchModel.find({
//             _id: { $in: supporterLikes.pitchIds }
//         }).sort({ createdAt: -1 });

//         const followPost = await SupporterFollows.findOne({ supporterId });
//         const followedPostes = followPost?.startupIds?.map(id => id.toString()) || [];
//         const founder = await Founder.find({});
//         const allPitches = likedPitchDoc.map(pitch => {
//             const plainPitch = pitch.toObject();
//             plainPitch.isSaved = true;
//             plainPitch.isFollow = followedPostes.includes(pitch.startupId.toString());
//             const startupIdStr = pitch.startupId.toString();

//             const matchingFounder = founder.find(f => f._id.toString() === startupIdStr);
//             if (matchingFounder) {
//                 plainPitch.companyName = matchingFounder.companyName;
//                 plainPitch.ownerName = matchingFounder.ownerName;
//             } else {
//                 plainPitch.companyName = "Unknown";
//                 plainPitch.ownerName = "Unknown";
//             }
//             return plainPitch;
//         });
//         res.status(200).json({
//             success: true,
//             allPitches
//         }).sort({ createdAt: -1 });

//         // Get the supporter's followed startups
//         const supporterFollows = await supporterFollowPostModel.findOne({
//             supporterId: supporterId
//         });

//         // Create a Set of liked post IDs for efficient lookup (all posts are liked in this case)
//         const likedPostIds = new Set(
//             supporterLikes ? supporterLikes.postIds.map(id => id.toString()) : []
//         );

//         // Create a Set of followed startup IDs for efficient lookup
//         const followedStartupIds = new Set(
//             supporterFollows ? supporterFollows.startupIds.map(id => id.toString()) : []
//         );

//         const founder = await Founder.find({});

//         // Add isLiked and isFollowed fields to each post
//         const postsWithLikeFollowStatus = likedPosts.map(post => {
//             const postObj = post.toObject();
//             const startupIdStr = post.startupId.toString();
//             postObj.isLiked = likedPostIds.has(post._id.toString()); // Will always be true for liked posts
//             postObj.isFollowed = followedStartupIds.has(post.startupId.toString());

//             const matchingFounder = founder.find(f => f._id.toString() === startupIdStr);
//             if (matchingFounder) {
//                 postObj.companyName = matchingFounder.companyName;
//                 postObj.ownerName = matchingFounder.ownerName;
//             } else {
//                 postObj.companyName = "Unknown";
//                 postObj.ownerName = "Unknown";
//             }
//             return postObj;
//         });

//         // Return successful response
//         res.status(200).json({
//             success: true,
//             count: postsWithLikeFollowStatus.length,
//             data: postsWithLikeFollowStatus,
//         });

//     } catch (error) {
//         console.log("Liked Posts Error:", error.message);
//         res.status(500).json({ error: "Server error while getting liked posts" });
//     }
// };

const postSupporterCommentsPostController = async (req, res) => {
    try {
        const supporterId = req.user.id;
        const { postId, comment } = req.body;

        // Validation
        if (!postId) {
            return res.status(400).json({
                success: false,
                error: "Post ID is required.",
            });
        }

        if (!comment || comment.trim() === '') {
            return res.status(400).json({
                success: false,
                error: "Comment is required.",
            });
        }

        if (!supporterId) {
            return res.status(401).json({
                success: false,
                error: "Supporter authentication required.",
            });
        }

        // Get supporter details
        const supporter = await supporterModel.findById(supporterId);
        if (!supporter) {
            return res.status(404).json({
                success: false,
                error: "Supporter not found.",
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

        // Find or create supporter's comment tracking document
        let supporterComments = await supporterCommentsPostsModel.findOne({
            supporterId: supporterId
        });

        if (!supporterComments) {
            // Create new document if it doesn't exist
            supporterComments = new supporterCommentsPostsModel({
                supporterId: supporterId,
                postIds: [postObjectId]
            });
        } else {
            // Check if post is already in the array to avoid duplicates
            const isAlreadyInArray = supporterComments.postIds.some(
                id => id.toString() === postObjectId.toString()
            );

            if (!isAlreadyInArray) {
                // Add postId to the array only if it's not already there
                supporterComments.postIds.push(postObjectId);
            }
        }

        // Save the supporter comments tracking document
        await supporterComments.save();

        // Add comment to the post
        const updatedPost = await postModel.findByIdAndUpdate(
            postObjectId,
            {
                $push: {
                    comments: {
                        userId: supporterId,
                        comment: comment.trim(),
                        username: supporter.username,
                    }
                }
            },
            { new: true }
        );

        // Get the newly added comment (last comment in the array)
        const newComment = updatedPost.comments[updatedPost.comments.length - 1];

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: {
                commentId: newComment._id,
                supporterId: supporterId,
                postId: postObjectId,
                comment: comment.trim(),
                username: supporter.username,
                totalComments: updatedPost.comments.length,
                totalCommentedPosts: supporterComments.postIds.length
            },
        });

    } catch (error) {
        console.error("Comment Post Error:", error);
        res.status(500).json({
            success: false,
            error: "Server error while adding comment",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

const deleteSupporterCommentsPostController = async (req, res) => {
    try {
        const supporterId = req.user.id;
        const { postId, commentId } = req.body;

        // Validation
        if (!postId || !commentId) {
            return res.status(400).json({
                success: false,
                error: "Post ID and Comment ID are required.",
            });
        }

        if (!supporterId) {
            return res.status(401).json({
                success: false,
                error: "Authentication required.",
            });
        }

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid post ID or comment ID format.",
            });
        }

        const postObjectId = new mongoose.Types.ObjectId(postId);
        const commentObjectId = new mongoose.Types.ObjectId(commentId);

        // Check if post exists
        const post = await postModel.findById(postObjectId);
        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Find the comment and verify ownership
        const comment = post.comments.id(commentObjectId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                error: "Comment not found",
            });
        }

        // Check if the comment belongs to the requesting user
        if (comment.userId.toString() !== supporterId.toString()) {
            return res.status(403).json({
                success: false,
                error: "You can only delete your own comments",
            });
        }

        // Remove the comment from the post
        const updatedPost = await postModel.findByIdAndUpdate(
            postObjectId,
            {
                $pull: {
                    comments: { _id: commentObjectId }
                }
            },
            { new: true }
        );

        // Check if user has any more comments on this post
        const userHasMoreComments = updatedPost.comments.some(
            comment => comment.userId.toString() === supporterId.toString()
        );

        // If user has no more comments on this post, remove postId from tracking
        if (!userHasMoreComments) {
            await supporterCommentsPostsModel.findOneAndUpdate(
                { supporterId: supporterId },
                {
                    $pull: {
                        postIds: postObjectId
                    }
                }
            );
        }

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            data: {
                postId: postObjectId,
                commentId: commentObjectId,
                totalComments: updatedPost.comments.length,
                userHasMoreComments: userHasMoreComments
            },
        });

    } catch (error) {
        console.error("Delete Comment Error:", error);
        res.status(500).json({
            success: false,
            error: "Server error while deleting comment",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

const getSupporterAllLikedPitchController = async (req, res) => {
    try {
        const supporterId = req.user.id; // or req.user.id if from auth middleware

        if (!supporterId) {
            return res.status(400).json({
                success: false,
                message: 'Supporter ID is required'
            });
        }
        const supporterLikes = await SupporterLikesPitch.findOne({
            supporterId: supporterId
        });

        if (!supporterLikes || !supporterLikes.pitchIds || supporterLikes.pitchIds.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No liked Pitch found',
                data: []
            });
        }
        const likedPitchDoc = await pitchModel.find({
            _id: { $in: supporterLikes.pitchIds }
        }).sort({ createdAt: -1 });

        const followPost = await SupporterFollows.findOne({ supporterId });
        const followedPostes = followPost?.startupIds?.map(id => id.toString()) || [];
        const founder = await Founder.find({});
        const allPitches = likedPitchDoc.map(pitch => {
            const plainPitch = pitch.toObject();
            plainPitch.isSaved = true;
            plainPitch.isFollow = followedPostes.includes(pitch.startupId.toString());
            const startupIdStr = pitch.startupId.toString();

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
        console.error('Error getting supporter liked pitch:', error);
        console.error('Error getting supporter liked pitch:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

const getSupporterCountComments = async (req, res) => {
    try {
        const supporterId = req.user.id;

        const postCount = await supporterCommentsPostsModel.findOne({ supporterId });

        const commentsCount = postCount ? postCount.postIds.length : 0;

        res.status(200).json({
            success: true,
            data: { commentsCount }
        });
    } catch (error) {
        console.error("Error fetching Comments count:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch Comments count",
            error: error.message
        });
    }
}

const getSupporterFollowStartup = async (req, res) => {
    try {
        const supporterId = req.user.id;

        const followData = await SupporterFollows.findOne({ supporterId });

        if (!followData || !followData.startupIds || followData.startupIds.length === 0) {
            return res.status(200).json({ success: true, message: "No followed startups", founder: [] });
        }

        const followIds = followData.startupIds;

        const founders = await Founder.find({ _id: { $in: followIds } });
        const foundersProfile = await founderProfilemodel.find({ startupId: { $in: followIds } });

        // Map profile logos for quick access
        const profileMap = {};
        foundersProfile.forEach(profile => {
            profileMap[profile.startupId.toString()] = profile.logo;
        });

        const modifiedFounders = founders.map(founder => {
            const plainFounder = founder.toObject();
            plainFounder.isFollow = true;
            plainFounder.logo = profileMap[founder._id.toString()] || null;
            return plainFounder;
        });

        res.status(200).json({
            success: true,
            founder: modifiedFounders
        });
    } catch (error) {
        console.error("Error fetching followed startups:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch followed startups",
            error: error.message
        });
    }
};

const getSupporterProfile = async (req, res) => {
    try {
        const supporterId = req.user.id;

        const profile = await SupporterProfileModel.findOne({ SupporterId: supporterId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Supporter profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        console.error("Error fetching supporter profile:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching profile",
        });
    }
};

const updateProfileSupporterController = async (req, res) => {
    try {
        const { username, location } = req.body;
        const SupporterId = req.user.id;
        const uploadedFile = req.file;

        // If new image is uploaded, delete the old one from Cloudinary
        if (uploadedFile) {
            const existingProfile = await SupporterProfileModel.findOne({ SupporterId });
            if (existingProfile && existingProfile.image) {
                try {
                    // Parse existing image data to get publicId
                    const existingImageData = JSON.parse(existingProfile.image);
                    if (existingImageData.publicId) {
                        await deleteFromCloudinary(existingImageData.publicId);
                        console.log("Old image deleted from Cloudinary");
                    }
                } catch (deleteError) {
                    console.warn("Old image deletion from Cloudinary failed:", deleteError.message);
                    // Continue with update even if deletion fails
                }
            }
        }

        const updateData = { username, location };

        // Store complete image data as JSON string in the image field
        if (uploadedFile) {
            const imageData = {
                url: uploadedFile.path,
                publicId: uploadedFile.filename,
                originalName: uploadedFile.originalname,
                size: uploadedFile.size,
                uploadedAt: new Date()
            };
            updateData.image = JSON.stringify(imageData);
        }

        const updated = await SupporterProfileModel.findOneAndUpdate(
            { SupporterId },
            { $set: updateData },
            { upsert: true, new: true }
        );

        // Parse image data for response
        let responseData = { ...updated.toObject() };
        if (responseData.image) {
            try {
                responseData.imageData = JSON.parse(responseData.image);
            } catch (e) {
                // If parsing fails, treat as old string format
                responseData.imageData = { url: responseData.image };
            }
        }

        res.status(200).json({
            message: "Profile information updated successfully",
            data: responseData,
            success: true,
        });
    } catch (error) {
        console.log("Profile information save Error:", error.message);

        // Cleanup uploaded file if update failed
        if (req.file?.filename) {
            try {
                await deleteFromCloudinary(req.file.filename);
                console.log("Cleanup: Deleted uploaded file from Cloudinary after error");
            } catch (cleanupError) {
                console.error('Error cleaning up uploaded file:', cleanupError.message);
            }
        }

        res.status(500).json({
            error: "Server error while saving profile information",
            success: false,
        });
    }
};

const deleteSupporterProfileImgController = async (req, res) => {
    try {
        const SupporterId = req.user.id;

        const supporterProfile = await SupporterProfileModel.findOne({ SupporterId });
        if (!supporterProfile) {
            return res.status(404).json({
                error: "Supporter profile not found",
                success: false
            });
        }

        if (!supporterProfile.image) {
            return res.status(400).json({
                error: "No Supporter Profile Image to delete",
                success: false
            });
        }

        // Parse image data to get public ID
        let imageData;
        try {
            imageData = JSON.parse(supporterProfile.image);
        } catch (parseError) {
            // If parsing fails, treat as old string format (no public ID available)
            return res.status(400).json({
                error: "Invalid image data format",
                success: false
            });
        }

        // Delete image from Cloudinary
        if (imageData.publicId) {
            try {
                const result = await deleteFromCloudinary(imageData.publicId);
                console.log("Image deleted from Cloudinary:", result);
            } catch (deleteError) {
                console.error("Failed to delete image from Cloudinary:", deleteError.message);
                // Continue with database update even if Cloudinary deletion fails
            }
        }

        // Update database to remove image reference
        const updatedProfile = await SupporterProfileModel.findOneAndUpdate(
            { SupporterId },
            {
                $unset: {
                    image: ""
                }
            },
            { new: true }
        );

        res.status(200).json({
            message: "Supporter profile image deleted successfully",
            success: true,
            data: updatedProfile
        });
    } catch (error) {
        console.error("Supporter Profile Img Delete Error:", error.message);
        res.status(500).json({
            error: "Server error while deleting the supporter profile image",
            success: false
        });
    }
};

// const getSupporterCountComments = async (req, res) => {
//     try {
//         const supporterId = req.user.id;

//         const postCount = await supporterCommentsPostsModel.findOne({ supporterId });

//         const commentsCount = postCount ? postCount.postIds.length : 0;

//         res.status(200).json({
//             success: true,
//             data: { commentsCount }
//         });
//     } catch (error) {
//         console.error("Error fetching Comments count:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch Comments count",
//             error: error.message
//         });
//     }
// }

// const getSupporterFollowStartup = async (req, res) => {
//     try {
//         const supporterId = req.user.id;

//         const followData = await SupporterFollows.findOne({ supporterId });

//         if (!followData || !followData.startupIds || followData.startupIds.length === 0) {
//             return res.status(200).json({ success: true, message: "No followed startups", founder: [] });
//         }

//         const followIds = followData.startupIds;

//         const founders = await Founder.find({ _id: { $in: followIds } });
//         const foundersProfile = await founderProfilemodel.find({ startupId: { $in: followIds } });

//         // Map profile logos for quick access
//         const profileMap = {};
//         foundersProfile.forEach(profile => {
//             profileMap[profile.startupId.toString()] = profile.logo;
//         });

//         const modifiedFounders = founders.map(founder => {
//             const plainFounder = founder.toObject();
//             plainFounder.isFollow = true;
//             plainFounder.logo = profileMap[founder._id.toString()] || null;
//             return plainFounder;
//         });

//         res.status(200).json({
//             success: true,
//             founder: modifiedFounders
//         });
//     } catch (error) {
//         console.error("Error fetching followed startups:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch followed startups",
//             error: error.message
//         });
//     }
// };

// const getSupporterProfile = async (req, res) => {
//     try {
//         const supporterId = req.user.id;

//         const profile = await SupporterProfileModel.findOne({ SupporterId: supporterId });

//         if (!profile) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Supporter profile not found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: profile,
//         });
//     } catch (error) {
//         console.error("Error fetching supporter profile:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Server error while fetching profile",
//         });
//     }
// };

// const updateProfileSupporterController = async (req, res) => {
//     try {
//         const { username, location } = req.body;
//         const SupporterId = req.user.id;
//         const image = req.file?.path;

//         // If new image is uploaded, delete the old one
//         if (image) {
//             const existingProfile = await SupporterProfileModel.findOne({ SupporterId });
//             if (existingProfile && existingProfile.image) {
//                 const absolutePath = path.isAbsolute(existingProfile.image)
//                     ? existingProfile.image
//                     : path.resolve(__dirname, "..", existingProfile.image);

//                 await fs.unlink(absolutePath).catch((err) => {
//                     console.warn("Old image deletion skipped:", err.message);
//                 });
//             }
//         }

//         const updateData = { username, location };
//         if (image) {
//             updateData.image = image;
//         }

//         const updated = await SupporterProfileModel.findOneAndUpdate(
//             { SupporterId },
//             { $set: updateData },
//             { upsert: true, new: true }
//         );

//         res.status(200).json({
//             message: "Profile information updated successfully",
//             data: updated,
//             success: true,
//         });
//     } catch (error) {
//         console.log("Profile information save Error:", error.message);
//         res.status(500).json({
//             error: "Server error while saving profile information",
//             success: false,
//         });
//     }
// };

// const deleteSupporterProfileImgController = async (req, res) => {
//     try {
//         const SupporterId = req.user.id;

//         const supporterProfile = await SupporterProfileModel.findOne({ SupporterId });
//         if (!supporterProfile) {
//             return res.status(404).json({ error: "Supporter profile not found" }); // Fixed: was "Investor"
//         }

//         if (!supporterProfile.image) {
//             return res
//                 .status(400)
//                 .json({ error: "No Supporter Profile Image to delete" }); // Fixed: was "Investor"
//         }

//         const absolutePath = path.isAbsolute(supporterProfile.image)
//             ? supporterProfile.image
//             : path.resolve(__dirname, "..", supporterProfile.image);

//         await fs.unlink(absolutePath).catch((err) => {
//             console.warn("Image deletion skipped:", err.message);
//         });

//         supporterProfile.image = null;
//         await supporterProfile.save();

//         res.status(200).json({
//             message: "Supporter profile image deleted successfully", // Fixed: was "Investor"
//             success: true // Added for consistency
//         });
//     } catch (error) {
//         console.error("Supporter Profile Img Error:", error.message); // Fixed: was "Investor"
//         res.status(500).json({
//             error: "Server error while deleting the supporter profile image", // Fixed: was "investor"
//         });
//     }
// };
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
    postSupporterCommentsPostController,
    deleteSupporterCommentsPostController,
    getSupporterAllLikedPitchController,
    getSupporterCountComments,
    getSupporterFollowStartup,
    getSupporterProfile,
    updateProfileSupporterController,
    deleteSupporterProfileImgController,
};
