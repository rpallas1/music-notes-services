const express = require("express");
const router = express.Router();

const {
  getAllFeatureRequests,
  getSingleFeatureRequest,
  updateFeatureRequestVote,
  createFeatureRequest,
} = require("../controllers/feature-requests");

const validateFeatureRequest = require("../middleware/validators/validateFeatureRequest");

router.get("/", getAllFeatureRequests);
router.post("/", validateFeatureRequest, createFeatureRequest);

router.get("/:id", getSingleFeatureRequest);

router.patch("/:id/votes", updateFeatureRequestVote);

module.exports = router;
