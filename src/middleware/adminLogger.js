const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

morgan.token("response-body", (req, res) => {
  return res.body ? JSON.stringify(res.body) : "";
});
const adminLogStream = fs.createWriteStream(
  path.join(__dirname, "../..", "admin.log"),
  {
    flags: "a",
  },
);

const adminLogger = morgan(
  ":method :url :status :date[clf] :response-time ms - :res[content-length] :response-body :remote-addr :remote-user :referrer :user-agent",
  {
    stream: adminLogStream,
  },
);

module.exports = adminLogger;
