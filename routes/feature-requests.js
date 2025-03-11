const express = require("express");
const router = express.Router();

const {
  getAllFeatureRequests,
  getSingleFeatureRequest,
  updateFeatureRequestVote,
  createFeatureRequest,
} = require("../controllers/feature-requests");

const validateFeatureRequest = require("../middleware/validators/validateFeatureRequest");
const validateGetFeatureRequests = require("../middleware/validators/validateGetFeatureRequests");
const validateParams = require("../middleware/validators/validateParams");

router.get("/", validateGetFeatureRequests, getAllFeatureRequests);
router.post("/", validateFeatureRequest, createFeatureRequest);

router.get("/:id", validateParams, getSingleFeatureRequest);

router.patch("/:id/votes", validateParams, updateFeatureRequestVote);

module.exports = router;
