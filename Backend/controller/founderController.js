const Post = require("../models/Global/Postmodel");
const Pitch = require("../models/Global/Pitchmodel");
const Profile = require("../models/Global/FounderProfilemodel");
const path = require("path");
const Request = require("../models/FounderFounder/mergerequestmodel");
const fs = require("fs/promises");
const Interest = require("../models/InvestorFounder/Interestmodel");
const Setting = require("../models/Investor/Setting");
const Domain = require("../models/Investor/Domain");
const { deleteFromCloudinary, extractPublicId } = require('../config/cloudinaryConfig');
const { deletePdfFromCloudinary } = require('../config/cloudinaryPdfConfig');
// const Founder = require('../models/foundermodel');

// const updatePitchPdfController = async (req, res) => {
//   try {
//     const { id } = req.params; // Pitch ID from URL parameter
//     const uploadedFile = req.file;
//     console.log('Uploaded PDF file:', uploadedFile);

//     // Validate that ID is provided
//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "Pitch ID is required"
//       });
//     }

//     // Check if pitch exists
//     const existingPitch = await Founder.findById(id);
//     if (!existingPitch) {
//       return res.status(404).json({
//         success: false,
//         message: "Pitch not found"
//       });
//     }

//     // If no file is uploaded, handle this case
//     if (!uploadedFile) {
//       return res.status(400).json({
//         success: false,
//         message: "No PDF file provided for update"
//       });
//     }

//     // Prepare update data
//     const updateData = {};

//     // Handle PDF update if file is uploaded
//     if (uploadedFile) {
//       const pdfData = {
//         url: uploadedFile.path,
//         publicId: uploadedFile.filename, // This is the public ID from Cloudinary
//         originalName: uploadedFile.originalname,
//         size: uploadedFile.size,
//         uploadedAt: new Date()
//       };
//       updateData.file = JSON.stringify(pdfData); // Assuming 'url' is the field name in Pitch model
//     }

//     console.log('PDF update data:', updateData);

//     // Update the pitch
//     const updatedPitch = await Founder.findByIdAndUpdate(
//       id,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Pitch PDF updated successfully",
//       data: updatedPitch
//     });

//   } catch (error) {
//     console.error("Error updating pitch PDF:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message
//     });
//   }
// };

