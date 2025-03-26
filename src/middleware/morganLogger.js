const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

morgan.token("response-body", (req, res) => {
  return res.body ? JSON.stringify(res.body) : "";
});

const errorLogStream = fs.createWriteStream(
  path.join(__dirname, "../..", "error.log"),
  {
    flags: "a",
  },
);

const morganLogger = morgan(
  ":method :url :status :date[iso] :response-time ms - :res[content-length] :response-body :remote-addr",
  {
    stream: errorLogStream,
    skip: (req, res) => res.statusCode < 400,
  },
);

const adminLogStream = fs.createWriteStream(
  path.join(__dirname, "../..", "admin.log"),
  {
    flags: "a",
  },
);

const adminLogger = morgan(
  ":method :url :status :date[iso] :response-time ms - :res[content-length] :response-body :remote-addr",
  {
    stream: adminLogStream,
  },
);

module.exports = morganLogger;
