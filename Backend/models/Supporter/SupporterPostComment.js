const { Schema, model } = require("mongoose");

const SupporterPostCommentSchema = new Schema(
    {
        supporterId: {
            type: Schema.Types.ObjectId,
            ref: "Supporter",
            required: true,
            index: true,
            unique: true,
        },
        postIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    { timestamps: true }
);

module.exports = model("SupporterPostComment", SupporterPostCommentSchema);