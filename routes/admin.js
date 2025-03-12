const express = require("express");
const router = express.Router();

const {
  getAllContactForms,
  updateContactForm,
  deleteContactForm,
} = require("../controllers/admin/contactForm");

const {
  updateFeatureRequest,
  deleteFeatureRequest,
} = require("../controllers/admin/featureRequests");

const validateParams = require("../middleware/validators/validateParams");

router.get("/contact-form", getAllContactForms);
router.patch("/contact-form/:id", validateParams, updateContactForm);
router.delete("/contact-form/:id", validateParams, deleteContactForm);

router.patch("/feature-requests/:id", validateParams, updateFeatureRequest);
router.delete("/feature-requests/:id", validateParams, deleteFeatureRequest);

module.exports = router;
