const express = require("express");
const router = express.Router();

const {
  getAllPublishedFeatureRequests,
  getSingleFeatureRequest,
  upvoteFeatureRequest,
  downvoteFeatureRequest,
  createFeatureRequest,
  getAllUnpublishedFeatureRequests,
  publishFeatureRequest,
  unpublishFeatureRequest,
  deleteFeatureRequest,
} = require("../controllers/feature-requests");

router.get("/", getAllPublishedFeatureRequests);
router.post("/", createFeatureRequest);

router.get("/unpublished", getAllUnpublishedFeatureRequests);

router.delete("/:id", deleteFeatureRequest);
router.get("/:id", getSingleFeatureRequest);

router.put("/:id/publish", publishFeatureRequest);
router.put("/:id/unpublish", unpublishFeatureRequest);
router.put("/:id/upvote", upvoteFeatureRequest);
router.put("/:id/downvote", downvoteFeatureRequest);

module.exports = router;
