const router = require("express").Router();
const authorization = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  addLike,
  deleteLike,
} = require("../controllers/clothingItems");

router.post("/", createItem, authorization);
router.get("/", getItems);
router.delete("/:itemId", deleteItem, authorization);
router.put("/:itemId/likes", addLike, authorization);
router.delete("/:itemId/likes", deleteLike, authorization);

module.exports = router;
