const { INCORRECT } = require("../utils/errors");

const token = authorization.replace("Bearer ", "");

payload = jwt.verify(token, JWT_SECRET);
