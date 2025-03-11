const { param, validationResult, matchedData } = require("express-validator");

const validateParams = [
  param("id").isMongoId().withMessage("Invalid ID"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    req.params = matchedData(req);

    next();
  },
];

module.exports = validateParams;
