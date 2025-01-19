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

// AS PER CR
// The routes should lead to the relevant controllers. Please create controllers for adding and deleting 'likes' in the 'controllers.js' file and connect them to the routes
