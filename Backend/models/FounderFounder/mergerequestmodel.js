const mongoose = require('mongoose');

const RequestSchema =new mongoose.Schema({
    startUpId: {
        type: Schema.Types.ObjectId,
        ref: "Founder",
        required: true,
    },
    investorId: {
        type: Schema.Types.ObjectId,
        ref: "Investor",
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
    },
})

module.exports = mongoose.model("Request", RequestSchema);