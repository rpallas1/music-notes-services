const express = require("express");
const router = express.Router();

const {
  getAllFeatureRequests,
  getSingleFeatureRequest,
  updateFeatureRequestVote,
  createFeatureRequest,
  // updateFeatureRequest,
  // deleteFeatureRequest,
} = require("../controllers/feature-requests");

router.get("/", getAllFeatureRequests);
router.post("/", createFeatureRequest);

// router.delete("/:id", deleteFeatureRequest);
router.get("/:id", getSingleFeatureRequest);
// router.patch("/:id", updateFeatureRequest);

router.patch("/:id/votes", updateFeatureRequestVote);

module.exports = router;
