const mongoose = require("mongoose");

const { Schema, model, models } = mongoose;

const InterestSchema = new Schema(
    {
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
        notes: [
            {
                text: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
        status: {
            type: String,
            enum: ["new", "accepted", "rejected", "pending"], 
            default: "new",
            required: true,
        },
    },
    { timestamps: true } 
);

module.exports = models.Interest || model("Interest", InterestSchema);
