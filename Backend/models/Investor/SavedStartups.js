const mongoose = require("mongoose");
const { Schema } = mongoose;

const SavedStartupsSchema = new Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investor",
      required: true,
      index: true,
    },
    startUpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Saved", SavedStartupsSchema);
