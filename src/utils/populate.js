require("dotenv").config();

const connectDB = require("../db/connect");
const FeatureRequest = require("../models/FeatureRequest");

const jsonFeatureRequests = require("../../feature-requests.json");

/**
 *
 */
const start = async () => {
  try {
    await connectDB();
    await FeatureRequest.deleteMany();
    await FeatureRequest.create(jsonFeatureRequests);

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
