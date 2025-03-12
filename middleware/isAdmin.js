const { createCustomError } = require("../errors/customError");
const checkAdmin = require("../utils/checkAdmin");

const isAdmin = (req, res, next) => {
  if (!checkAdmin(req)) {
    return next(
      createCustomError(
        "Unauthorized access. You do not have permission to perform this action",
        403,
      ),
    );
  }

  next();
};

module.exports = isAdmin;
