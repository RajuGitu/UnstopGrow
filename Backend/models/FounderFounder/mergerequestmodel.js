const mongoose = require('mongoose');
const { Schema } = mongoose;
const RequestSchema = new Schema({
    startUpIdSent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Founder",
        required: true,
    },
    startUpIdReceive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Founder",
        required: true,
    },
    describe: {
        type: String,
    },
    status: {
        type: String,
        enum: ["new", "accepted", "rejected", "pending"],
        default: "new",
        required: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Request", RequestSchema);