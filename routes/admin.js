const express = require("express");
const router = express.Router();

const {
  getAllContactForms,
  updateContactForm,
  deleteContactForm,
} = require("../controllers/admin/contact-form");

const {
  updateFeatureRequest,
  deleteFeatureRequest,
} = require("../controllers/admin/feature-requests");

router.get("/contact-form", getAllContactForms);
router.patch("/contact-form/:id", updateContactForm);
router.delete("/contact-form/:id", deleteContactForm);

router.patch("/feature-requests/:id", updateFeatureRequest);
router.delete("/feature-requests/:id", deleteFeatureRequest);

module.exports = router;
