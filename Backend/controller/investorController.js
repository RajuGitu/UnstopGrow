const investorProfileInfo = require("../models/Investor/Setting");
const investorDomainInterest = require("../models/Investor/Domain");
const foundermodel = require("../models/foundermodel");
const investorSavedStartupsModel = require("../models/Investor/SavedStartups");
const founderProfilemodel = require("../models/Global/FounderProfilemodel");
const pitchModel = require("../models/Global/Pitchmodel");
const PostModel = require("../models/Global/Postmodel");
const investorInterestStartupsModel = require("../models/InvestorFounder/Interestmodel");
const Investor = require('../models/investormodel');
const path = require("path");
const fs = require("fs").promises;
const mongoose = require("mongoose");
const { deleteFromCloudinary } = require('../config/cloudinaryConfig');

const updateinvestorProfileController = async (req, res) => {
  try {
    const { company, bio } = req.body;
    const investorId = req.user.id;
    const uploadedFile = req.file;

    // If new image is uploaded, delete the old one from Cloudinary
    if (uploadedFile) {
      const existingProfile = await investorProfileInfo.findOne({ investorId });
      if (existingProfile && existingProfile.imagePublicId) {
        try {
          await deleteFromCloudinary(existingProfile.imagePublicId);
          console.log("Old image deleted from Cloudinary");
        } catch (deleteError) {
          console.warn("Old image deletion from Cloudinary failed:", deleteError.message);
          // Continue with update even if deletion fails
        }
      }
    }

    const updateData = { company, bio };

    // Add image data if file was uploaded
    if (uploadedFile) {
      updateData.image = uploadedFile.path; // Cloudinary URL
      updateData.imagePublicId = uploadedFile.filename; // Cloudinary public ID for future deletion
      updateData.imageOriginalName = uploadedFile.originalname;
      updateData.imageSize = uploadedFile.size;
    }

    const updated = await investorProfileInfo.findOneAndUpdate(
      { investorId },
      { $set: updateData },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Profile information updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("Profile information save Error:", error.message);

    // If there was an upload but update failed, clean up the uploaded file from Cloudinary
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
    });
  }
};

// const updateinvestorProfileController = async (req, res) => {
//   try {
//     const { company, bio } = req.body;
//     const investorId = req.user.id;
//     const image = req.file.path;

//     const updated = await investorProfileInfo.findOneAndUpdate(
//       { investorId },
//       { $set: { image, company, bio } },
//       { upsert: true, new: true }
//     );

//     res.status(200).json({
//       message: "Profile information updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     console.log("Profile information save Error:", error.message);
//     res.status(500).json({
//       error: "Server error while saving profile information",
//     });
//   }
// };

