const { CustomAPIError } = require("../errors/customError");

const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res
    .status(500)
    .json({ message: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
