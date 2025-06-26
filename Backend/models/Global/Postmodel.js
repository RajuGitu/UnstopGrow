const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    startupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Founder',
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 80
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    media: {
        type: String,
    },
    tags: [
        {
            type: String,
            trim: true
        }
    ],
    likes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Supporter'
            },
        }
    ],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Supporter'
            },
            comment: { // More descriptive than 'comm'
                type: String,
                required: true,
                maxlength: 300
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true })


module.exports = mongoose.model("Post", PostSchema);