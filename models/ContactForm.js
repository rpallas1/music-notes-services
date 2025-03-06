const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    maxLength: 100,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    maxLength: 10000,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("ContactForm", contactFormSchema);
