const Post = require("../models/Global/Postmodel"); // Make sure to import your Post model
const Pitch = require("../models/Global/Pitchmodel");
const Profile = require("../models/Global/Profilemodel");
const path = require("path");
const fs = require("fs/promises");
const updateFormController = async (req, res) => {
  try {
    const { title, descriptions, tags } = req.body;
    const image = req.file; // Changed from req.media to req.file (standard multer)
    const startupId = req.user.id;

    if (!title || !descriptions || !image || !startupId) {
      return res.status(400).json({
        error: "Title, descriptions, image, and startupId are required.",
      });
    }

    // Handle tags - they come as JSON string from FormData
    let tagArray = [];
    if (tags) {
      try {
        tagArray = JSON.parse(tags);
      } catch (parseError) {
        // Fallback: treat as comma-separated string
        tagArray = tags.split(",").map((tag) => tag.trim());
      }
    }

    // Create the post object
    const newPost = new Post({
      startupId,
      title,
      description: descriptions, // Make sure your schema field matches
      media: image.path || image.filename, // Store file path or filename
      tags: tagArray,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully.",
      post: newPost,
    });
  } catch (error) {
    console.log("Publish Update Error:", error.message); // Fixed: was 'err' instead of 'error'
    res.status(500).json({ error: "Server error while publishing Update" });
  }
};

const recentUpdatesController = async (req, res) => {
  try {
    const startupId = req.user.id;
    const recentPosts = await Post.find({ startupId: startupId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Check if posts exist
    if (!recentPosts || recentPosts.length === 0) {
      return res.status(404).json({
        message: "No recent updates found for this startup",
      });
    }
    // Return successful response
    res.status(200).json({
      success: true,
      count: recentPosts.length,
      data: recentPosts,
    });
  } catch (error) {
    console.log("Recent Update Error:", error.message); // Fixed: was 'err' instead of 'error'
    res.status(500).json({ error: "Server error while getting recent Update" });
  }
};

const pitchFormController = async (req, res) => {
  try {
    const startupId = req.user.id;
    const {
      title,
      tagline,
      youtube,
      problem,
      solution,
      market,
      funding,
      team,
      raised,
      activeUser,
    } = req.body;
    const pdf = req.file;

    console.log("Received data:", {
      startupId,
      title,
      tagline,
      pdf,
      youtube,
      problem,
      solution,
      market,
      funding,
      team,
      raised,
      activeUser,
    });

    if (!startupId || !title || !tagline || !pdf || !youtube || !problem || !solution || !market || !funding || !team || !raised || !activeUser) {
      return res.status(400).json({
        error: "You have to provide all the details."
      })
    }

    const newPitch = new Pitch({
      startupId,
      title,
      tagline,
      pdf: pdf.path,
      youtube,
      problem,
      solution,
      market,
      funding,
      team,
      raised,
      activeUser,
    })
    const savedPitch = await newPitch.save();
    res.status(201).json({
      message: "Pitch Published Successfully.",
      pitch: savedPitch,
    });
  } catch (error) {
    console.log("publish Pitch Error:", error.message);
    res.status(500).json({ error: "Server error while publishing pitch" });
  }
};

const getFounderProfileController = async (req, res) => {
  try {
    const founderId = req.user.id;

    if (!founderId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }

    const founder = await Profile.findOne({ startupId: founderId });

    if (!founder) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({
      success: true,
      founderProfile: founder,
    });
  } catch (error) {
    console.error("Get Founder Profile Error:", error.message);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const founderId = req.user.id;
    if (!founderId) return res.status(401).json({ error: "Unauthorized person" });
    const $set = {};
    const {
      bio, domain, achievements, readytomerge,
      location, startUpName, website, email, socials = {}
    } = req.body;

    if (bio !== undefined) $set.bio = bio;
    if (domain !== undefined) $set.domain = domain;
    if (achievements !== undefined) $set.achievements = achievements;
    if (readytomerge !== undefined) $set.readytomerge = readytomerge;
    if (location !== undefined) $set.location = location;
    if (startUpName !== undefined) $set.startUpName = startUpName;
    if (website !== undefined) $set.website = website;
    if (email !== undefined) $set.email = email;

    Object.entries(socials).forEach(([k, v]) => {
      $set[`socials.${k}`] = v;
    });

    const updated = await Profile.findOneAndUpdate(
      { startupId: founderId },
      { $set },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Update Founder Profile Error:", err);
    res.status(500).json({ error: "Server error while updating profile" });
  }
};

const uploadImageController = async (req, res) => {
  try {
    const founderId = req.user?.id;
    if (!founderId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }

    const image = req.file;
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const logoPath = image.path;

    const updated = await Profile.findOneAndUpdate(
      { startupId: founderId },
      { $set: { logo: logoPath } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.status(200).json({
      message: "Logo uploaded successfully",
      url: logoPath,
    });

  } catch (error) {
    console.error("Upload logo error:", error);
    return res.status(500).json({ error: "Server error while uploading logo" });
  }
};

const deleteLogoController = async (req, res) => {
  try {
    const founderId = req.user.id;
    const profile = await Profile.findOne({ startupId: founderId });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    if (!profile.logo) return res.status(400).json({ error: "No logo to delete" });
    const absolutePath = path.isAbsolute(profile.logo)
      ? profile.logo
      : path.join(__dirname, "..", profile.logo);
    await fs.unlink(absolutePath).catch(() => { });
    profile.logo = null;
    await profile.save();
    res.status(200).json({ message: "Logo deleted" });
  } catch (error) {
    console.error("Upload logo error:", error);
    return res.status(500).json({ error: "Server error while uploading logo" });
  }
}

module.exports = {
  updateFormController,
  recentUpdatesController,
  pitchFormController,
  getFounderProfileController,
  updateProfileController,
  uploadImageController,
  deleteLogoController
};
