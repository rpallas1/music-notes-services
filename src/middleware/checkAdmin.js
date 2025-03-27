const { createCustomError } = require("../errors/customError");
const isAdmin = require("../utils/isAdmin");
const { adminLogger } = require("./logger");

const checkAdmin = (req, res, next) => {
  adminLogger(req, res, (err) => {
    if (err) {
      return next(err);
    }

    if (!isAdmin(req)) {
      return next(
        createCustomError(
          "Unauthorized access. You do not have permission to perform this action",
          403,
        ),
      );
    }

    next();
  });
};

module.exports = checkAdmin;
