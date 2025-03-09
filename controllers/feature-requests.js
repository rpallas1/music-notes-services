const FeatureRequest = require("../models/FeatureRequest");
const { createCustomError } = require("../errors/custom-error");
const isAdmin = require("../utils/isAdmin");

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

  let featureRequest = await FeatureRequest.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { voteCount: value },
    },
    { new: true },
  );

  if (!featureRequest) {
    return next(
      createCustomError(
        `No feature request found with id:${req.params.id}`,
        404,
      ),
    );
  }

  res
    .status(201)
    .json({ message: "Vote recorded successfully", featureRequest });
};

const createFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.create(req.body);

  res.status(201).json({ featureRequest });
};

// ------ ADMIN ------
const updateFeatureRequest = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  if (!isAdmin(req)) {
    return next(
      createCustomError(
        "Unauthorized access. You do not have permission to perform this action",
        403,
      ),
    );
  }

  const allowedUpdates = [
    "title",
    "summary",
    "description",
    "tag",
    "published",
  ];
  const actualUpdates = Object.keys(updates);

  const isValidOperation = actualUpdates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return next(
      createCustomError(
        `Invalid updates. Updates attempted: [${actualUpdates.toString()}]`,
        400,
      ),
    );
  }

  const featureRequest = await FeatureRequest.findById(id);

  if (!featureRequest) {
    return next(
      createCustomError(`No feature request found with id: ${id}`, 404),
    );
  }

  actualUpdates.forEach((update) => {
    featureRequest[update] = updates[update];
  });

  if (updates.published) {
    featureRequest.datePublished = updates.published ? new Date() : null;
  }

  await featureRequest.save();

  res.status(201).json({
    message: "Feature request updated successfully",
    featureRequest,
  });
};

const deleteFeatureRequest = async (req, res, next) => {
  if (!isAdmin(req)) {
    return next(
      createCustomError(
        "Unauthorized access. You do not have permission to perform this action",
        403,
      ),
    );
  }

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
  updateFeatureRequestVote,
  createFeatureRequest,
  updateFeatureRequest,
  deleteFeatureRequest,
};
