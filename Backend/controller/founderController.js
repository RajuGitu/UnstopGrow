const Post = require("../models/Global/Postmodel"); // Make sure to import your Post model
const Pitch = require("../models/Global/Pitchmodel");

const updateFormController = async (req, res) => {
  try {
    const { title, descriptions, tags } = req.body;
    const image = req.file; // Changed from req.media to req.file (standard multer)
    const startupId = req.user.id;

    console.log("Received data:", {
      title,
      descriptions,
      tags,
      image,
      startupId,
    });

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

    console.log("Received data:",{
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
    })

    if(!startupId || !title || !tagline || !pdf || !youtube || !problem || !solution || !market || !funding || !team || !raised || !activeUser){
        return res.status(400).json({
          error:"You have to provide all the details."
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
      message:"Pitch Published Successfully.",
      pitch: savedPitch,
    })

  } catch (error) {
    console.log("publish Pitch Error:", error.message);
    res.status(500).json({ error: "Server error while publishing pitch" });
  }
};
module.exports = {
  updateFormController,
  recentUpdatesController,
  pitchFormController,
};
