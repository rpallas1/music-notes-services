const { check, validationResult } = require("express-validator");

const filterEmptyFields = (req, res, next) => {
  req.body = Object.fromEntries(
    Object.entries(req.body).filter(([key, value]) => value !== ""),
  );

  next();
};

const validateFeatureRequest = [
  filterEmptyFields,

  check("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title cannot exceed 50 characters"),

  check("summary")
    .trim()
    .escape()
    .isLength({ max: 200 })
    .withMessage("Summary cannot exceed 200 characters")
    .optional(),

  check("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 10000 })
    .withMessage("Description cannot exceed 10,000 characters"),

  check("email")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email cannot exceed 100 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = validateFeatureRequest;
