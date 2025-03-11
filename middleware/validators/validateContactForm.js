const { check, validationResult } = require("express-validator");

const validateContactForm = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail({ ignore_max_length: true })
    .withMessage("Invalid email address")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email cannot exceed 100 characters"),
  check("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 10000 })
    .withMessage("Message cannot exceed 10,000 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = validateContactForm;
