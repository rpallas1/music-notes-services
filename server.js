const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const path = require("path");
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

const errorLogStream = fs.createWriteStream(path.join(__dirname, "error.log"), {
  flags: "a",
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(
  morgan("combined", {
    stream: errorLogStream,
    skip: (_, res) => res.statusCode < 400,
  }),
);
app.use(limiter);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/feature-requests", featureRequestsRouter);
app.use("/api/v1/contact-form", contactFormRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, console.log(`Server is listening on port: ${PORT}...`));
