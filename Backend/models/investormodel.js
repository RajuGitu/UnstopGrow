const mongoose = require('mongoose');

const InvestorSchema = new mongoose.Schema({
    investorName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pastInvestment: { type: String },
    linkedin: { type: String, required: true },
    aadhaar: { type: String, required: true },
    image: { type: String },
    pancard: { type: String, required: true },
    file: { type: String, required: true },
    emailOTP: { type: Number },
    otp: { type: Number },
    answer: { type: String, required: true },
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

module.exports = mongoose.model("Investor", InvestorSchema);
