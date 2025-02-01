//const jwt = require("jsonwebtoken");
const { INCORRECT } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(INCORRECT).send({ message: "Authorization" });
  }

  const token = authorization.replace("Bearer");
  let payload;

  try {
    payload = jwt.verify(token, "key");
  } catch (err) {
    return res.status(INCORRECT).send({ message: "Authorization" });
  }
  req.user = payload;

  next();
};
