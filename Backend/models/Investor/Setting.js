const mongoose = require('mongoose');
const {Schema} = mongoose;

const SettingProfileSchema = new Schema({
    investorId:{
        type: Schema.Types.ObjectId,
        ref:"Investor",
        required: true,
        index:true,
        unique:true,      
    },
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    linkedin: {
        type: String,
        required:true,
    },
    bio: {
        type: String,
    }
},{
    timestamps : true
});

module.exports = mongoose.model("Setting", SettingProfileSchema);