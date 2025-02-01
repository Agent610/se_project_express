const token = require("../middlewares/auth");

const token =
  ({ _id: user._id },
  {
    expiresIn: "7d",
  });
