const pitchModel = require("../models/Global/Pitchmodel");
const founderProfilemodel = require("../models/Global/FounderProfilemodel");

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
}

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
                    totalLikes: { $sum: { $size: "$likes" } }
                }
            },
            { $sort: { totalLikes: -1, pitchCount: -1 } },
            { $limit: 3 }
        ]);

        const topStartupIds = topPitchStartups.map(startup => startup._id);

        const founderProfiles = await founderProfilemodel.find({
            startupId: { $in: topStartupIds }
        });

        const trendingStartups = founderProfiles.map(profile => ({
            startupId: profile.startupId,
            founderProfile: profile
        }));

        res.status(200).json({
            success: true,
            message: "Trending startups retrieved successfully",
            data: trendingStartups,
            totalCount: trendingStartups.length
        });

    } catch (error) {
        console.error("Trending Startup error:", error.message);
        res.status(500).json({
            error: "Server error while fetching trending startups"
        });
    }
};


module.exports = {
    logoutController,
    getTrendingStartup,
}