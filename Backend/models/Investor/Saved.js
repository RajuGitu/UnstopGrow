const mongoose = require('mongoose');
const { Schema } = mongoose;

const SavedSchema = new Schema(
  {
    startUpId: {
      type: Schema.Types.ObjectId,
      ref: 'Founder',
      required: true,
    },
    investorId: {
      type: Schema.Types.ObjectId,
      ref: 'Investor',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Saved', SavedSchema);
