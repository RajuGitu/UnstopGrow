const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationPreferenceSchema = new Schema(
  {
    investorId: {
      type: Schema.Types.ObjectId,
      ref: "Investor",
      required: true,
      index: true,
      unique: true,
    },
    newStartupAlerts: {
      type: Boolean,
      default: true,
    },
    pitchUpdates: {
      type: Boolean,
      default: true,
    },
    messages: {
      type: Boolean,
      default: true,
    },
    weeklyDigest: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

module.exports = mongoose.model(
  "NotificationPreference",
  NotificationPreferenceSchema
);
