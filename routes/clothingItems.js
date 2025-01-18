const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);
router.get("/", getItems);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes");
router.delete("/:itemId/likes");

module.exports = router;
