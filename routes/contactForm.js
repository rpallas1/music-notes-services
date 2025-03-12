const express = require("express");
const router = express.Router();

const { createContactForm } = require("../controllers/contactForm");

const validateContactForm = require("../middleware/validators/validateContactForm");

router.post("/", validateContactForm, createContactForm);

module.exports = router;
