const FeatureRequest = require("../models/FeatureRequest");

const getAllPublishedFeatureRequests = async (req, res) => {
  const featureRequests = await FeatureRequest.find({ isPublished: true });

  res.status(200).json({ featureRequests, nbHits: featureRequests.length });
};

const getSingleFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.findById(req.params.id);

  res.status(200).json({ featureRequest });
};

const upvoteFeatureRequest = async (req, res) => {
  let featureRequest = await FeatureRequest.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { voteCount: 1 },
    },
    { new: true },
  );

  res.status(200).json({ featureRequest });
};

const downvoteFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { voteCount: -1 },
    },
    { new: true },
  );

  res.status(200).json({ featureRequest });
};

const createFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.create(req.body);

  res.status(200).json({ featureRequest });
};

// ------ ADMIN ------
const getAllUnpublishedFeatureRequests = async (req, res) => {
  const featureRequests = await FeatureRequest.find({ isPublished: false });
  console.log(featureRequests);

  res.status(200).json({ featureRequests, nbHits: featureRequests.length });
};

const publishFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.findByIdAndUpdate(
    req.params.id,
    { isPublished: true },
    { new: true },
  );

  res.status(200).json({ featureRequest });
};

const unpublishFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.findByIdAndUpdate(
    req.params.id,
    { isPublished: false },
    { new: true },
  );

  res.status(200).json({ featureRequest });
};

const deleteFeatureRequest = async (req, res) => {
  const featureRequest = await FeatureRequest.findByIdAndDelete(req.params.id);

  res.status(200).json({ featureRequest });
};

module.exports = {
  getAllPublishedFeatureRequests,
  getSingleFeatureRequest,
  upvoteFeatureRequest,
  downvoteFeatureRequest,
  createFeatureRequest,
  getAllUnpublishedFeatureRequests,
  publishFeatureRequest,
  unpublishFeatureRequest,
  deleteFeatureRequest,
};
