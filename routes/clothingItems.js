const router = require("express").Router();
const auth = require("../middlewares/auth");
const { Joi, celebrate } = require("celebrate");

const {
  createItem,
  getItems,
  deleteItem,
  addLike,
  deleteLike,
} = require("../controllers/clothingItems");

const createItem = {
  name: Joi.string().required,
  weather: Joi.string().required("hot", "warm", "cold"),
  imageUrl: Joi.string().required(url),
};

const itemId = {
  params: Joi.object().keys({
    itemId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
  }),
};
router.post("/", auth, celebrate(createItem), createItem);
router.get("/", getItems);
router.delete("/:itemId", auth, celebrate(itemId), deleteItem);
router.put("/:itemId/likes", auth, celebrate(itemId), addLike);
router.delete("/:itemId/likes", auth, celebrate(itemId), deleteLike);

module.exports = router;
