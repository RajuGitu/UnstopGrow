const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const PitchSchema = new Schema(
  {
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      default: null,
    },
    youtube: {
      type: String,
      default: null,
    },
    problem: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    market: {
      type: String,
      required: true,
    },
    traction: {
      type: String,
      required: true,
    },
    funding: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    raised: {
      type: String,
      required: true,
    },
    activeUser: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = models.Pitch || model("Pitch", PitchSchema);