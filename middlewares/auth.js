const { INCORRECT } = require("../utils/errors");

const token = authorization.replace("Bearer ", "");

authorization.use((next) => {
  req.user = payload;
  next();
});
return res.status(INCORRECT).send({ message: "Error in the token" });

payload = jwt.verify(token, JWT_SECRET);
