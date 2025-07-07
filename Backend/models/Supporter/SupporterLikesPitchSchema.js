const { Schema, model } = require("mongoose");

const SupporterLikesPitchSchema = new Schema(
    {
        supporterId: {
            type: Schema.Types.ObjectId,
            ref: "Supporter",
            required: true,
            index: true,
            unique: true,
        },
        pitchIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Pitch",
            },
        ],
    },
    { timestamps: true }
);

module.exports = model("SupporterLikesPitch", SupporterLikesPitchSchema);
