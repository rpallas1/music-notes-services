const mongoose = require("mongoose");

const featureReqestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [50, "Title cannot not exceed 50 characters"],
    trim: true,
  },
  summary: {
    type: String,
    maxLength: [200, "Summary cannot exceed 200 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxLength: [10000, "Description cannot exceed 10,000 characters"],
    trim: true,
  },
  email: {
    type: String,
    maxLength: [100, "Email cannot exceed 100 characters"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be in a valid format",
    ],
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
