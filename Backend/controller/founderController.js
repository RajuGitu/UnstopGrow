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

// const Post = require("../models/Global/Postmodel");

// const updateFormController = async (req, res) => {
//   try {
//     const { title, descriptions, tags } = req.body;
//     const image = req.file;
//     const startupId = req.user.id;

//     // Enhanced logging to see what we're actually receiving
//     console.log("Received data:", {
//       title,
//       descriptions,
//       tags: typeof tags === 'string' ? tags : JSON.stringify(tags),
//       image: image ? {
//         fieldname: image.fieldname,
//         originalname: image.originalname,
//         filename: image.filename,
//         path: image.path,
//         size: image.size,
//         mimetype: image.mimetype
//       } : null,
//       startupId,
//       userObject: req.user // Log the entire user object to verify structure
//     });

//     // Check if req.user exists and has id property
//     if (!req.user) {
//       return res.status(401).json({
//         error: "User not authenticated"
//       });
//     }

//     if (!req.user.id) {
//       console.log("User object structure:", Object.keys(req.user));
//       return res.status(400).json({
//         error: "User ID not found in token. Available fields: " + Object.keys(req.user).join(', ')
//       });
//     }

//     if (!title || !descriptions || !image) {
//       return res.status(400).json({
//         error: "Title, descriptions, and image are required.",
//         received: {
//           title: !!title,
//           descriptions: !!descriptions,
//           image: !!image
//         }
//       });
//     }

//     // Handle tags - they come as JSON string from FormData
//     let tagArray = [];
//     if (tags) {
//       try {
//         tagArray = JSON.parse(tags);
//         console.log("Parsed tags:", tagArray);
//       } catch (parseError) {
//         console.log("JSON parse failed, treating as string:", parseError.message);
//         // Fallback: treat as comma-separated string
//         tagArray = tags.split(",").map((tag) => tag.trim());
//       }
//     }

//     // Validate that tagArray is actually an array
//     if (!Array.isArray(tagArray)) {
//       tagArray = []; // Default to empty array if parsing fails
//     }

//     // Create the post object
//     const postData = {
//       startupId,
//       title,
//       description: descriptions,
//       media: image.path || image.filename,
//       tags: tagArray,
//     };

//     console.log("Creating post with data:", postData);

//     const newPost = new Post(postData);
    
//     // Log before saving to catch any validation errors
//     console.log("About to save post...");
//     await newPost.save();
//     console.log("Post saved successfully");

//     res.status(201).json({
//       message: "Post created successfully.",
//       post: newPost,
//     });
//   } catch (error) {
//     console.error("Publish Update Error:", error);
    
//     // More detailed error logging
//     if (error.name === 'ValidationError') {
//       console.error("Validation errors:", error.errors);
//       return res.status(400).json({ 
//         error: "Validation failed", 
//         details: Object.keys(error.errors).map(key => ({
//           field: key,
//           message: error.errors[key].message
//         }))
//       });
//     }
    
//     if (error.code === 11000) {
//       console.error("Duplicate key error:", error.keyValue);
//       return res.status(400).json({ 
//         error: "Duplicate entry", 
//         field: Object.keys(error.keyValue)[0] 
//       });
//     }

//     res.status(500).json({ 
//       error: "Server error while publishing Update",
//       message: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// };

// module.exports = {
//   updateFormController,
// };