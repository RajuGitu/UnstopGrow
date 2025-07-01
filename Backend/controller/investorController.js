const investorProfileInfo = require("../models/Investor/Setting");
const investorDomainInterest = require("../models/Investor/Domain");
const path = require("path");
const fs = require("fs").promises;

const updateinvestorProfileController = async (req, res) => {
  try {
    const { company, bio } = req.body;
    const investorId = req.user.id;
    const image = req.file.path;

    const updated = await investorProfileInfo.findOneAndUpdate(
      { investorId },
      { $set: { image, company, bio } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Profile information updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("Profile information save Error:", error.message);
    res.status(500).json({
      error: "Server error while saving profile information",
    });
  }
};

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
      return res.status(404).json({ error: "Investor profile not found" });
    }

    if (!investorProfile.image) {
      return res.status(400).json({ error: "No Investor Profile Image to delete" });
    }

    const absolutePath = path.isAbsolute(investorProfile.image)
      ? investorProfile.image
      : path.resolve(__dirname, "..", investorProfile.image);

    await fs.unlink(absolutePath).catch((err) => {
      console.warn("Image deletion skipped:", err.message);
    });

    investorProfile.image = null;
    await investorProfile.save();

    res.status(200).json({ message: "Investor profile image deleted" });
  } catch (error) {
    console.error("Investor Profile Img Error:", error.message);
    res.status(500).json({
      error: "Server error while deleting the investor profile image",
    });
  }
};

module.exports = {
  updateinvestorProfileController,
  updateInvestorDomainInterestController,
  getinvestorProfileController,
  getInvestorDomainInterestController,
  deleteInvestorProfileImgController,
};
