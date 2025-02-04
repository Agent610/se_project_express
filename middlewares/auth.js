const jwt = require("jsonwebtoken");
const { INCORRECT } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(INCORRECT).send({ message: "Authorization error" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(INCORRECT).send({ message: "Authorization error" });
  }

  req.user = payload;
  next();
};

module.exports = auth;
