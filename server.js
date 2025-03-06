const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");

require("dotenv").config();
require("express-async-errors");

connectDB();

const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const featureRequestsRouter = require("./routes/feature-requests");
const contactFormRouter = require("./routes/contact-form");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1/feature-requests", featureRequestsRouter);
app.use("/api/v1/contact-form", contactFormRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(PORT, console.log(`Server is listening on port: ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
