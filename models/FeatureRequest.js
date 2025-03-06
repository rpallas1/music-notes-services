const mongoose = require("mongoose");

featureReqestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxLength: 45,
  },
  summary: {
    type: String,
    maxLength: 220,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxLength: 10000,
  },
  tag: {
    type: String,
    enum: {
      values: ["new", "trending", "under-dev", "implemented"],
      message: "{VALUE} is not supported",
    },
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("FeatureRequest", featureReqestSchema);
