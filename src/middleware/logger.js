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

const adminLogStream = fs.createWriteStream(
  path.join(__dirname, "../..", "admin.log"),
  {
    flags: "a",
  },
);

const tokens =
  ":method :url :status :date[clf] :response-time ms - :res[content-length] :remote-addr :remote-user :referrer :user-agent";

const morganLogger = morgan(tokens, {
  stream: errorLogStream,
  skip: (req, res) => res.statusCode < 400,
});

const adminLogger = morgan(tokens, {
  stream: adminLogStream,
});

module.exports = {
  morganLogger,
  adminLogger,
};
