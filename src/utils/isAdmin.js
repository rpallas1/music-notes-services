const isAdmin = (req) => {
  return req.headers[process.env.ADMIN_HEADER] === process.env.ADMIN_API_KEY;
};

module.exports = isAdmin;