const updateFormController = async (req, res) => {
  try {
    const { title, descriptions, tags } = req.body;
    const uploadedFile = req.file; // Cloudinary uploaded file
    const startupId = req.user.id;

    console.log('Uploaded file:', uploadedFile);

    // Validate required fields
    if (!title || !descriptions || !uploadedFile || !startupId) {
      return res.status(400).json({
        success: false,
        message: "Title, descriptions, image, and startupId are required."
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

    // Prepare image data for Cloudinary (similar to updateImagePostController)
    const imageData = {
      url: uploadedFile.path, // Cloudinary URL
      publicId: uploadedFile.filename, // Cloudinary public ID
      originalName: uploadedFile.originalname,
      size: uploadedFile.size,
      uploadedAt: new Date()
    };

    // Create the post object
    const newPost = new Post({
      startupId,
      title,
      description: descriptions, // Make sure your schema field matches
      media: JSON.stringify(imageData), // Store as JSON string like in updateImagePostController
      tags: tagArray,
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully.",
      data: newPost
    });

  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const recentUpdatesController = async (req, res) => {
  try {
    const startupId = req.user.id;
    const recentPosts = await Post.find({ startupId: startupId })
      .sort({ createdAt: -1 });

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

// const pitchFormController = async (req, res) => {
//   try {
//     const startupId = req.user.id;
//     const {
//       title,
//       tagline,
//       youtube,
//       problem,
//       solution,
//       market,
//       traction,
//       funding,
//       team,
//       raised,
//       activeUser,
//     } = req.body;
//     const pdf = req.file;

//     console.log("Received data:", {
//       startupId,
//       title,
//       tagline,
//       pdf,
//       youtube,
//       problem,
//       solution,
//       market,
//       traction,
//       funding,
//       team,
//       raised,
//       activeUser,
//     });

//     if (!startupId || !title || !tagline || !pdf || !youtube || !problem || !solution || !market || !traction || !funding || !team || !raised || !activeUser) {
//       return res.status(400).json({
//         error: "You have to provide all the details.",
//       });
//     }

//     const newPitch = new Pitch({
//       startupId,
//       title,
//       tagline,
//       pdf: pdf.path,
//       youtube,
//       problem,
//       solution,
//       market,
//       traction,
//       funding,
//       team,
//       raised,
//       activeUser,
//     });
//     const savedPitch = await newPitch.save();
//     res.status(201).json({
//       message: "Pitch Published Successfully.",
//       pitch: savedPitch,
//     });
//   } catch (error) {
//     console.log("publish Pitch Error:", error.message);
//     res.status(500).json({ error: "Server error while publishing pitch" });
//   }
// };


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
      traction,
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
      traction,
      funding,
      team,
      raised,
      activeUser,
    });

    if (!startupId || !title || !tagline || !pdf || !youtube || !problem || !solution || !market || !traction || !funding || !team || !raised || !activeUser) {
      return res.status(400).json({
        error: "You have to provide all the details.",
      });
    }

    // Check if startup already has a pitch and delete old PDF if exists
    const existingPitch = await Pitch.findOne({ startupId });
    if (existingPitch && existingPitch.pdf) {
      try {
        // Parse existing PDF data to get publicId
        const existingPdfData = JSON.parse(existingPitch.pdf);
        if (existingPdfData.publicId) {
          await deletePdfFromCloudinary(existingPdfData.publicId);
          console.log("Old PDF deleted from Cloudinary");
        }
      } catch (deleteError) {
        console.warn("Old PDF deletion from Cloudinary failed:", deleteError.message);
        // Continue with update even if deletion fails
      }
    }

    // Store complete PDF data as JSON string in the pdf field
    const pdfData = {
      url: pdf.path,
      publicId: pdf.filename, // This is the public ID from Cloudinary
      originalName: pdf.originalname,
      size: pdf.size,
      uploadedAt: new Date()
    };

    const newPitch = new Pitch({
      startupId,
      title,
      tagline,
      pdf: JSON.stringify(pdfData), // Store PDF data as JSON string
      youtube,
      problem,
      solution,
      market,
      traction,
      funding,
      team,
      raised,
      activeUser,
    });

    const savedPitch = await newPitch.save();

    // Parse PDF data for response
    let responseData = { ...savedPitch.toObject() };
    if (responseData.pdf) {
      try {
        responseData.pdfData = JSON.parse(responseData.pdf);
      } catch (e) {
        // If parsing fails, treat as old string format
        responseData.pdfData = { url: responseData.pdf };
      }
    }

    res.status(201).json({
      message: "Pitch Published Successfully.",
      pitch: responseData,
    });
  } catch (error) {
    console.log("publish Pitch Error:", error.message);

    // If there was an upload but save failed, clean up the uploaded file from Cloudinary
    if (req.file?.filename) {
      try {
        await deletePdfFromCloudinary(req.file.filename);
        console.log("Cleanup: Deleted uploaded PDF from Cloudinary after error");
      } catch (cleanupError) {
        console.error('Error cleaning up uploaded PDF:', cleanupError.message);
      }
    }

    res.status(500).json({ error: "Server error while publishing pitch" });
  }
};

// const updatePitchController = async (req, res) => {
//   try {
//     const startupId = req.user.id;
//     const {
//       title,
//       tagline,
//       youtube,
//       problem,
//       solution,
//       market,
//       traction,
//       funding,
//       team,
//       raised,
//       activeUser,
//     } = req.body;
//     const uploadedFile = req.file;

//     // If new PDF is uploaded, delete the old one from Cloudinary
//     if (uploadedFile) {
//       const existingPitch = await Pitch.findOne({ startupId });
//       if (existingPitch && existingPitch.pdf) {
//         try {
//           // Parse existing PDF data to get publicId
//           const existingPdfData = JSON.parse(existingPitch.pdf);
//           if (existingPdfData.publicId) {
//             await deletePdfFromCloudinary(existingPdfData.publicId);
//             console.log("Old PDF deleted from Cloudinary");
//           }
//         } catch (deleteError) {
//           console.warn("Old PDF deletion from Cloudinary failed:", deleteError.message);
//           // Continue with update even if deletion fails
//         }
//       }
//     }

//     const updateData = {
//       title,
//       tagline,
//       youtube,
//       problem,
//       solution,
//       market,
//       traction,
//       funding,
//       team,
//       raised,
//       activeUser,
//     };

//     // Store complete PDF data as JSON string in the pdf field
//     if (uploadedFile) {
//       const pdfData = {
//         url: uploadedFile.path,
//         publicId: uploadedFile.filename, // This is the public ID from Cloudinary
//         originalName: uploadedFile.originalname,
//         size: uploadedFile.size,
//         uploadedAt: new Date()
//       };
//       updateData.pdf = JSON.stringify(pdfData);
//     }

//     const updated = await Pitch.findOneAndUpdate(
//       { startupId },
//       { $set: updateData },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({
//         error: "Pitch not found for this startup",
//       });
//     }

//     // Parse PDF data for response
//     let responseData = { ...updated.toObject() };
//     if (responseData.pdf) {
//       try {
//         responseData.pdfData = JSON.parse(responseData.pdf);
//       } catch (e) {
//         // If parsing fails, treat as old string format
//         responseData.pdfData = { url: responseData.pdf };
//       }
//     }

//     res.status(200).json({
//       message: "Pitch updated successfully",
//       pitch: responseData,
//     });
//   } catch (error) {
//     console.log("update Pitch Error:", error.message);

//     // If there was an upload but update failed, clean up the uploaded file from Cloudinary
//     if (req.file?.filename) {
//       try {
//         await deletePdfFromCloudinary(req.file.filename);
//         console.log("Cleanup: Deleted uploaded PDF from Cloudinary after error");
//       } catch (cleanupError) {
//         console.error('Error cleaning up uploaded PDF:', cleanupError.message);
//       }
//     }

//     res.status(500).json({ error: "Server error while updating pitch" });
//   }
// };

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
    if (!founderId)
      return res.status(401).json({ error: "Unauthorized person" });
    const $set = {};
    const {
      bio,
      domain,
      achievements,
      readytomerge,
      location,
      startUpName,
      website,
      email,
      socials = {},
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
      return res.status(401).json({
        success: false,
        message: "Unauthorized person"
      });
    }

    const uploadedFile = req.file;
    console.log('Uploaded file:', uploadedFile);

    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        message: "Image not found"
      });
    }

    // Prepare image data for Cloudinary (following your pattern)
    const imageData = {
      url: uploadedFile.path, // Cloudinary URL
      publicId: uploadedFile.filename, // Cloudinary public ID
      originalName: uploadedFile.originalname,
      size: uploadedFile.size,
      uploadedAt: new Date()
    };

    const updated = await Profile.findOneAndUpdate(
      { startupId: founderId },
      { $set: { logo: JSON.stringify(imageData) } }, // Store as JSON string
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logo uploaded successfully",
      data: {
        url: uploadedFile.path,
        publicId: uploadedFile.filename
      }
    });

  } catch (error) {
    console.error("Error uploading logo:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const deleteLogoController = async (req, res) => {
  try {
    const founderId = req.user.id;

    const profile = await Profile.findOne({ startupId: founderId });
    if (!profile) {
      return res.status(404).json({
        error: "Profile not found",
        success: false
      });
    }

    if (!profile.logo) {
      return res.status(400).json({
        error: "No logo to delete",
        success: false
      });
    }

    // Parse logo data to get public ID
    let logoData;
    try {
      logoData = JSON.parse(profile.logo);
    } catch (parseError) {
      // If parsing fails, try to extract from URL (for backward compatibility)
      const publicId = extractPublicId(profile.logo);
      if (publicId) {
        logoData = { publicId };
      } else {
        return res.status(400).json({
          error: "Invalid logo data format",
          success: false
        });
      }
    }

    // Delete logo from Cloudinary
    if (logoData.publicId) {
      try {
        const result = await deleteFromCloudinary(logoData.publicId);
        console.log("Logo deleted from Cloudinary:", result);
      } catch (deleteError) {
        console.error("Failed to delete logo from Cloudinary:", deleteError.message);
        // Continue with database update even if Cloudinary deletion fails
      }
    }

    // Update database to remove logo reference
    const updatedProfile = await Profile.findOneAndUpdate(
      { startupId: founderId },
      {
        $unset: {
          logo: ""
        }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Logo deleted successfully",
      success: true,
      data: updatedProfile
    });
  } catch (error) {
    console.error("Logo Delete Error:", error.message);
    res.status(500).json({
      error: "Server error while deleting the logo",
      success: false
    });
  }
};

const getPitchsController = async (req, res) => {
  try {
    const founderId = req.user.id;
    if (!founderId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }
    const pitches = await Pitch.find({ startupId: founderId })
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({
      pitches
    })
  } catch (error) {
    console.error("Upload logo error:", error);
    return res.status(500).json({ error: "Server error while uploading logo" });
  }
}

const deletePitchController = async (req, res) => {
  try {
    const pitchId = req.params.id;
    const founderId = req.user.id;
    if (!pitchId) {
      return res.status(400).json({ error: "Pitch ID is required" });
    }
    const pitch = await Pitch.findById(pitchId);

    if (!pitch) {
      return res.status(404).json({ error: "Pitch not found" });
    }
    if (pitch.startupId.toString() !== founderId) {
      return res
        .status(403)
        .json({ error: "You are not allowed to delete this pitch" });
    }
    if (!pitch.pdf) return res.status(400).json({ error: "No Pdf to delete" });
    const absolutePath = path.isAbsolute(pitch.pdf)
      ? pitch.pdf
      : path.join(__dirname, "..", pitch.pdf);
    await fs.unlink(absolutePath).catch(() => { });
    pitch.pdf = null;
    await pitch.save();
    await Pitch.findByIdAndDelete(pitchId);
    return res.status(200).json({ message: "Pitch deleted successfully" });
  } catch (error) {
    console.error("Upload Pdf error:", error);
    return res.status(500).json({ error: "Server error while uploading Pdf" });
  }
}

const deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const founderId = req.user.id;
    if (!founderId) {
      return res.status(401).json({ error: "UnAuthorized Person" });
    }
    if (!postId) {
      return res.status(404).json({ error: "Post ID is required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    if (post.startupId.toString() !== founderId) {
      return res.status(403).json({ error: "You are not allowed to delete this pitch" });
    }
    if (!post.media) return res.status(400).json({ error: "No Pdf to delete" });
    const absolutePath = path.isAbsolute(post.media)
      ? post.media
      : path.join(__dirname, "..", post.media);
    await fs.unlink(absolutePath).catch(() => { });
    post.media = null;
    await post.save();
    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Upload logo error:", error);
    return res.status(500).json({ error: "Server error while uploading logo" });
  }
}

const getAllFounderController = async (req, res) => {
  try {
    const founderId = req.user.id;
    if (!founderId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }
    const allfounder = await Profile.find({ startupId: { $ne: founderId } });
    return res.status(200).json({
      message: "All Founder",
      allfounder
    });
  } catch (error) {
    console.error("Upload logo error:", error);
    return res.status(500).json({ error: "Server error while uploading logo" });
  }
}

const postMergeRequest = async (req, res) => {
  try {
    const founderId = req.user.id;
    if (!founderId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }
    const { name, email, message, startUpId } = req.body;
    if (!name || !email || !message || !startUpId) {
      return res
        .status(400)
        .json({ error: "Name, email, message and startUpId are required." });
    }
    const existingRequest = await Request.findOne({
      startUpIdSent: founderId,
      startUpIdReceive: startUpId,
    });

    if (existingRequest) {
      return res.status(409).json({ error: "You have already sent a request to this startup." });
    }
    const newRequest = new Request({
      startUpIdSent: founderId,
      startUpIdReceive: startUpId,
      describe: message,
      status: "pending", // optional, as default is already "new"
    });
    await newRequest.save();
    return res.status(201).json({
      message: "Merge request sent successfully",
      request: newRequest
    });
  } catch (error) {
    console.error("Upload logo error:", error);
    return res.status(500).json({ error: "Server error while uploading logo" });
  }
}

const deleteSentRequest = async (req, res) => {
  try {
    const founderId = req.user.id;
    if (!founderId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }

    const requestId = req.params.id;
    if (!requestId) {
      return res.status(400).json({ error: "Request ID is required" });
    }

    const pitch = await Request.findById(requestId);

    if (!pitch) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (pitch.startUpIdSent.toString() !== founderId) {
      return res.status(403).json({ error: "You can only delete your own request" });
    }

    await Request.findByIdAndDelete(requestId);

    return res.status(200).json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    console.error("Delete request error:", error);
    return res.status(500).json({ error: "Server error while deleting request" });
  }
};

const getSentRequest = async (req, res) => {
  try {
    const founderId = req.user.id;
    if (!founderId) {
      return res.status(401).json({ error: "UnAuthorized person" });
    }

    const allrequest = await Request.find({ startUpIdSent: founderId }).sort({ createdAt: -1 });

    if (!allrequest || allrequest.length === 0) {
      return res.status(200).json({
        success: true,
        mergedArray: [],
      });
    }

    const receiverIds = [...new Set(allrequest.map(req => req.startUpIdReceive))];

    const profiles = await Profile.find({ startupId: { $in: receiverIds } });

    const profileMap = profiles.reduce((map, profile) => {
      map[profile.startupId] = profile;
      return map;
    }, {});

    const mergedArray = allrequest.map((reqObj) => ({
      ...reqObj.toObject(),
      founderProfile: profileMap[reqObj.startUpIdReceive] || null
    }));

    return res.status(200).json({
      success: true,
      mergedArray
    });

  } catch (error) {
    console.error("Get sent request error:", error);
    return res.status(500).json({ error: "Server error while fetching sent requests" });
  }
};

const getRequestController = async (req, res) => {
  try {
    const founderId = req.user.id;
    if (!founderId) {
      return res.status(401).json({ error: "UnAuthorized person" });
    }

    const allrequest = await Request.find({ startUpIdReceive: founderId }).sort({ createdAt: -1 });

    if (!allrequest || allrequest.length === 0) {
      return res.status(200).json({
        success: true,
        mergedArray: [],
      });
    }

    const senderIds = [...new Set(allrequest.map(req => req.startUpIdSent))];

    const profiles = await Profile.find({ startupId: { $in: senderIds } });

    const profileMap = profiles.reduce((map, profile) => {
      map[profile.startupId] = profile;
      return map;
    }, {});

    const mergedArray = allrequest.map((reqObj) => ({
      ...reqObj.toObject(),
      founderProfile: profileMap[reqObj.startUpIdSent] || null
    }));

    return res.status(200).json({
      success: true,
      mergedArray
    });

  } catch (error) {
    console.error("Get request error:", error);
    return res.status(500).json({ error: "Server error while fetching requests" });
  }
};

const updateStatusRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const valid = ["accepted", "rejected"];
    if (!valid.includes(status))
      return res.status(400).json({ error: "Invalid status" });

    const updated = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Request not found" });
    res.json({ success: true, request: updated });
  } catch (error) {
    console.error("update request error:", error);
    return res.status(500).json({ error: "Server error while fetching requests" });
  }
}

const getAllInterestedController = async (req, res) => {
  try {
    const founderId = req.user.id;
    if (!founderId) {
      return res.status(401).json({ error: "Unauthorized person" });
    }
    const allintereset = await Interest.find({ startUpId: founderId });

    if (!allintereset || allintereset.length === 0) {
      return res.status(200).json({
        success: true,
        mergedArray: [],
      });
    }

    const senderIds = [...new Set(allintereset.map(req => req.investorId))];

    const profiles = await Setting.find({ investorId: { $in: senderIds } }).sort({ createdAt: -1 });

    const domains = await Domain.find({ investorId: { $in: senderIds } });

    const mergedArray = profiles.map(profile => {
      const domain = domains.find(d => d.investorId.toString() === profile.investorId.toString());
      return {
        investorId: profile.investorId,
        profile,
        domain: domain || {},
      };
    });

    return res.status(200).json({
      success: true,
      mergedArray
    })
  } catch (error) {
    console.error("update request error:", error);
    return res.status(500).json({ error: "Server error while fetching requests" });
  }
}

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

module.exports = {
  // updatePitchPdfController,
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
};