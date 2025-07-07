const { Schema, model } = require("mongoose");

const SupporterFollowsSchema = new Schema(
    {
        supporterId: {
            type: Schema.Types.ObjectId,
            ref: "Supporter",
            required: true,
            unique: true,
            index: true,
        },

        startupIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Founder",
            },
        ],
    },
    { timestamps: true }
);

module.exports = model("SupporterFollows", SupporterFollowsSchema);
