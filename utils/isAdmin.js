const isAdmin = (req) => {
  return req.headers["x-admin-key"] === process.env.ADMIN_API_KEY;
};

module.exports = isAdmin;
