const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const clothingItem = require("./clothingItems");
const userRouter = require("./users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "The page was not found" });
});

module.exports = router;
