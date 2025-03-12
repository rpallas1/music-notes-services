const FeatureRequest = require("../models/FeatureRequest");
const { createCustomError } = require("../errors/customError");
const checkAdmin = require("../utils/checkAdmin");

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

  if (!featureRequest.published && !checkAdmin(req)) {
    return next(
      createCustomError(
        "Unauthorized access. You do not have permission to perform this action",
        403,
      ),
    );
  }

  res.status(200).json({ featureRequest });
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

  if (!featureRequest.published && !checkAdmin(req)) {
    return next(
      createCustomError(
        "Unauthorized access. You do not have permission to perform this action",
        403,
      ),
    );
  }

  featureRequest.voteCount += value;
  await featureRequest.save();

  res
    .status(201)
    .json({ message: "Vote recorded successfully", featureRequest });
};

const createFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.create(req.body);

  res.status(201).json({ featureRequest });
};

module.exports = {
  getAllFeatureRequests,
  getSingleFeatureRequest,
  updateFeatureRequestVote,
  createFeatureRequest,
};
