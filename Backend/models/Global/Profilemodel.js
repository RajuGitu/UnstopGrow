const mongoose = require('mongoose');

const ProfileSchema =new mongoose.connect({
    startupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Founder',
        required: true
    },
    startUpName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true,
        maxlength: 250
    },
    location: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    achievements: {
        type: String,
        required: true
    },
    readytomerge: {
        type: Boolean,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    linked: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Profile", ProfileSchema);