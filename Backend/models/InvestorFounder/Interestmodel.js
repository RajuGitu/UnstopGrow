const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const InterestSchema = new Schema(
    {
        startUpId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Founder",         
            required: true,
        },
        investorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Investor",        
            required: true,
        },
    },
    { timestamps: true } 
);

module.exports = models.Interest || model("Interest", InterestSchema);
