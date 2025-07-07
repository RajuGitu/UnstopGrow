const mongoose = require('mongoose');
const { Schema } = mongoose;

const SupporterProfileSchema = new Schema({
    SuppoterId: {
        type: Schema.Types.ObjectId,
        ref: "Suppoter",
        required: true,
        index: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    location: {
        type: String,
    },
    image: {
        type: String,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("SupporterProfileModel", SupporterProfileSchema);