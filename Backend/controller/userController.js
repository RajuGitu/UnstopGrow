const Founder = require("../models/foundermodel");
const Investor = require("../models/investormodel");
const Supporter = require("../models/supportermodel");
const JWT = require("jsonwebtoken");
const Profile = require("../models/Global/FounderProfilemodel");
const investorProfileInfo = require("../models/Investor/Setting");
const investorDomain = require("../models/Investor/Domain");
const SupporterProfileModel = require("../models/Supporter/SupporterProfileSchema");

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "All details including file are required" });
    }
    const existingSupporter = await Supporter.findOne({ email });
    if (!existingSupporter) {
      return res.status(404).json({ error: "Suppoter not found" });
    }
    const isValidPassword = existingSupporter.password === password;
    if (!isValidPassword) {
      return res.status(404).json({ error: "Invalid Email Password" });
    }

    const token = JWT.sign(
      { id: existingSupporter._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      userId: existingSupporter._id,
      token,
    });
  } catch (error) {
    console.error("Login Supporter Error:", error.message);
    res.status(500).json({ error: "Server error while registering suppoter" });
  }
};

const loginFounderController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "All details including file are required" });
    }
    const existingFounder = await Founder.findOne({ email });
    if (!existingFounder) {
      return res.status(404).json({ error: "Founder not found" });
    }
    const isValidPassword = existingFounder.password === password;
    if (!isValidPassword) {
      return res.status(404).json({ error: "Invalid Email Password" });
    }

    const token = JWT.sign(
      { id: existingFounder._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      userId: existingFounder._id,
      token,
    });
  } catch (error) {
    console.error("Login Founder Error:", error.message);
    res.status(500).json({ error: "Server error while registering founder" });
  }
};

const loginInvestorController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "All details including file are required" });
    }
    const existingInvestor = await Investor.findOne({ email });
    if (!existingInvestor) {
      return res.status(404).json({ error: "Investor not found" });
    }
    const isValidPassword = existingInvestor.password === password;
    if (!isValidPassword) {
      return res.status(404).json({ error: "Invalid Email Password" });
    }

    const token = JWT.sign(
      { id: existingInvestor._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      userId: existingInvestor._id,
      token,
    });
  } catch (error) {
    console.error("Login Investor Error:", error.message);
    res.status(500).json({ error: "Server error while registering investor" });
  }
};

