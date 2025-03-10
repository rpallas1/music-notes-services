const { createCustomError } = require("../errors/custom-error");

const isAdmin = (req, res, next) => {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_API_KEY) {
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
