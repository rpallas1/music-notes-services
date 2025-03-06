const FeatureRequest = require("../models/FeatureRequest");
const { createCustomError } = require("../errors/custom-error");

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

  res.status(200).json({ featureRequest });
};

const upvoteFeatureRequest = async (req, res, next) => {
  let featureRequest = await FeatureRequest.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { voteCount: 1 },
    },
    { new: true },
  );

  if (!featureRequest) {
    return next(
      createCustomError(`No feature request with id: ${req.params.id}`, 404),
    );
  }

  res.status(200).json({ featureRequest });
};

const downvoteFeatureRequest = async (req, res, next) => {
  const featureRequest = await FeatureRequest.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { voteCount: -1 },
    },
    { new: true },
  );

  if (!featureRequest) {
    return next(
      createCustomError(`No feature request with id: ${req.params.id}`, 404),
    );
  }

  res.status(200).json({ featureRequest });
};

const createFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.create(req.body);

  res.status(201).json({ featureRequest });
};

// ------ ADMIN ------
const publishFeatureRequest = async (req, res, next) => {
  const featureRequest = await FeatureRequest.findByIdAndUpdate(
    req.params.id,
    { isPublished: true },
    { new: true },
  );

  if (!featureRequest) {
    return next(
      createCustomError(`No feature request with id: ${req.params.id}`, 404),
    );
  }

  res.status(200).json({ featureRequest });
};

const unpublishFeatureRequest = async (req, res, next) => {
  const featureRequest = await FeatureRequest.findByIdAndUpdate(
    req.params.id,
    { isPublished: false },
    { new: true },
  );

  if (!featureRequest) {
    return next(
      createCustomError(`No feature request with id: ${req.params.id}`, 404),
    );
  }

  res.status(200).json({ featureRequest });
};

const deleteFeatureRequest = async (req, res, next) => {
  const featureRequest = await FeatureRequest.findByIdAndDelete(req.params.id);

  if (!featureRequest) {
    return next(
      createCustomError(`No feature request with id: ${req.params.id}`, 404),
    );
  }

  res.status(200).json({ featureRequest });
};

module.exports = {
  getAllFeatureRequests,
  getSingleFeatureRequest,
  upvoteFeatureRequest,
  downvoteFeatureRequest,
  createFeatureRequest,
  publishFeatureRequest,
  unpublishFeatureRequest,
  deleteFeatureRequest,
};
