const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const connectDB = require("./src/db/connect");
const https = require("https");
const fs = require("fs");
const path = require("path");

require("dotenv").config();
require("express-async-errors");

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const featureRequestsRouter = require("./src/routes/featureRequests");
const contactFormRouter = require("./src/routes/contactForm");
const adminRouter = require("./src/routes/admin");

const captureResponseBody = require("./src/middleware/captureResponseBody");
const morganLogger = require("./src/middleware/morganLogger");
const isAdminMiddleware = require("./src/middleware/isAdmin");
const notFoundMiddleware = require("./src/middleware/notFound");
const errorHandlerMiddleware = require("./src/middleware/errorHandler");

let limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

let adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(captureResponseBody);
app.use(morganLogger);

if (process.env.NODE_ENV === "production") {
  app.use(limiter);

  adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: "Too many requests from this IP, please try again later.",
  });
}

app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "https://musicnotes-pallascreations.com",
    methods: "GET, POST, PATCH, DELETE",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/feature-requests", featureRequestsRouter);
app.use("/api/v1/contact-form", contactFormRouter);
app.use("/api/v1/admin", isAdminMiddleware, adminLimiter, adminRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, "./localhost-key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "./localhost.pem")),
};

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}...`);
});