const updateInvestorDomainInterestController = async (req, res) => {
  try {
    const { interests } = req.body; // make sure this is { interests: [...] }
    const investorId = req.user.id;
    if (!Array.isArray(interests)) {
      return res.status(400).json({ error: "Interests must be an array" });
    }

    const updated = await investorDomainInterest.findOneAndUpdate(
      { investorId },
      { $set: { interests } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Domain interests updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("Domain Interest add Error:", error.message);
    res.status(500).json({
      error: "Server error while adding Domain Interest",
    });
  }
};

const getinvestorProfileController = async (req, res) => {
  try {
    const investorId = req.user.id;
    const investorProfile = await investorProfileInfo.findOne({
      investorId: investorId,
    });

    if (!investorProfile) {
      return res.status(404).json({ error: "Investor profile not found" });
    }

    res.status(200).json({
      success: true,
      data: investorProfile, // Return single object, not array
    });
  } catch (error) {
    console.log("Get Investor Profile Error:", error.message); // Fixed: was 'err' instead of 'error'
    res
      .status(500)
      .json({ error: "Server error while getting investor profile" });
  }
};

const getInvestorDomainInterestController = async (req, res) => {
  try {
    const investorId = req.user.id;
    const investorDomain = await investorDomainInterest.findOne({
      investorId: investorId,
    });

    if (!investorDomain) {
      return res.status(404).json({ error: "Investor profile not found" });
    }

    res.status(200).json({
      success: true,
      data: investorDomain,
    });
  } catch (error) {
    console.log("Get Investor Profile Error:", error.message); // Fixed: was 'err' instead of 'error'
    res
      .status(500)
      .json({ error: "Server error while getting investor profile" });
  }
};

const deleteInvestorProfileImgController = async (req, res) => {
  try {
    const investorId = req.user.id;

    const investorProfile = await investorProfileInfo.findOne({ investorId });
    if (!investorProfile) {
      return res.status(404).json({
        error: "Investor profile not found",
        success: false
      });
    }

    if (!investorProfile.image || !investorProfile.imagePublicId) {
      return res.status(400).json({
        error: "No Investor Profile Image to delete",
        success: false
      });
    }

    // Delete image from Cloudinary
    try {
      const result = await deleteFromCloudinary(investorProfile.imagePublicId);
      console.log("Image deleted from Cloudinary:", result);
    } catch (deleteError) {
      console.error("Failed to delete image from Cloudinary:", deleteError.message);
      // Continue with database update even if Cloudinary deletion fails
    }

    // Update database to remove image references
    const updatedProfile = await investorProfileInfo.findOneAndUpdate(
      { investorId },
      {
        $unset: {
          image: "",
          imagePublicId: "",
          imageOriginalName: "",
          imageSize: ""
        }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Investor profile image deleted successfully",
      success: true,
      data: updatedProfile
    });
  } catch (error) {
    console.error("Investor Profile Img Delete Error:", error.message);
    res.status(500).json({
      error: "Server error while deleting the investor profile image",
      success: false
    });
  }
};

// const deleteInvestorProfileImgController = async (req, res) => {
//   try {
//     const investorId = req.user.id;

//     const investorProfile = await investorProfileInfo.findOne({ investorId });
//     if (!investorProfile) {
//       return res.status(404).json({ error: "Investor profile not found" });
//     }

//     if (!investorProfile.image) {
//       return res
//         .status(400)
//         .json({ error: "No Investor Profile Image to delete" });
//     }

//     const absolutePath = path.isAbsolute(investorProfile.image)
//       ? investorProfile.image
//       : path.resolve(__dirname, "..", investorProfile.image);

//     await fs.unlink(absolutePath).catch((err) => {
//       console.warn("Image deletion skipped:", err.message);
//     });

//     investorProfile.image = null;
//     await investorProfile.save();

//     res.status(200).json({ message: "Investor profile image deleted" });
//   } catch (error) {
//     console.error("Investor Profile Img Error:", error.message);
//     res.status(500).json({
//       error: "Server error while deleting the investor profile image",
//     });
//   }
// };

const getInvestorDiscoverStartupsController = async (req, res) => {
  try {
    const investorId = req.user.id;

    // 1. Fetch all startups
    const discoverStartups = await founderProfilemodel.find();
    if (!discoverStartups || discoverStartups.length === 0) {
      return res.status(404).json({ error: "Startups are not found" });
    }

    // 2. Fetch all saved startups for this investor
    const savedStartups = await investorSavedStartupsModel.find({ investorId });

    const interestedStartup = await investorInterestStartupsModel.find({investorId})
    // 3. Create a Set of saved startup IDs for faster lookup
    const savedIds = new Set(
      savedStartups.map((item) => item.startUpId.toString())
    );

    const interestedIds = new Set(
      interestedStartup.map((item) => item.startUpId.toString())
    );

    // 4. Add `isSaved` to each startup
    const startupsWithSavedInterestedStatus = discoverStartups.map(
      (startup) => {
        return {
          ...startup.toObject(),
          isSaved: savedIds.has(startup.startupId.toString()),
          isInterest: interestedIds.has(startup.startupId.toString()),
        };
      }
    );

    // 5. Respond
    res.status(200).json({
      success: true,
      count: startupsWithSavedInterestedStatus.length,
      data: startupsWithSavedInterestedStatus,
    });
  } catch (error) {
    console.error("Fetching Startups Error:", error.message);
    res.status(500).json({
      error: "Server error while Fetching Startups",
    });
  }
};

const postInvestorSaveStartupsController = async (req, res) => {
  try {
    const investorId = req.user.id;
    const { startUpId } = req.body;

    if (!startUpId) {
      return res.status(400).json({
        success: false,
        error: "Startup ID is required.",
      });
    }

    if (!investorId) {
      return res.status(401).json({
        success: false,
        error: "Investor authentication required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(startUpId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid startup ID format.",
      });
    }

    const startupObjectId = new mongoose.Types.ObjectId(startUpId);

    const startup = await foundermodel.findById(startupObjectId);
    if (!startup) {
      return res.status(404).json({
        success: false,
        error: "Startup not found",
      });
    }

    const existingSave = await investorSavedStartupsModel.findOne({
      investorId,
      startUpId: startupObjectId, // 🔁 Correct field name here
    });

    if (existingSave) {
      return res.status(400).json({
        success: false,
        error: "Startup already saved",
      });
    }

    const newSavedStartup = new investorSavedStartupsModel({
      investorId,
      startUpId: startupObjectId, // 🔁 Correct field name here
    });

    await newSavedStartup.save();

    res.status(201).json({
      success: true,
      message: "Startup saved successfully",
      data: newSavedStartup,
    });
  } catch (error) {
    console.error("Save Startup Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while saving startup",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const deleteInvestorSaveStartupsController = async (req, res) => {
  try {
    const investorId = req.user.id;
    const { startUpId } = req.body; // Get startUpId from request body

    if (!startUpId) {
      return res.status(400).json({
        success: false,
        error: "Startup ID is required.",
      });
    }

    if (!investorId) {
      return res.status(401).json({
        success: false,
        error: "Investor authentication required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(startUpId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid startup ID format.",
      });
    }

    const startupObjectId = new mongoose.Types.ObjectId(startUpId);

    // Find the specific saved startup record
    const savedStartup = await investorSavedStartupsModel.findOne({
      investorId,
      startUpId: startupObjectId,
    });

    if (!savedStartup) {
      return res.status(404).json({
        success: false,
        error: "Saved startup not found",
      });
    }

    // Delete the saved startup record
    await investorSavedStartupsModel.findByIdAndDelete(savedStartup._id);

    res.status(200).json({
      success: true,
      message: "Startup unsaved successfully",
    });
  } catch (error) {
    console.error("Unsave Startup Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while unsaving startup",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getInvestorViewPitchController = async (req, res) => {
  try {
    const investorId = req.user.id;
    const founderId = req.params.founderId;

    if (!investorId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }

    if (!founderId) {
      return res.status(400).json({ error: "Founder ID is required" });
    }

    const founderObjectId = new mongoose.Types.ObjectId(founderId);

    // Get startup info
    const startup = await founderProfilemodel.findOne({
      startupId : founderObjectId,
    }).lean();

    if (!startup) {
      return res.status(404).json({ error: "Startup not found" });
    }

    const { startUpName, logo, location, domain } = startup;

    // Get pitch info
    const pitch = await pitchModel
      .find({ startupId: founderObjectId })
      .sort({ createdAt: -1 })
      .lean();
    const latestPitch = pitch[0];

    if (!latestPitch) {
      return res
        .status(404)
        .json({ error: "Pitch not found for this startup" });
    }

    // Merge and return as one object
    const pitchData = {
      ...latestPitch,
      startUpName,
      logo,
      location,
      domain,
    };

    return res.status(200).json({
      
      success: true,
      data: pitchData,
    });
  } catch (error) {
    console.error("Fetching specific pitch error:", error);
    return res.status(500).json({ error: "Server error while fetching pitch" });
  }
};

const postInvestorInterestStartupsController = async (req, res) => {
  try {
    const investorId = req.user.id;
    const { startUpId } = req.body;

    if (!startUpId) {
      return res.status(400).json({
        success: false,
        error: "Startup ID is required.",
      });
    }

    if (!investorId) {
      return res.status(401).json({
        success: false,
        error: "Investor authentication required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(startUpId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid startup ID format.",
      });
    }

    const startupObjectId = new mongoose.Types.ObjectId(startUpId);

    const startup = await foundermodel.findById(startupObjectId);
    if (!startup) {
      return res.status(404).json({
        success: false,
        error: "Startup not found",
      });
    }

    const existingInterested = await investorInterestStartupsModel.findOne({
      investorId,
      startUpId: startupObjectId, // 🔁 Correct field name here
    });

    if (existingInterested) {
      return res.status(400).json({
        success: false,
        error: "Startup already Interested",
      });
    }

    const newInterestedStartup = new investorInterestStartupsModel({
      investorId,
      startUpId: startupObjectId, // 🔁 Correct field name here
    });

    await newInterestedStartup.save();

    res.status(201).json({
      success: true,
      message: "Startup Interest successfully",
      data: newInterestedStartup,
    });
  } catch (error) {
    console.error("Interest Startup Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while loving startup",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const deleteInvestorInterestStartupsController = async (req, res) => {
  try {
    const investorId = req.user.id;
    const { startUpId } = req.body; // Get startUpId from request body

    if (!startUpId) {
      return res.status(400).json({
        success: false,
        error: "Startup ID is required.",
      });
    }

    if (!investorId) {
      return res.status(401).json({
        success: false,
        error: "Investor authentication required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(startUpId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid startup ID format.",
      });
    }

    const startupObjectId = new mongoose.Types.ObjectId(startUpId);

    // Find the specific saved startup record
    const interestedStartup = await investorInterestStartupsModel.findOne({
      investorId,
      startUpId: startupObjectId,
    });

    if (!interestedStartup) {
      return res.status(404).json({
        success: false,
        error: "Saved startup not found",
      });
    }

    // Delete the saved startup record
    await investorInterestStartupsModel.findByIdAndDelete(
      interestedStartup._id
    );

    res.status(200).json({
      success: true,
      message: "Startup uninterested successfully",
    });
  } catch (error) {
    console.error("Uninterested Startup Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while uninteresting the startup",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

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

const changePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const investorId = req.user.id;

    const investor = await Investor.findById(investorId);
    if (!investor) {
      return res.status(404).json({ error: "Investor not found" });
    }

    if (investor.password !== currentPassword) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    investor.password = newPassword;
    await investor.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Password change error:", error.message);
    res.status(500).json({ error: "Server error while changing password" });
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

const getInvestorSaveStartupsController = async (req, res) => {
  try {
    const investorId = req.user.id;
    if (!investorId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }

    const savedStartups = await investorSavedStartupsModel.find({ investorId });

    const savedIds = [...new Set(savedStartups.map((item) => item.startUpId))];

    const profiles = await founderProfilemodel
      .find({ startupId: { $in: savedIds } })
      .sort({ createdAt: -1 });

    const followers = await foundermodel.find({ _id: { $in: savedIds } });

    const interestedStartups = await investorInterestStartupsModel
      .find({ investorId: investorId })
      .lean();

    const interestedIds = new Set(
      interestedStartups.map((item) => item.startUpId.toString())
    );

    const savedStartupInfo = profiles.map((profile) => {
      const follow = followers.find(
        (f) => f._id.toString() === profile.startupId.toString()
      );

      const isInterest = interestedIds.has(profile.startupId.toString());

      return {
        savedstartupId: profile.startupId,
        profile,
        follow,
        isInterest,
      };
    });

    res.status(200).json({
      success: true,
      count: savedStartupInfo.length,
      data: savedStartupInfo,
    });
  } catch (error) {
    console.error("Fetching Saved Startups Error:", error.message);
    res.status(500).json({
      error: "Server error while Fetching Saved Startups",
    });
  }
};

const getInvestorInterestStartupsController = async (req, res) => {
  try {
    const investorId = req.user.id;
    if (!investorId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }

    const interestedStartups = await investorInterestStartupsModel.find({ investorId });

    const interestedStartupIds = [...new Set(interestedStartups.map((item) => item.startUpId))];

    const profiles = await founderProfilemodel.find({
      startupId: { $in: interestedStartupIds },
    });
    res.status(200).json({
      success:true,
      data:profiles,
    })
  } catch (error) {
    console.error("Fetching Interested Startups Error:", error.message);
    res.status(500).json({
      error: "Server error while Fetching Interested Startups",
    });
  }
};

module.exports = {
  updateinvestorProfileController,
  updateInvestorDomainInterestController,
  getinvestorProfileController,
  getInvestorDomainInterestController,
  deleteInvestorProfileImgController,
  getInvestorDiscoverStartupsController,
  postInvestorSaveStartupsController,
  deleteInvestorSaveStartupsController,
  getInvestorViewPitchController,
  postInvestorInterestStartupsController,
  deleteInvestorInterestStartupsController,
  logoutController,
  changePasswordController,
  getTrendingStartup,
  getInvestorSaveStartupsController,
  getInvestorInterestStartupsController,
};
