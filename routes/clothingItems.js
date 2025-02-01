const router = require("express").Router();
const authorization = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  addLike,
  deleteLike,
} = require("../controllers/clothingItems");

router.post("/", authorization, createItem);
router.get("/", getItems);
router.delete("/:itemId", authorization, deleteItem);
router.put("/:itemId/likes", authorization, addLike);
router.delete("/:itemId/likes", authorization, deleteLike);

module.exports = router;
