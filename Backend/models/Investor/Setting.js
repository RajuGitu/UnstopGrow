const mongoose = require('mongoose');

const SettingProfileSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    company: {
        type: String,
    },
    title: {
        type: String,
    },
    bio: {
        type: String,
    }
});

module.exports = mongoose.model("Setting", SettingProfileSchema);