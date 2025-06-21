const mongoose = require('mongoose');

const SupporterSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String, required: true },
    image: { type: String },
    answer: { type: String, required: true },
    followers: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

module.exports = mongoose.model("Supporter", SupporterSchema);
