const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_PROD_URI
        : process.env.MONGO_DEV_URI;

    await mongoose.connect(mongoURI);

    console.log("Database connected successfully");
    console.log(
      `Current Date and Time (UTC): ${new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")}`,
    );
    console.log("Current User: rpallas1");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
