const express = require("express");
const router = express.Router();

const {
  getAllContactForms,
  updateContactForm,
  createContactForm,
  deleteContactForm,
} = require("../controllers/contact-form");

router.get("/", getAllContactForms);
router.post("/", createContactForm);
router.put("/:id", updateContactForm);
router.delete("/:id", deleteContactForm);

module.exports = router;
