const Post = require("../models/Global/Postmodel"); // Make sure to import your Post model

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

module.exports = {
  updateFormController,
};