const SignupUserController = async (req, res) => {
  try {
    const { username, email, password, answer } = req.body;
    if (!username || !email || !password || !answer) {
      return res
        .status(400)
        .json({ error: "All details including file are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const existingSupporter = await Supporter.findOne({ email });
    if (existingSupporter) {
      return res
        .status(409)
        .json({ error: "Founder with this email already exists" });
    }
    const newSupporter = new Supporter({
      username,
      email,
      password,
      answer,
    });
    const savedSupporter = await newSupporter.save();
    const profileSuppoter = new SupporterProfileModel({
      SupporterId: savedSupporter._id,
      email,
      username,
    })
    const savedProfileSuppoter = await profileSuppoter.save();
    const token = JWT.sign({ id: savedSupporter._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "Founder registered successfully",
      userId: savedSupporter._id,
      suppoter: savedProfileSuppoter,
      token,
    });
  } catch (error) {
    console.error("Register Supporter Error:", error.message);
    res.status(500).json({ error: "Server error while registering suppoter" });
  }
};

// const registerFounderController = async (req, res) => {
//   try {
//     const {
//       companyName,
//       ownerName,
//       email,
//       password,
//       aadhaar,
//       pancard,
//       linkedin,
//       proof,
//       answer,
//     } = req.body;

//     const file = req.file;

//     if (
//       !file ||
//       !companyName ||
//       !ownerName ||
//       !email ||
//       !password ||
//       !aadhaar ||
//       !pancard ||
//       !linkedin ||
//       !proof ||
//       !answer
//     ) {
//       return res
//         .status(400)
//         .json({ error: "All details including file are required" });
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return res.status(400).json({ error: "Invalid email format" });
//     }

//     if (!/^\d{12}$/.test(aadhaar)) {
//       return res
//         .status(400)
//         .json({ error: "Aadhaar must be exactly 12 digits" });
//     }

//     if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pancard.toUpperCase())) {
//       return res.status(400).json({ error: "Invalid PAN format" });
//     }

//     const existingFounder = await Founder.findOne({ email });
//     if (existingFounder) {
//       return res
//         .status(409)
//         .json({ error: "Founder with this email already exists" });
//     }

//     // Create new founder
//     const newFounder = new Founder({
//       companyName,
//       ownerName,
//       email,
//       password,
//       aadhaar,
//       pancard,
//       linkedin,
//       proof,
//       file: file.path,
//       answer,
//     });

//     const savedFounder = await newFounder.save();

//     const newProfile = new Profile({
//       startupId: savedFounder._id,
//       startUpName: companyName,
//       bio: "Tell us about your startup...",
//       domain: "Technology",
//       email: email,
//       socials: {
//         linkedin: linkedin,
//       },
//     });

//     const savedProfile = await newProfile.save();
//     const token = JWT.sign({ id: savedFounder._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//     res.status(201).json({
//       message: "Founder registered successfully",
//       userId: savedFounder._id,
//       profileId: savedProfile,
//       token
//     });
//   } catch (err) {
//     console.error("Register Founder Error:", err.message);
//     res.status(500).json({ error: "Server error while registering founder" });
//   }
// };

// const registerInvestorController = async (req, res) => {
//   try {
//     const {
//       investorName,
//       email,
//       password,
//       pastInvestment,
//       linkedin,
//       aadhaar,
//       pancard,
//       answer,
//     } = req.body;
//     const file = req.file;
//     if (
//       !file ||
//       !investorName ||
//       !email ||
//       !password ||
//       !pastInvestment ||
//       !linkedin ||
//       !aadhaar ||
//       !pancard ||
//       !answer
//     ) {
//       return res.status(400).json({ error: "All file Details are required" });
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return res.status(400).json({ error: "Invalid email format" });
//     }

//     if (!/^\d{12}$/.test(aadhaar)) {
//       return res
//         .status(400)
//         .json({ error: "Aadhaar must be exactly 12 digits" });
//     }

//     if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pancard.toUpperCase())) {
//       return res.status(400).json({ error: "Invalid PAN format" });
//     }

//     const existingInvestor = await Investor.findOne({ email });
//     if (existingInvestor) {
//       return res
//         .status(409)
//         .json({ error: "Investor with this email already exists" });
//     }
//     const newInvestor = new Investor({
//       investorName,
//       email,
//       password,
//       pastInvestment,
//       linkedin,
//       aadhaar,
//       pancard,
//       file: file.path,
//       answer,
//     });
//     const savedInvestor = await newInvestor.save();

//     const newInvestorProfileinfo = new investorProfileInfo({
//       investorId: savedInvestor._id,
//       name: investorName,
//       email: email,
//       linkedin: linkedin,
//     });

//     const savedInvestorProfileinfo = await newInvestorProfileinfo.save();

//     const newInvestorDomain = new investorDomain({
//       investorId: savedInvestor._id,
//     });

//     const savedInvestorDomain = await newInvestorDomain.save();

//     const token = JWT.sign({ id: savedInvestor._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//     res.status(201).json({
//       message: "Investor registered successfully",
//       userId: savedInvestor._id,
//       token,
//       profile: savedInvestorProfileinfo,
//       domain: savedInvestorDomain,
//     });
//   } catch (error) {
//     console.error("Register Investor Error:", error);
//     res.status(500).json({ error: "Server error while registering investor" });
//   }
// };

const registerFounderController = async (req, res) => {
  try {
    const {
      companyName,
      ownerName,
      email,
      password,
      aadhaar,
      pancard,
      linkedin,
      proof,
      answer,
    } = req.body;

    const file = req.file;

    if (
      !file ||
      !companyName ||
      !ownerName ||
      !email ||
      !password ||
      !aadhaar ||
      !pancard ||
      !linkedin ||
      !proof ||
      !answer
    ) {
      return res
        .status(400)
        .json({ error: "All details including file are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      return res
        .status(400)
        .json({ error: "Aadhaar must be exactly 12 digits" });
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pancard.toUpperCase())) {
      return res.status(400).json({ error: "Invalid PAN format" });
    }

    const existingFounder = await Founder.findOne({ email });
    if (existingFounder) {
      return res
        .status(409)
        .json({ error: "Founder with this email already exists" });
    }

    // Store complete file data as JSON string in the file field
    const fileData = {
      url: file.path,
      publicId: file.filename, // This is the public ID from Cloudinary
      originalName: file.originalname,
      size: file.size,
      uploadedAt: new Date()
    };

    // Create new founder
    const newFounder = new Founder({
      companyName,
      ownerName,
      email,
      password,
      aadhaar,
      pancard,
      linkedin,
      proof,
      file: JSON.stringify(fileData), // Store file data as JSON string
      answer,
    });

    const savedFounder = await newFounder.save();

    const newProfile = new Profile({
      startupId: savedFounder._id,
      startUpName: companyName,
      bio: "Tell us about your startup...",
      domain: "Technology",
      email: email,
      socials: {
        linkedin: linkedin,
      },
    });

    const savedProfile = await newProfile.save();
    const token = JWT.sign({ id: savedFounder._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Parse file data for response
    let responseData = { ...savedFounder.toObject() };
    if (responseData.file) {
      try {
        responseData.fileData = JSON.parse(responseData.file);
      } catch (e) {
        // If parsing fails, treat as old string format
        responseData.fileData = { url: responseData.file };
      }
    }

    res.status(201).json({
      message: "Founder registered successfully",
      userId: savedFounder._id,
      profileId: savedProfile,
      token,
      founder: responseData
    });
  } catch (err) {
    console.error("Register Founder Error:", err.message);

    // If there was an upload but save failed, clean up the uploaded file from Cloudinary
    if (req.file?.filename) {
      try {
        await deleteFileFromCloudinary(req.file.filename);
        console.log("Cleanup: Deleted uploaded file from Cloudinary after error");
      } catch (cleanupError) {
        console.error('Error cleaning up uploaded file:', cleanupError.message);
      }
    }

    res.status(500).json({ error: "Server error while registering founder" });
  }
};

const registerInvestorController = async (req, res) => {
  try {
    const {
      investorName,
      email,
      password,
      pastInvestment,
      linkedin,
      aadhaar,
      pancard,
      answer,
    } = req.body;
    const file = req.file;
    
    if (
      !file ||
      !investorName ||
      !email ||
      !password ||
      !pastInvestment ||
      !linkedin ||
      !aadhaar ||
      !pancard ||
      !answer
    ) {
      return res.status(400).json({ error: "All file Details are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      return res
        .status(400)
        .json({ error: "Aadhaar must be exactly 12 digits" });
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pancard.toUpperCase())) {
      return res.status(400).json({ error: "Invalid PAN format" });
    }

    const existingInvestor = await Investor.findOne({ email });
    if (existingInvestor) {
      return res
        .status(409)
        .json({ error: "Investor with this email already exists" });
    }

    // Store complete file data as JSON string in the file field
    const fileData = {
      url: file.path,
      publicId: file.filename, // This is the public ID from Cloudinary
      originalName: file.originalname,
      size: file.size,
      uploadedAt: new Date()
    };

    const newInvestor = new Investor({
      investorName,
      email,
      password,
      pastInvestment,
      linkedin,
      aadhaar,
      pancard,
      file: JSON.stringify(fileData), // Store file data as JSON string
      answer,
    });
    const savedInvestor = await newInvestor.save();

    const newInvestorProfileinfo = new investorProfileInfo({
      investorId: savedInvestor._id,
      name: investorName,
      email: email,
      linkedin: linkedin,
    });

    const savedInvestorProfileinfo = await newInvestorProfileinfo.save();

    const newInvestorDomain = new investorDomain({
      investorId: savedInvestor._id,
    });

    const savedInvestorDomain = await newInvestorDomain.save();

    const token = JWT.sign({ id: savedInvestor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Parse file data for response
    let responseData = { ...savedInvestor.toObject() };
    if (responseData.file) {
      try {
        responseData.fileData = JSON.parse(responseData.file);
      } catch (e) {
        // If parsing fails, treat as old string format
        responseData.fileData = { url: responseData.file };
      }
    }

    res.status(201).json({
      message: "Investor registered successfully",
      userId: savedInvestor._id,
      token,
      profile: savedInvestorProfileinfo,
      domain: savedInvestorDomain,
      investor: responseData
    });
  } catch (error) {
    console.error("Register Investor Error:", error);

    // If there was an upload but save failed, clean up the uploaded file from Cloudinary
    if (req.file?.filename) {
      try {
        await deleteFileFromCloudinary(req.file.filename);
        console.log("Cleanup: Deleted uploaded file from Cloudinary after error");
      } catch (cleanupError) {
        console.error('Error cleaning up uploaded file:', cleanupError.message);
      }
    }

    res.status(500).json({ error: "Server error while registering investor" });
  }
};


const forgotUserController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await Supporter.findOne({ email, answer });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or incorrect security answer." });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const forgotFounderController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find user with matching email and security answer
    const user = await Founder.findOne({ email, answer });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or incorrect security answer." });
    }

    // Update the password directly (plaintext — not secure for production)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const forgotInvestorController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find user with matching email and security answer
    const user = await Investor.findOne({ email, answer });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or incorrect security answer." });
    }

    // Update the password directly (plaintext — not secure for production)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const getFounderFileById = async (req, res) => {
  try {
    const userId = req.params.id;
    const founder = await Founder.findById(userId);

    if (!founder || !founder.file) {
      return res.status(404).json({ error: "File not found in DB" });
    }

    const filePath = path.join(__dirname, "..", founder.file);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File missing on server" });
    }

    res.sendFile(filePath);
  } catch (err) {
    console.error("Error fetching founder file:", err);
    res.status(500).json({ error: "Server error while fetching file" });
  }
};

const getInvestorAuthenticate = async (req, res) => {
  try {
    const userId = req.user.id;
    const founduser = await Investor.findById(userId);
    if (!founduser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ userName: founduser.investorName });
  } catch (error) {
    console.error("Error fetching founder file:", error);
    res.status(500).json({ error: "Server error while fetching file" });
  }
};

const getFounderAuthenticate = async (req, res) => {
  try {
    const userId = req.user.id;
    const founduser = await Founder.findById(userId);
    if (!founduser) {
      return res.status(404).json({ error: "User not found" });
    };
    res.status(200).json({ userName: founduser });
  } catch (error) {
    console.error("Error fetching founder file:", error);
    res.status(500).json({ error: "Server error while fetching file" });
  }
};

const getSuppoterAuthenticate = async (req, res) => {
  try {
    const userId = req.user.id;
    const founduser = await Supporter.findById(userId);
    if (!founduser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ userName: founduser });
  } catch (error) {
    console.error("Error fetching Suppoter Authenticate:", error);
    res.status(500).json({ error: "Server error while fetching Suppoter Authenticate" });
  }
}

module.exports = {
  loginUserController,
  loginFounderController,
  loginInvestorController,
  SignupUserController,
  registerFounderController,
  registerInvestorController,
  forgotUserController,
  forgotFounderController,
  forgotInvestorController,
  getFounderFileById,
  getFounderAuthenticate,
  getInvestorAuthenticate,
  getSuppoterAuthenticate
};
