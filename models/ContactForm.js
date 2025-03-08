const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxLength: [100, "Name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    maxLength: [100, "Email cannot exceed 100 characters"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be in a valid format",
    ],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    maxLength: [10000, "Message cannot exceed 10,000 characters"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
  dateReviewed: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("ContactForm", contactFormSchema);
