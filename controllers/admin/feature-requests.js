const FeatureRequest = require("../../models/FeatureRequest");
const { createCustomError } = require("../../errors/custom-error");

const updateFeatureRequest = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

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
  const featureRequest = await FeatureRequest.findByIdAndDelete(req.params.id);

  if (!featureRequest) {
    return next(
      createCustomError(`No feature request with id: ${req.params.id}`, 404),
    );
  }

  res
    .status(200)
    .json({ msg: "Feature request deleted successfully", featureRequest });
};

module.exports = {
  updateFeatureRequest,
  deleteFeatureRequest,
};
