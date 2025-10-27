const jwt = require('jsonwebtoken');

const isAuthenticated   = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(401)
    .json({ message: "Unauthorized jwt required ", success: false });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401)
    .json({ message: "Unauthorized", success: false });
  } 
};

module.exports = isAuthenticated;
