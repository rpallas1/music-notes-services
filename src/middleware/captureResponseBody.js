const captureResponseBody = (req, res, next) => {
  let oldSend = res.send;

  res.send = function (data) {
    res.body = data;
    oldSend.apply(res, arguments);
  };

  next();
};

module.exports = captureResponseBody;
