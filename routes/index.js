const router = require("express").Router();
const clothingItem = require("./clothingItems");

const userRouter = require("./users");

router.use("/users", userRouter);
router.use((req, res) => {
  res.status(500).send({ message: "Error" });
});

module.exports = router;
