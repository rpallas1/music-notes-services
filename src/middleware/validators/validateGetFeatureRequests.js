const { query, validationResult, matchedData } = require("express-validator");
const checkAdmin = require("../checkAdmin");

const validateGetFeatureRequests = [
  query("published")
    .escape()
    .isBoolean()
    .optional()
    .withMessage("Published must be a boolean"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Failed feature request query validation",
        errors: errors.array(),
      });
    }

    const data = matchedData(req);

    if (data.published === "true") {
      req.query = { published: true };

      return next();
    }

    return checkAdmin(req, res, next);
  },
];

module.exports = validateGetFeatureRequests;
