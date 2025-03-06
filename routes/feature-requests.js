const express = require("express");
const router = express.Router();

const {
  getAllFeatureRequests,
  getSingleFeatureRequest,
  upvoteFeatureRequest,
  downvoteFeatureRequest,
  createFeatureRequest,
  publishFeatureRequest,
  unpublishFeatureRequest,
  deleteFeatureRequest,
} = require("../controllers/feature-requests");

router.get("/", getAllFeatureRequests);
router.post("/", createFeatureRequest);

router.delete("/:id", deleteFeatureRequest);
router.get("/:id", getSingleFeatureRequest);

router.put("/:id/publish", publishFeatureRequest);
router.put("/:id/unpublish", unpublishFeatureRequest);
router.put("/:id/upvote", upvoteFeatureRequest);
router.put("/:id/downvote", downvoteFeatureRequest);

module.exports = router;
