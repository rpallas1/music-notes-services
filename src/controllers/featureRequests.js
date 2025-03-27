const FeatureRequest = require("../models/FeatureRequest");
const { createCustomError } = require("../errors/customError");
const isAdmin = require("../middleware/isAdmin");

const getAllFeatureRequests = async (req, res) => {
  const featureRequests = await FeatureRequest.find(req.query);

  res.status(200).json({ featureRequests, nbHits: featureRequests.length });
};

const getSingleFeatureRequest = async (req, res, next) => {
  const featureRequest = await FeatureRequest.findById(req.params.id);

  if (!featureRequest) {
    return next(
      createCustomError(`No feature request with id: ${req.params.id}`, 404),
    );
  }

  if (!featureRequest.published) {
    // Use the isAdmin middleware function to check for admin rights and log the access
    isAdmin(req, res, (err) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({ featureRequest });
    });
  } else {
    res.status(200).json({ featureRequest });
  }
};

const updateFeatureRequestVote = async (req, res, next) => {
  const { value } = req.body;

  if (typeof value === "undefined") {
    return next(
      createCustomError(`Invalid update, 'value' key is required`, 400),
    );
  }

  if (value !== 1 && value !== -1) {
    return next(
      createCustomError(`Value must be 1 or -1. Value recieved: ${value}`, 400),
    );
  }

  const featureRequest = await FeatureRequest.findById(req.params.id);

  if (!featureRequest) {
    return next(
      createCustomError(
        `No feature request found with id:${req.params.id}`,
        404,
      ),
    );
  }

  const updateVote = async () => {
    featureRequest.voteCount += value;
    await featureRequest.save();

    res
      .status(200)
      .json({ message: "Vote recorded successfully", featureRequest });
  };

  if (!featureRequest.published) {
    // Use the isAdmin middleware function to check for admin rights and log the access
    isAdmin(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      // Proceed to update the vote
      await updateVote();
    });
  } else {
    // Proceed to update the vote
    await updateVote();
  }
};

const createFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.create(req.body);

  res
    .status(201)
    .json({ message: "Feature request successfully created", featureRequest });
};

module.exports = {
  getAllFeatureRequests,
  getSingleFeatureRequest,
  updateFeatureRequestVote,
  createFeatureRequest,
};
