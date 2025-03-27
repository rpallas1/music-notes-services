const { createCustomError } = require("../errors/customError");
const checkAdmin = require("../utils/checkAdmin");
const { adminLogger } = require("../middleware/logger");

const isAdmin = (req, res, next) => {
  adminLogger(req, res, (err) => {
    if (err) {
      return next(err);
    }

    if (!checkAdmin(req)) {
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

module.exports = isAdmin;
