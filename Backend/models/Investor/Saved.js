const mongoose = require("mongoose");
const { Schema } = mongoose;

const SavedSchema = new Schema(
  {
    investorId: {
      type: Schema.Types.ObjectId,
      ref: "Investor",
      required: true,
      index: true,
    },
    startUpId: {
      type: Schema.Types.ObjectId,
      ref: "Founder",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Saved", SavedSchema);
