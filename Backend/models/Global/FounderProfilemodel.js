const mongoose = require('mongoose');
const { Schema } = mongoose;

const FounderProfileSchema = new Schema({
    startupId: {
        type: Schema.Types.ObjectId,
        ref: "Founder",
        required: true,
        index: true,
        unique: true,
    },
    startUpName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80,
    },
    bio: {
        type: String,
        required: true,
        maxlength: 250,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    domain: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    socials: {
        twitter: { type: String, trim: true },
        linkedin: { type: String, trim: true },
        github: { type: String, trim: true },
    },
    achievements: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    readytomerge: {
        type: Boolean,
        default: true,
    },
    logo: {
        type: String,
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model("Profile",FounderProfileSchema);
