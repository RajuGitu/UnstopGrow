const mongoose = require('mongoose');

const FounderSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aadhaar: { type: String, required: true },
  pancard: { type: String, required: true },
  image: { type: String },
  linkedin: { type: String, required: true },
  proof: { type: String },
  file: { type: String, required: true },
  emailOTP: { type: Number },
  otp: { type: Number },
  answer: { type: String, required: true },

  // 👇 Add these
  followers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // or 'Founder' if mutual follow
      followedAt: { type: Date, default: Date.now }
    }
  ],
  following: [
    {
      founderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Founder' },
      followedAt: { type: Date, default: Date.now }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Founder", FounderSchema);
