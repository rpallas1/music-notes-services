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
const PORT = process.env.PORT || 3000;

const featureRequestsRouter = require("./routes/feature-requests");
const contactFormRouter = require("./routes/contact-form");
const adminRouter = require("./routes/admin");

const isAdminMiddleware = require("./middleware/is-admin");
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

let adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: "Too many requests from this IP, please try again later.",
});

if (process.env.NODE_ENV === "development") {
  adminLimiter = rateLimit({});
}

app.use(
  morgan("combined", {
    stream: errorLogStream,
    skip: (_, res) => res.statusCode < 400,
  }),
);
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/feature-requests", featureRequestsRouter);
app.use("/api/v1/contact-form", contactFormRouter);
app.use("/api/v1/admin", isAdminMiddleware, adminLimiter, adminRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, console.log(`Server is listening on port: ${PORT}...`));
